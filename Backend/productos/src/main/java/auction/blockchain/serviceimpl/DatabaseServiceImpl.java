package auction.blockchain.serviceimpl;

import auction.blockchain.dto.ProductoDto;
import auction.blockchain.entities.Productos;
import auction.blockchain.service.IDatabaseService;
import auction.blockchain.service.IProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DatabaseServiceImpl implements IDatabaseService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private IProductosService productosService;

    @Override
    public String checkDatabaseConnection() {
        try {
            // Realiza una consulta simple a la base de datos para verificar la conexión
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return "Conexión exitosa";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al conectar con la base de datos";
        }
    }

    @Override
    public List<ProductoDto> obtenerProductos() {
        // Obtiene todos los productos de la base de datos
        System.out.println("Obteniendo productos de la base de datos...");
        List<ProductoDto> productos = jdbcTemplate.query("SELECT * FROM productos", (rs, rowNum) ->
                new ProductoDto(
                        rs.getLong("ID_Producto"),
                        rs.getString("Nombre"),
                        rs.getString("Estado"),
                        rs.getBigDecimal("Precio_Inicial"),
                        rs.getBigDecimal("Precio_Actual"),
                        rs.getDate("Fecha_Inicio_Subasta"),
                        rs.getDate("Fecha_Final_Subasta"),
                        rs.getString("Estado_Subasta"),
                        rs.getString("Imagen_Producto")
                )
        );
        System.out.println("Productos obtenidos: " + productos);
        return productos;
    }
}

