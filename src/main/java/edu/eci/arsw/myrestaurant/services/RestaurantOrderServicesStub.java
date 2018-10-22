package edu.eci.arsw.myrestaurant.services;

import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.model.RestaurantProduct;
import edu.eci.arsw.myrestaurant.beans.BillCalculator;
import edu.eci.arsw.myrestaurant.model.ProductType;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class RestaurantOrderServicesStub implements RestaurantOrderServices {
    
    @Autowired
    @Qualifier("Taxes")
    BillCalculator calc = null;
    
    public RestaurantOrderServicesStub() {
    }
    
    public void setBillCalculator(BillCalculator calc) {
        this.calc = calc;
    }
    
    @Override
    public Order getTableOrder(int tableNumber) {
        if (!tableOrders.containsKey(tableNumber)) {
            return null;
        } else {
            return tableOrders.get(tableNumber);
        }
    }
    
    @Override
    public void updateTableOrder(int tableNumber, String itemName, int quantity) throws OrderServicesException {
        Order order = getTableOrder(tableNumber);
        if (order != null && order.getOrderAmountsMap().containsKey(itemName)) {
            try {
                order.getOrderAmountsMap().put(itemName, quantity);
            } catch (Exception e) {
                throw new OrderServicesException("El item " + itemName + "no esta asociado a la orden.");
            }
        } else {
            throw new OrderServicesException("Mesa " + tableNumber + "inexistente ");
        }
    }
    
    @Override
    public Set<String> getAvailableProductNames() {
        return productsMap.keySet();
    }
    
    @Override
    public RestaurantProduct getProductByName(String product) throws OrderServicesException {
        if (!productsMap.containsKey(product)) {
            throw new OrderServicesException("Producto no existente:" + product);
        } else {
            return productsMap.get(product);
        }
    }
    
    @Override
    public Set<Integer> getTablesWithOrders() {
        return tableOrders.keySet();
    }
    
    @Override
    public void addNewOrderToTable(Order o) throws OrderServicesException {
        if (tableOrders.containsKey(o.getTableNumber())) {
            throw new OrderServicesException("La mesa tiene una orden abierta. Debe "
                    + "cerrarse la cuenta antes de crear una nueva.:" + o.getTableNumber());
        } else {
            tableOrders.put(o.getTableNumber(), o);
        }
        
    }
    
    @Override
    public void releaseTable(int tableNumber) throws OrderServicesException {
        if (!tableOrders.containsKey(tableNumber)) {
            throw new OrderServicesException("Mesa inexistente o ya liberada:" + tableNumber);
        } else {
            tableOrders.remove(tableNumber);
        }
        
    }
    
    @Override
    public void releaseItem(int tableNumber, String itemName) throws OrderServicesException {
        Order order = getTableOrder(tableNumber);
        if (order != null) {
            try {
                order.getOrderAmountsMap().remove(itemName);
            } catch (Exception e) {
                throw new OrderServicesException("El item " + itemName + "no esta asociado a la orden.");
            }
        } else {
            throw new OrderServicesException("Mesa " + tableNumber + "inexistente ");
        }
    }
    
    @Override
    public int calculateTableBill(int tableNumber) throws OrderServicesException {
        if (!tableOrders.containsKey(tableNumber)) {
            throw new OrderServicesException("Mesa inexistente o ya liberada:" + tableNumber);
        } else {
            return calc.calculateBill(tableOrders.get(tableNumber), productsMap);
        }
    }
    
    private static final Map<String, RestaurantProduct> productsMap;
    
    private static final Map<Integer, Order> tableOrders;
    
    static {
        productsMap = new ConcurrentHashMap<>();
        tableOrders = new ConcurrentHashMap<>();
        productsMap.put("PIZZA", new RestaurantProduct("PIZZA", 10000, ProductType.DISH));
        productsMap.put("HOTDOG", new RestaurantProduct("HOTDOG", 3000, ProductType.DISH));
        productsMap.put("COKE", new RestaurantProduct("COKE", 1300, ProductType.DRINK));
        productsMap.put("HAMBURGER", new RestaurantProduct("HAMBURGER", 12300, ProductType.DISH));
        productsMap.put("BEER", new RestaurantProduct("BEER", 2500, ProductType.DRINK));
        
        Order o = new Order(1);
        o.addDish("PIZZA", 3);
        o.addDish("HOTDOG", 1);
        o.addDish("COKE", 4);
        
        tableOrders.put(1, o);
        
        Order o2 = new Order(3);
        o2.addDish("HAMBURGER", 2);
        o2.addDish("COKE", 2);
        
        tableOrders.put(3, o2);
        
        Order o3 = new Order(4);
        o3.addDish("PIZZA", 3);
        o3.addDish("HAMBURGER", 2);
        o3.addDish("HOTDOG", 1);
        
        tableOrders.put(4, o3);
        
        Order o4 = new Order(5);
        o4.addDish("COKE", 4);
        o4.addDish("BEER", 2);
        
        tableOrders.put(5, o4);
    }
}