package auction.blockchain.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class DatabaseCheckService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DatabaseCheckService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

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

    // Introducimos un método para comprobar la inserción de un usuario en la base de datos
    public String insertUser(User user)
    {
        try {
            jdbcTemplate.update("INSERT INTO user (name, surname, email, dni, wallet_address) VALUES (?, ?, ?, ?, ?)", user.getName(), user.getSurname(), user.getEmail(), user.getDni(), user.getWalletAddress());
            return "Usuario insertado correctamente";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al insertar el usuario";
        }
    }

    public boolean checkUser(String dni) {
        try {
            // Realiza una consulta simple a la base de datos para verificar la conexión
            jdbcTemplate.queryForObject("SELECT 1 FROM user WHERE dni = ?", Integer.class, dni);
            return true;
        } catch (EmptyResultDataAccessException e) {
            // EmptyResultDataAccessException se lanza si no se encuentra ningún resultado
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public boolean checkWalletAddress(String walletAddress)
    {
        System.out.println("Buscando en la base de datos: " + walletAddress);

        try {
            // Buscamos en la base de datos la dirección de la cartera
            jdbcTemplate.queryForObject("SELECT 1 FROM user WHERE wallet_address = ?", Integer.class, walletAddress);
            return true;
        } catch (EmptyResultDataAccessException e) {
            // EmptyResultDataAccessException se lanza si no se encuentra ningún resultado
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}

