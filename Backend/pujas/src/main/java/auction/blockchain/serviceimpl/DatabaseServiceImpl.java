package auction.blockchain.serviceimpl;

import auction.blockchain.service.IDatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class DatabaseServiceImpl implements IDatabaseService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

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
}

