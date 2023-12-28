import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.scss']
})
export class DetallesProductoComponent implements OnInit {

  producto = {
    id: "", nombre: "", descripcion: "",
     estado: "", categoria: "", precioInicial: "", precioActual: "",
    fechaInicioSubasta: "", fechaFinalSubasta: "", estadoSubasta: "", imagenProducto: ""
    };

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

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
        },
        error: error => 
        {
          console.error('Error al obtener la lista de productos:', error);
          window.alert("No se pudo recuperar la lista de productos."); // Manejo de error
        }
      });
      const id = params['id'];
      console.log('ID del producto:', id);
      // Aquí puedes utilizar el ID del producto para realizar acciones adicionales, como cargar detalles del producto desde el backend, etc.
  });
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

  getPrecioInicial(): string {
    return this.producto.precioInicial;
  }

  setPrecioInicial(precioInicial: string): void {
    this.producto.precioInicial = precioInicial;
  }

  getPrecioActual(): string {
    return this.producto.precioActual;
  }

  setPrecioActual(precioActual: string): void {
    this.producto.precioActual = precioActual;
  }

  getFechaInicioSubasta(): string {
    return this.producto.fechaInicioSubasta;
  }

  setFechaInicioSubasta(fechaInicioSubasta: string): void {
    this.producto.fechaInicioSubasta = fechaInicioSubasta;
  }

  getFechaFinalSubasta(): string {
    return this.producto.fechaFinalSubasta;
  }

  setFechaFinalSubasta(fechaFinalSubasta: string): void {
    this.producto.fechaFinalSubasta = fechaFinalSubasta;
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
  }

}
