package auction.blockchain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
public class ProductoDto {

    private Long id;
    private String nombre;
    private String estado;
    private BigDecimal precioInicial;
    private BigDecimal precioActual;
    private Date fechaInicioSubasta;
    private Date fechaFinalSubasta;
    private String estadoSubasta;
    private String imagenProducto;
}
