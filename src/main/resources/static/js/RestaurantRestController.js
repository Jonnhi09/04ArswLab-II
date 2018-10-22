var RestControllerModule = (function () {

    var getOrders = function (callback) {
        axios.get('/orders').then(function (ordersList) {
            callback.onSuccess(ordersList.data);
        }).catch(function (error) {
            callback.onFailed(error);
        })
    };

    var getOrder = function (idTable, callback) {
        axios.get('/orders/' + idTable).then(function (order) {
            callback.onSuccess(order.data);
        }).catch(function (error) {
            callback.onFailed(error);
        })
    };

    var updateOrder = function (idTable, itemName, quantity, callback) {
        axios.put('/orders/' + idTable + '/' + itemName, quantity, {headers: {'Content-Type': 'application/json'}}).then(function () {
            callback.onSuccess();
        }).catch(function (error) {
            callback.onFailed(error);
        })
    };

    var deleteOrder = function (tableId, itemName, callback) {
        axios.delete('/orders/' + tableId + '/' + itemName).then(function () {
            callback.onSuccess();
        }).catch(function (error) {
            callback.onFailed(error);
        })
    };

    var createOrder = function (id, order, callback) {
        axios.put('/orders/' + id, order, {headers: {'Content-Type': 'application/json'}}).then(function () {
            callback.onSuccess();
        }).catch(function (error) {
            callback.onFailed(error);
        })
    };

    var getProducts = function (callback) {
        axios.get('/orders/products').then(function (productList) {
            callback.setProducts(productList.data);
        })
    };

    return {
        getOrders: getOrders,
        getOrder: getOrder,
        getProducts: getProducts,
        updateOrder: updateOrder,
        deleteOrder: deleteOrder,
        createOrder: createOrder
    };

})();
