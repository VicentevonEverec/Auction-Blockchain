package auction.blockchain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class ProductoDto {

    private Long id;
    private String nombre;

    private String descripcion;

    private String estado;

    private String categoria;

    private BigDecimal precioInicial;
    private BigDecimal precioActual;
    private Date fechaInicioSubasta;
    private Date fechaFinalSubasta;
    private String estadoSubasta;
    private String imagenProducto;

    public ProductoDto(Long id, String nombre, String estado, BigDecimal precioInicial,
                       BigDecimal precioActual, Date fechaInicioSubasta, Date fechaFinalSubasta,
                       String estadoSubasta, String imagenProducto) {
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.precioInicial = precioInicial;
        this.precioActual = precioActual;
        this.fechaInicioSubasta = fechaInicioSubasta;
        this.fechaFinalSubasta = fechaFinalSubasta;
        this.estadoSubasta = estadoSubasta;
        this.imagenProducto = imagenProducto;
    }

    public ProductoDto(Long id, String nombre, String descripcion, String estado, String categoria,
                       BigDecimal precioInicial, BigDecimal precioActual, Date fechaInicioSubasta,
                       Date fechaFinalSubasta, String estadoSubasta, String imagenProducto) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
        this.categoria = categoria;
        this.precioInicial = precioInicial;
        this.precioActual = precioActual;
        this.fechaInicioSubasta = fechaInicioSubasta;
        this.fechaFinalSubasta = fechaFinalSubasta;
        this.estadoSubasta = estadoSubasta;
        this.imagenProducto = imagenProducto;
    }
}
