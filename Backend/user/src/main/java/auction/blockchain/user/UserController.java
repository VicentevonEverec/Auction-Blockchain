package auction.blockchain.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    private final DatabaseServices databaseServices;
    private final UserRepository userRepository;

    public UserController(DatabaseServices databaseServices, UserRepository userRepository) {
        this.databaseServices = databaseServices;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<String> agregarUsuario(@RequestBody User usuario) {
        // Mostramos por consola todos los datos del usuario
        System.out.println(usuario.toString());

        // Convertimos la dirección de la cartera a minúsculas para asegurarnos de que no haya problemas
        usuario.setWalletAddress(usuario.getWalletAddress().toLowerCase());

        // Comprobamos que los datos del usuario no estén vacíos
        if (usuario.getName().isEmpty() || usuario.getSurname().isEmpty() || usuario.getDni().isEmpty() || usuario.getEmail().isEmpty() || usuario.getWalletAddress().isEmpty()) {
            return ResponseEntity.status(400).body("Faltan datos del usuario"); // Código 400 para Bad Request
        }

        // Comprobamos que el DNI del usuario no esté ya registrado
        if (databaseServices.checkUser(usuario.getDni())) {
            return ResponseEntity.status(409).body("El usuario ya está registrado"); // Código 409 para Conflict
        }

        // Comprobamos que la dirección de la cartera del usuario no esté ya registrada
        if (databaseServices.checkWalletAddress(usuario.getWalletAddress())) {
            return ResponseEntity.status(409).body("La dirección de la cartera ya está registrada"); // Código 409 para Conflict
        }

        // Si todas las comprobaciones pasan, guardamos el usuario y enviamos una respuesta exitosa
        userRepository.save(usuario);
        return ResponseEntity.ok("Usuario registrado con éxito"); // Código 200 para OK
    }

    @GetMapping("recover-user-data/{walletAddress}")
    public ResponseEntity<String> recupearDatosUsuario(@PathVariable String walletAddress) {
        // Mostramos por consola la dirección de la cartera
        System.out.println("Buscando usuario que sea propietario de: " + walletAddress);

        // Convertimos la dirección de la cartera a minúsculas para asegurarnos de que no haya problemas
        walletAddress = walletAddress.toLowerCase();

        // Comprobamos que la dirección de la cartera del usuario no esté ya registrada
        if (databaseServices.checkWalletAddress(walletAddress)) {
            System.out.println("Dirección de cartera encontrada en la base de datos.");
            User usuario = userRepository.findByWalletAddress(walletAddress);

            // Mostramos por consola todos los datos del usuario
            System.out.println(usuario.toString());

            return ResponseEntity.ok(usuarioToJsonString(usuario)); // Código 200 para OK
        } else {
            System.out.println("Dirección de cartera no encontrada en la base de datos.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dirección de cartera no encontrada en la base de datos."); // Código 404 para Not Found
        }
    }

    private String usuarioToJsonString(User usuario) {
        // Aquí convierte el objeto User a una cadena JSON, puedes usar una librería como Jackson o Gson
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(usuario);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "";
        }
    }
}
