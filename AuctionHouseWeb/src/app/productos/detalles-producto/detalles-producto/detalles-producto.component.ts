import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../../status-service.service';
import { ethers } from 'ethers';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.scss']
})
export class DetallesProductoComponent implements OnInit {

  producto = {
    id: "", nombre: "", descripcion: "",
     estado: "", categoria: "", precioInicial: 0, precioActual: 0,
     fechaInicioSubasta: "", fechaFinalSubasta: "", estadoSubasta: "", imagenProducto: "",
     precioEthInicial: 0, precioEthActual: 0
    };

  private intervaloTiempo: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, protected stateService : StateService) { }

  ethereumPrice = this.stateService.getEthereumPrice();
  recargaCache = this.stateService.getCacheRecargas();
  cacheDuration = 60000; // Duración de la caché en milisegundos (aquí, 1 minuto)
  convertedAmount = this.stateService.getFondosActuales();
  fondosSuficientes : boolean = false;

  mostrarBotonPuja() {
    const porcentaje = 0.9; // 90%
    console.log('Margen del producto:', this.producto.precioActual * porcentaje);
    this.fondosSuficientes = this.convertedAmount >= (this.producto.precioActual * porcentaje);
  }

  getEthereumPrice(): void {
    // Verifica si el precio está en caché y si el tiempo transcurrido desde la última solicitud es menor que el límite de la caché
    if (this.ethereumPrice !== null && this.recargaCache !== 0 && Date.now() - this.recargaCache < this.cacheDuration) {
      console.log('Precio de Ethereum obtenido de la caché:', this.ethereumPrice);
      console.log("Fondos actuales:", this.convertedAmount);
    } else {
      console.log("Tiempo antes de la solicitud:", this.recargaCache);
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur';
    this.http.get<any>(url)
      .subscribe(response => {
        this.stateService.setCacheRecargas(Date.now()); // Actualiza el tiempo de la última solicitud
        this.stateService.setEthereumPrice(response.ethereum.eur);
        this.stateService.getFondosActuales();
      }, error => {
        console.error('Error al obtener el precio de Ethereum:', error);
      });
    }
  }

  iniciarIntervalo(): void {
    this.intervaloTiempo = setInterval(() => {
      this.calcularTiempoRestante();
    }, 1000); // Intervalo de actualización de 1 segundo
  }
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    const idProducto = params['id'];
    console.log("Obteniendo detalles del producto: " + idProducto);
    // Llamada a la API para obtener los detalles del producto
    this.http.get<any[]>('/productos/detallesProducto/' + idProducto, { responseType: 'json' })
      .subscribe({
        next: response => {
          console.log("Detalles del producto obtenidos.");
          this.setProducto(response);
          this.calcularTiempoRestante();
          this.mostrarBotonPuja();
          this.intervaloTiempo = this.iniciarIntervalo();
        },
        error: error => 
        {
          console.error('Error al obtener la lista de productos:', error);
          window.alert("No se pudo recuperar la lista de productos."); // Manejo de error
        }
      });
    });
  }

  tiempoRestante: string = '';

  calcularTiempoRestante(): void {
    const fechaLimiteDate = new Date(this.producto.fechaFinalSubasta);
    const fechaActual = new Date();

    const diferenciaTiempo = fechaLimiteDate.getTime() - fechaActual.getTime();

    if (diferenciaTiempo <= 0) {
      this.tiempoRestante = 'La subasta ha finalizado';
      clearInterval(this.intervaloTiempo);
      return;
    }

    const dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenciaTiempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenciaTiempo % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenciaTiempo % (1000 * 60)) / 1000);

    this.tiempoRestante = `${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
  }

  // Creamos los getters y setters de los atributos del producto

  getId(): string {
    return this.producto.id;
  }

  setId(id: string): void {
    this.producto.id = id;
  }

  getNombre(): string {
    return this.producto.nombre;
  }

  setNombre(nombre: string): void {
    this.producto.nombre = nombre;
  }

  getDescripcion(): string {
    return this.producto.descripcion;
  }

  setDescripcion(descripcion: string): void {
    this.producto.descripcion = descripcion;
  }

  getEstado(): string {
    return this.producto.estado;
  }

  setEstado(estado: string): void {
    this.producto.estado = estado;
  }

  getPrecioInicial(): number {
    return this.producto.precioInicial;
  }

  setPrecioInicial(precioInicial: number): void {
    this.producto.precioInicial = precioInicial;
  }

  getPrecioActual(): number {
    return this.producto.precioActual;
  }

  setPrecioActual(precioActual: number): void {
    this.producto.precioActual = precioActual;
  }

  getFechaInicioSubasta(): string {
    return this.producto.fechaInicioSubasta;
  }

  setFechaInicioSubasta(fechaInicioSubasta: string): void {
    this.producto.fechaInicioSubasta = fechaInicioSubasta.slice(0, 10);
  }

  getFechaFinalSubasta(): string {
    return this.producto.fechaFinalSubasta;
  }

  setFechaFinalSubasta(fechaFinalSubasta: string): void {
    this.producto.fechaFinalSubasta = fechaFinalSubasta.slice(0, 10);
  }

  getEstadoSubasta(): string {
    return this.producto.estadoSubasta;
  }

  setEstadoSubasta(estadoSubasta: string): void {
    this.producto.estadoSubasta = estadoSubasta;
  }

  getImagenProducto(): string {
    return this.producto.imagenProducto;
  }

  setImagenProducto(imagenProducto: string): void {
    this.producto.imagenProducto = imagenProducto;
  }

  getCategoria(): string {
    return this.producto.categoria;
  }

  setCategoria(categoria: string): void {
    this.producto.categoria = categoria;
  }

  getPrecioEthInicial(): number {
    return this.producto.precioEthInicial;
  }

  setPrecioEthInicial(precioEth: number): void {
    this.getEthereumPrice();
    this.producto.precioEthInicial = precioEth / this.ethereumPrice;
  }

  getPrecioEthActual(): number {
    return this.producto.precioEthActual;
  }

  setPrecioEthActual(precioEth: number): void {
    this.getEthereumPrice();
    this.producto.precioEthActual = precioEth  / this.ethereumPrice;
  }

  setProducto(producto: any) {
    this.setId(producto.id);
    this.setNombre(producto.nombre);
    this.setDescripcion(producto.descripcion);
    this.setEstado(producto.estado);
    this.setCategoria(producto.categoria);
    this.setPrecioInicial(producto.precioInicial);
    this.setPrecioActual(producto.precioActual);
    this.setFechaInicioSubasta(producto.fechaInicioSubasta);
    this.setFechaFinalSubasta(producto.fechaFinalSubasta);
    this.setEstadoSubasta(producto.estadoSubasta);
    this.setImagenProducto(producto.imagenProducto);
    this.setPrecioEthInicial(producto.precioInicial);
    this.setPrecioEthActual(producto.precioActual);
  }

}
