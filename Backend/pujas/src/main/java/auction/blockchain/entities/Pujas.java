package auction.blockchain.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "pujas")
public class Pujas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_dni")
    private String usuarioDni;

    @Column(name = "ID_Producto")
    private Long idProducto;

    @Column(name = "monto")
    private BigDecimal monto;

    @Column(name = "fecha_puja")
    private Date fechaPuja;

    @Column(name = "wallet_address")
    private String walletAddress;

}
