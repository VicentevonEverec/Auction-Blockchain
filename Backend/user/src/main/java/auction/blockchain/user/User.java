package auction.blockchain.user;

import jakarta.persistence.*;
import org.springframework.data.jpa.repository.JpaRepository;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String dni;
    private String walletAddress;

    public User() {
    }

    public User(String name, String surname, String email, String dni, String walletAddress) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.dni = dni;
        this.walletAddress = walletAddress;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }

    public String getWalletAddress() { return walletAddress; }
    public void setWalletAddress(String walletAddress) { this.walletAddress = walletAddress; }
}

