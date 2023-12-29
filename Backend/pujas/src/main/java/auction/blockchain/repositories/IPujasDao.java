package auction.blockchain.repositories;

import auction.blockchain.entities.Pujas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPujasDao extends JpaRepository<Pujas, Long> {

}
