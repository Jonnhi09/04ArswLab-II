var OrdersControllerModule = (function () {

    var products = [];

    var showOrdersByTable = function () {
        //Todo implement

        var callback = {

            onSuccess: function (ordersList) {
                for (j in ordersList) {
                    //Crear tabla <table>
                    var table = document.createElement("TABLE");
                    table.border = "1";
                    //The setAttribute() method adds the specified attribute to an element, and gives it the specified value.
                    table.setAttribute("id", "Table" + j);

                    //Titulo de la tabla
                    var row = table.insertRow(-1);
                    //Crear encabezado <th>
                    var headerTable = document.createElement("TH");
                    //The colspan attribute defines the number of columns a cell should span.
                    headerTable.setAttribute("colspan", "2");
                    headerTable.innerHTML = "Table " + j;
                    row.appendChild(headerTable);

                    //Crear y agregar encabezado a las columnas
                    var header = ["Product", "Quantity"];
                    var row = table.insertRow(-1);
                    var columns = 2;
                    for (var i = 0; i < columns; i++) {
                        //Crear encabezados <th>
                        var headerCell = document.createElement("TH");
                        headerCell.innerHTML = header[i];
                        row.appendChild(headerCell);
                    }

                    //Crear filas con su respectivo contenido
                    for (var i = 0; i < Object.keys(ordersList[j].orderAmountsMap).length; i++) {
                        row = table.insertRow(-1);
                        var cell = row.insertCell(-1);
                        cell.innerHTML = Object.keys(ordersList[j].orderAmountsMap)[i];
                        var cell = row.insertCell(-1);
                        cell.innerHTML = ordersList[j].orderAmountsMap[Object.keys(ordersList[j].orderAmountsMap)[i]];
                    }

                    //Se obtiene el elemento del html
                    var tables = document.getElementById("Tables");
                    //Crear etiqueta salto de linea <br>
                    tables.appendChild(document.createElement("BR"));
                    tables.appendChild(table);
                }
            },
            onFailed: function (exception) {
                console.log(exception);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later. Load");
            }
        }
        RestControllerModule.getOrders(callback);
    };

    var showOrderByIdTable = function () {

        var selected = document.getElementById("Tables");
        var id = selected.options[selected.selectedIndex].value;
        id = parseInt(id.substring(id.length - 1));

        var callback = {
            onSuccess: function (order) {
                document.getElementById("List").innerHTML = "";
                var i = 1;
                for (o in Object.values(order)[0].orderAmountsMap) {

                    //Crear fila
                    var row = document.createElement("DIV");
                    row.setAttribute("class", "row"); //atributo

                    //crear columna
                    var column = document.createElement("DIV");
                    column.setAttribute("class", "col-md-2 mb-3"); //atributo

                    //crear etiqueta
                    var label = document.createElement("LABEL");
                    label.setAttribute("for", "Item" + i);
                    label.innerHTML = "Items";
                    column.appendChild(label);

                    //Crear menu
                    var select = document.createElement("SELECT");
                    select.setAttribute("Class", "custom-select d-block w-100");
                    select.setAttribute("id", "Item" + i);

                    //Crear opciones de menu
                    for (var k = 0; k < products.length; k++) {
                        var option = document.createElement("OPTION");
                        if (products[k] == o) {
                            option.setAttribute("id", "Selected" + i);
                            option.setAttribute("selected", "selected");
                        }
                        option.text = products[k];
                        select.add(option);
                    }
                    //Agregar menu
                    column.appendChild(select);
                    row.appendChild(column);


                    //Crear columna
                    column = document.createElement("DIV");
                    column.setAttribute("class", "col-md-2 mb-3"); //atributo

                    //crear etiqueta
                    label = document.createElement("LABEL");
                    label.setAttribute("for", "Quantity" + i);
                    label.innerHTML = "Quantity";
                    column.appendChild(label);

                    //Crear input text
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("class", "form-control");
                    input.setAttribute("id", "Quantity" + i);
                    input.setAttribute("value", Object.values(order)[0].orderAmountsMap[o]);

                    //Agregar input
                    column.appendChild(input);
                    row.appendChild(column);


                    //Crear columna
                    column = document.createElement("DIV");
                    column.setAttribute("class", "col-md-2 mb-3"); //atributo

                    //crear etiqueta
                    label = document.createElement("LABEL");
                    label.innerHTML = "";
                    column.appendChild(label);

                    //Crear boton
                    var p = document.createElement("P");
                    var button = document.createElement("BUTTON");
                    button.setAttribute("id", "buttonUpdate" + i);
                    button.setAttribute("role", "button");
                    button.setAttribute("class", "btn btn-info btn-lg");
                    button.setAttribute("onclick", "OrdersControllerModule.updateOrder($('#Tables').val(),[$('#Selected" + i + "\u0027" + ").val(),$('#Item" + i + "\u0027" + ").val(),$('#Quantity" + i + "\u0027" + ").val()])");
                    button.innerHTML = "Update";

                    //Agregar boton
                    p.appendChild(button)
                    column.appendChild(p);
                    row.appendChild(column);


                    //Crear columna
                    column = document.createElement("DIV");
                    column.setAttribute("class", "col-md-2 mb-3"); //atributo

                    //crear etiqueta
                    label = document.createElement("LABEL");
                    label.innerHTML = "";
                    column.appendChild(label);

                    //Crear boton
                    var p = document.createElement("P");
                    var button = document.createElement("BUTTON");
                    button.setAttribute("id", "buttonDelete" + i);
                    button.setAttribute("role", "button");
                    button.setAttribute("class", "btn btn-info btn-lg");
                    button.setAttribute("onclick", "OrdersControllerModule.deleteOrderItem($('#Tables').val(),$('#Selected" + i + "\u0027" + ").val())");
                    button.innerHTML = "Delete";

                    //Agregar boton
                    p.appendChild(button)
                    column.appendChild(p);
                    row.appendChild(column);


                    //Agregar
                    document.getElementById("List").appendChild(row);

                    i++;
                }
            },
            onFailed: function (exception) {
                console.log(exception);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later. Load");
            }
        }
        if (!isNaN(id)) {
            RestControllerModule.getOrder(id, callback);
        } else {
            document.getElementById("List").innerHTML = "";
        }
    };

    var shows = function () {

        var callback = {

            onSuccess: function (tableList) {
                var tables = document.getElementById("Tables");
                for (t in tableList) {
                    var option = document.createElement("OPTION");
                    option.text = "Table " + t;
                    tables.add(option);
                }
            },
            setProducts: function (itemList) {
                var items = document.getElementById("Items");
                for (i in itemList) {
                    var option = document.createElement("OPTION");
                    option.text = itemList[i];
                    items.add(option);
                    products.push(itemList[i]);
                }
            },
            onFailed: function (exception) {
                console.log(exception);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later. LoadTables");
            }
        }
        RestControllerModule.getOrders(callback);
        RestControllerModule.getProducts(callback);
    };

    var updateOrder = function (tableId, paramList) {
        var id = parseInt(tableId.substring(tableId.length - 1));
        var quantity = parseInt(paramList[2]);

        var callback = {

            onSuccess: function () {
                showOrderByIdTable();
            },
            onFailed: function (exception) {
                console.log(exception);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later. UpdateOrder");
            }
        }
        if (!isNaN(id) && !isNaN(quantity) && quantity > 0) {
            if (paramList[0] == paramList[1]) {
                RestControllerModule.updateOrder(id, paramList[0], paramList[2], callback);
            } else {
                deleteOrderItem(tableId, paramList[0]);
                addItemToOrder(tableId, paramList.slice(1, 3));
            }
            //RestControllerModule.updateOrder(id,itemName,callback);
        } else {
            alert("Uno de los parámetros no son correctos o no se han especificado.");
        }
    };

    var deleteOrderItem = function (tableId, itemName) {
        var id = parseInt(tableId.substring(tableId.length - 1));

        var callback = {

            onSuccess: function () {
                showOrderByIdTable();
            },
            onFailed: function (exception) {
                console.log(exception);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later. DeleteItem");
            }
        }
        if (!isNaN(id)) {
            RestControllerModule.deleteOrder(id, itemName, callback);
        } else {
            alert("Uno de los parámetros no son correctos o no se han especificado.");
        }
    };

    var addItemToOrder = function (tableId, item) {
        var id = parseInt(tableId.substring(tableId.length - 1));
        var quantity = parseInt(item[1]);

        var callback = {

            onSuccess: function () {
                showOrderByIdTable();
            },
            onFailed: function (exception) {
                console.log(exception);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later. AddItem");
            }
        }
        if (!isNaN(id) && products.includes(item[0]) && !isNaN(quantity) && quantity > 0) {
            item[1] = quantity;
            var jsonOrder = "{" + "\u0022" + item[0] + "\u0022" + ":" + item[1] + "}";
            RestControllerModule.createOrder(id, jsonOrder, callback);
        } else {
            alert("Uno de los parámetros no son correctos o no se han especificado.");
        }
    };

    return {
        showOrdersByTable: showOrdersByTable,
        showOrderByIdTable: showOrderByIdTable,
        shows: shows,
        updateOrder: updateOrder,
        deleteOrderItem: deleteOrderItem,
        addItemToOrder: addItemToOrder
    };

})();
