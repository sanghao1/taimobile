var data={
addProduct: function(name, restauranttype,  date , price, serviceRating , cleanRating , foodRating , note, nameReport){
    database.db.transaction(
        function(tx){
            tx.executeSql(
                "insert into restaurant(name, restauranttype,  bussinesstime, price, service_rating , cleanning_rating , food_rating, note, namereport) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [name, restauranttype, date, price, serviceRating , cleanRating , foodRating, note, nameReport],
                function(tx, results){},
                function(tx, error){
                    console.log("add product error: " + error.message);   
                }
            );                   
        },
       function(error){},
        function(){}
    );  
},
loadProducts: function(displayProducts){
    database.db.readTransaction(
        function(tx){
            tx.executeSql(
                "select * from restaurant",
                [],
                function(tx, results){
                    //Do the display
                    displayProducts(results);
                },
                function(tx, error){//TODO: Alert the message to user
                    console.log("Error while selecting the products" + error.message);
                }
            );
        }
    );
},
deleteProduct:function(_id){
    database.db.transaction(
        function(tx){
            tx.executeSql(
                "delete from restaurant where _id = ?",
                [_id],
                function(tx, results){},
                function(tx, error){//TODO: Could make an alert for this one.
                    console.log("Error happen when deleting: " + error.message);
                }
            );
        }
    );
},
updateProduct: function(_id, newName, new_type, new_dateTime, new_price, new_note, new_nameReport, new_serviceRating, new_cleanRating, new_foodRating){
    database.db.transaction(
        function(tx){
            tx.executeSql(
                "update restaurant set name=?, restauranttype=?, bussinesstime=?, price=?, note=?, namereport=?, service_rating=? , cleanning_rating=? , food_rating=?  where _id = ?",
                [newName, new_type, new_dateTime, new_price, new_note, new_nameReport, new_serviceRating, new_cleanRating, new_foodRating, _id],
                function(tx, result){},
                function(tx, error){//TODO: alert/display this message to user
                    console.log("Error updating product" + error.message);
                }
            );
        }
    );
}
};





