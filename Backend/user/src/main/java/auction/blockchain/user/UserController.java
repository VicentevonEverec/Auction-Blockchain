package auction.blockchain.user;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
public class UserController
{
    private final DatabaseCheckService databaseCheckService;
    private final UserRepository userRepository;

    public UserController(DatabaseCheckService databaseCheckService, UserRepository userRepository) {
        this.databaseCheckService = databaseCheckService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public User agregarUsuario(@RequestBody User usuario) {
        return userRepository.save(usuario);
    }

    @GetMapping("/comprobar-conexion")
    public String comprobarConexion() {
        User usuario = new User("Pepe", "Pérez", "12345678A", "pepe@gmail.com", "0x123456789");
        return databaseCheckService.insertUser(usuario);
    }
}
