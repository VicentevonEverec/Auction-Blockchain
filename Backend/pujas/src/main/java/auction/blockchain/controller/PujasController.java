package auction.blockchain.controller;

import auction.blockchain.service.IDatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auction")
public class PujasController {

    @Autowired
    private IDatabaseService databaseService;

    @GetMapping("/database")
    public ResponseEntity<String> checkConnection() {
        String connection = databaseService.checkDatabaseConnection();
        return new ResponseEntity<>(connection, HttpStatus.OK);
    }

}
