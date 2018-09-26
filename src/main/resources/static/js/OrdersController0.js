var order1 = {
    "table_id": 2,
    "products": [{
            "product": "PIZZA",
            "quantity": 3,
            "price": "$10000"
        },
        {
            "product": "HOTDOG",
            "quantity": 1,
            "price": "$3000"
        },
        {
            "product": "COKE",
            "quantity": 4,
            "price": "$1300"
        }
    ]
};

function addNewOrder() {
    var order2 = {"orderAmountsMap": {"HAMBURGER": 2, "COKE": 2}, "tableNumber": 2};
    axios.post('/orders', order2)
            .then(function () {
                console.log("New order");
            })
            .catch(function (error) {
                console.log(error);
                alert("ADD There is a problem with our servers. We apologize for the inconvince, please try again later");
            });
}

function loadOrders() {
    axios.get('/orders')
            .then(function (response) {
                var orders = response.data;

                for (j in orders) {

                    var dvTable = document.getElementById("dvTables");

                    var header = new Array();
                    header.push("Product");
                    header.push("Quantity");
                    header.push("Price");

                    var table = document.createElement("TABLE");
                    table.border = "1";
                    table.setAttribute("id", "Table" + j);

                    var column = 2;

                    var row = table.insertRow(-1);
                    var headerTable = document.createElement("TH");
                    headerTable.setAttribute("colspan", "3");
                    headerTable.innerHTML = "Table " + j;
                    row.appendChild(headerTable);

                    var row = table.insertRow(-1);
                    for (var i = 0; i < column; i++) {
                        var headerCell = document.createElement("TH");
                        headerCell.innerHTML = header[i];
                        row.appendChild(headerCell);
                    }

                    for (var i = 0; i < Object.keys(orders[j].orderAmountsMap).length; i++) {
                        row = table.insertRow(-1);
                        var cell = row.insertCell(-1);
                        cell.innerHTML = Object.keys(orders[j].orderAmountsMap)[i];
                        var cell = row.insertCell(-1);
                        cell.innerHTML = orders[j].orderAmountsMap[Object.keys(orders[j].orderAmountsMap)[i]];
                    }

                    dvTable.appendChild(document.createElement("BR"));
                    dvTable.appendChild(table);
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("LOAD There is a problem with our servers. We apologize for the inconvince, please try again later");
            });
}

function removeOrderById(id) {
    axios.delete('/orders/' + id)
            .then(function () {
                document.getElementById("Table " + id).remove();
            })
            .catch(function (error) {
                console.log(error);
                alert("REMOVE There is a problem with our servers. We apologize for the inconvince, please try again later");
            });
}
