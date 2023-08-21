package auction.blockchain.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

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

    public String[] walletHistory(String dni) {
        try {
            // Buscamos en la base de datos la dirección de la cartera
            String[] history;

            // Primero buscamos la cartera del usuario actual en user
            String[] userWallet = jdbcTemplate.queryForObject(
                    "SELECT wallet_address FROM user WHERE dni = ?",
                    String[].class, dni);

            // Luego, buscamos las carteras del historial y las añadimos a la historia
            history = userWallet;  // Inicializamos history con las carteras del usuario

            try {
                String[] walletHistory = jdbcTemplate.queryForObject(
                        "SELECT wallet_address FROM wallet_history WHERE user_dni = ?", String[].class, dni);

                // Agregamos las carteras del historial a history sin duplicados
                history = mergeArrays(userWallet, walletHistory);
            } catch (EmptyResultDataAccessException ignored) {
                // Mostramos un mensaje de error si no se encuentra ningún resultado
                System.out.println("No se ha encontrado ningún historial de carteras");
            }

            return history;
        } catch (EmptyResultDataAccessException e) {
            // EmptyResultDataAccessException se lanza si no se encuentra ningún resultado
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Función para combinar dos arrays eliminando duplicados
    private String[] mergeArrays(String[] arr1, String[] arr2) {
        Set<String> mergedSet = new HashSet<>(Arrays.asList(arr1));
        mergedSet.addAll(Arrays.asList(arr2));
        return mergedSet.toArray(new String[0]);
    }

}

