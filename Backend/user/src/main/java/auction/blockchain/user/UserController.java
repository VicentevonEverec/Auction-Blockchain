package auction.blockchain.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController
{
    private final DatabaseCheckService databaseCheckService;
    private final UserRepository userRepository;

    public UserController(DatabaseCheckService databaseCheckService, UserRepository userRepository) {
        this.databaseCheckService = databaseCheckService;
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
        if (databaseCheckService.checkUser(usuario.getDni())) {
            return ResponseEntity.status(409).body("El usuario ya está registrado"); // Código 409 para Conflict
        }

        // Comprobamos que la dirección de la cartera del usuario no esté ya registrada
        if (databaseCheckService.checkWalletAddress(usuario.getWalletAddress())) {
            return ResponseEntity.status(409).body("La dirección de la cartera ya está registrada"); // Código 409 para Conflict
        }

        // Si todas las comprobaciones pasan, guardamos el usuario y enviamos una respuesta exitosa
        userRepository.save(usuario);
        return ResponseEntity.ok("Usuario registrado con éxito"); // Código 200 para OK
    }

    @PostMapping("/check-wallet")
    public ResponseEntity<String> comprobarDireccionCartera(@RequestBody String walletAddress)
    {
        // Comprobamos que la dirección de la cartera del usuario no esté ya registrada
        if (databaseCheckService.checkWalletAddress(walletAddress))
        {
            System.out.println("Dirección de cartera encontrada en la base de datos.");
            return ResponseEntity.ok("Dirección de cartera encontrada en la base de datos."); // Código 200 para OK
        } else {
            System.out.println("Dirección de cartera no encontrada en la base de datos.");
            return ResponseEntity.status(404).body("Dirección de cartera no encontrada en la base de datos."); // Código 404 para Not Found
        }
    }

    @GetMapping("/comprobar-conexion")
    public String comprobarConexion() {
        User usuario = new User("Pepe", "Pérez", "12345678A", "pepe@gmail.com", "0x123456789");
        return databaseCheckService.insertUser(usuario);
    }
}
