package auction.blockchain.service;

import java.util.Date;

public interface IDatabaseService {

    public String checkDatabaseConnection();

    public void actualizarPrecioProducto(String idProducto, String monto, Date fechaPuja);
}
