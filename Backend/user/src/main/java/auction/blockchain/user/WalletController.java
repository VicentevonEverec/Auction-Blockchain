package auction.blockchain.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WalletController
{
    private final DatabaseServices databaseServices;
    private final UserRepository userRepository;

    public WalletController(DatabaseServices databaseServices, UserRepository userRepository) {
        this.databaseServices = databaseServices;
        this.userRepository = userRepository;
    }

    @PostMapping("/check-wallet")
    public ResponseEntity<String> comprobarDireccionCartera(@RequestBody String walletAddress)
    {
        // Comprobamos que la dirección de la cartera del usuario no esté ya registrada
        if (databaseServices.checkWalletAddress(walletAddress))
        {
            System.out.println("Dirección de cartera encontrada en la base de datos.");
            return ResponseEntity.ok("Dirección de cartera encontrada en la base de datos."); // Código 200 para OK
        } else {
            System.out.println("Dirección de cartera no encontrada en la base de datos.");
            return ResponseEntity.status(404).body("Dirección de cartera no encontrada en la base de datos."); // Código 404 para Not Found
        }
    }

    @GetMapping("wallet-history/{walletAddress}")
    public ResponseEntity<List<String>> recuperarHistorialCarteras(@PathVariable String walletAddress)
    {
        // Mostramos por consola el DNI del usuario
        System.out.println("Buscando historial de carteras para el DNI: " + walletAddress);

        try {
            // Comprobamos si existe historial de carteras para el DNI
            List<String> history = databaseServices.walletHistory(walletAddress);

            if (history != null) {
                System.out.println("Historial de carteras encontrado en la base de datos.");
                System.out.println("Historial: " + String.join(", ", history));

                return ResponseEntity.ok(history); // Código 200 para OK
            } else {
                System.out.println("Historial de carteras no encontrado en la base de datos.");
                return ResponseEntity.notFound().build(); // Código 404 para Not Found
            }
        } catch (Exception e) {
            System.out.println("Error al buscar el historial de carteras: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Código 500 para Internal Server Error
        }
    }

    @PostMapping("/addWallet")
    public ResponseEntity<String> anadirDireccionCartera(@RequestBody Wallet wallet)
    {
        // Obtenemos el DNI del usuario actual
        String dni = userRepository.findByWalletAddress(wallet.getCurrentWallet()).getDni();

        if(wallet.getWalletAddress().equals(wallet.getCurrentWallet()))
        {
            System.out.println("La dirección de cartera es la misma que la actual.");
            return ResponseEntity.status(409).body("La dirección de cartera es la misma que la actual."); // Código 409 para Conflict
        }

        // Comprobamos que la dirección de la cartera del usuario no esté ya registrada
        if (databaseServices.checkWalletAddress(wallet.getWalletAddress()))
        {
            System.out.println("Dirección de cartera encontrada en la base de datos.");
            return ResponseEntity.status(409).body("La dirección de cartera ya se encuentra añadida a tu cuenta."); // Código 409 para Conflict
        } else {

            databaseServices.insertWalletHistory(wallet.getWalletAddress(), dni);

            return ResponseEntity.ok("Dirección de cartera añadida a la cuenta."); // Código 200 para OK
        }
    }

    @PostMapping("/deleteWallet")
    public ResponseEntity<String> eliminarDireccionCartera(@RequestBody Wallet wallet)
    {
        // Dirección de cartera a eliminar
        System.out.println("Dirección de cartera a eliminar: " + wallet.getWalletAddress());

        // Obtenemos el DNI del usuario actual
        String dni = userRepository.findByWalletAddress(wallet.getCurrentWallet()).getDni();

        // Comprobamos que la dirección de la cartera del usuario esté ya registrada en el historial de carteras
        if (databaseServices.checkWalletHistory(wallet.getWalletAddress(), dni))
        {
            System.out.println("Dirección de cartera encontrada en la base de datos.");

            databaseServices.deleteWalletHistory(wallet.getWalletAddress(), dni);

            return ResponseEntity.ok("Dirección de cartera eliminada de la cuenta."); // Código 200 para OK
        } else {
            System.out.println("Dirección de cartera no encontrada en la base de datos.");
            return ResponseEntity.status(409).body("La dirección de cartera no se encuentra añadida a tu cuenta."); // Código 409 para Conflict
        }
    }
}
