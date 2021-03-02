$(document).on("ready", function(){
    database.createDatabase();
});

function addProduct(){
    var name = $("#name").val();
    var restauranttype = $("#type").val();
    var date = $("#date").val();
    var price = $("#price").val();
    var serviceRating = $("#service").val();
    var cleanRating = $("#clean").val();
    var foodRating = $("#food").val();
    var note = $("#note").val();
    var nameReport = $("#nameReport").val();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;
    if(today < date) {
        alert("date invalid");
        return false;
    }
    if(!name || !price || !nameReport || isNaN(price)){
        alert("field is required");
    }else{
        var r = confirm(`Name : ${name}
        restaurant type : ${restauranttype}
        Date: ${date}
        Price : ${price}
        Service Rating : ${serviceRating}
        Clean Rating : ${cleanRating}
        Food Rating : ${foodRating}
        Note : ${note}
        Name Report : ${nameReport}`);             
        if(r==true){
            price = price+"$";
        
            data.addProduct(name, restauranttype, date, price , serviceRating , cleanRating , foodRating, note, nameReport );
 
        }                  
    }
};

var currentProduct={
id: -1,
name: "",
restauranttype: "",
date: "",
price: "",
service_rating : "",
clean_rating : "",
food_rating :"",
note:"",
nameReport: "",
}


// 
function displayProducts(results){
    var length = results.rows.length;
    var lstProducts = $("#lstProducts");
    lstProducts.empty();//Clean the old data before adding.
    for(var i = 0; i< length; i++){
        var item = results.rows.item(i);

        var a = $("<a />");
        var h3 = $("<h4 />").text("name: ");
        var h4 = $("<h4 />").text("type: ");
        var h5=$("<h4 />").text("date:");
        var h7 = $("<h4/>").text("price: ");
        var h8 = $("<h4/>").text("serviceRating: ");
        var h9 = $("<h4/>").text("cleanRating ");
        var h10 = $("<h4 />").text("foodRating:");
        var h11 = $("<h4 />").text("note: ");
        var h12 = $("<h4 />").text("nameReport: ");
        var p = $("<p />").text("Id: ");
        var spanName = $("<span />").text(item.name);
        spanName.attr("name", "name");
        var spandType = $("<span />").text(item.restauranttype);
        spandType.attr("name", "restauranttype");
        var spanddate = $("<span />").text(item.bussinesstime);
        spanddate.attr("name", "bussinesstime");
        
        var spandPrice = $("<span />").text(item.price);
        spandPrice.attr("name", "price");
        var spandService = $("<span />").text(item.service_rating);
        spandService.attr("name", "service_rating");
        var spandClean = $("<span />").text(item.cleanning_rating);
        spandClean.attr("name", "cleanning_rating");
        var spandFood = $("<span />").text(item.food_rating);
        spandFood.attr("name", "food_rating");
        var spandNote = $("<span />").text(item.note);
        spandNote.attr("name", "note");
        var spandNameReport = $("<span />").text(item.namereport);
        spandNameReport.attr("name", "namereport");
        var spanId = $("<span />").text(item._id);
        spanId.attr("name", "_id");
        h3.append(spanName);
        a.append(h3);
        h4.append(spandType);

        a.append(h4);
        h5.append(spanddate);
   
        a.append(h5);
        h7.append(spandPrice);
    
        a.append(h7);
        h8.append(spandService);
      
        a.append(h8);
        h9.append(spandClean);
     
        a.append(h9);
        h10.append(spandFood);
    
        a.append(h10);
        h11.append(spandNote);
 
        a.append(h11);
        h12.append(spandNameReport);
        a.append(h12);
        p.append(spanId);
        a.append(p);
        var li = $("<li/>");
        li.attr("data-filtertext", item.type);
        li.attr("data-filtertext", item.name);
        
        li.append(a);
        lstProducts.append(li);
    }
    lstProducts.listview("refresh");

    lstProducts.on("tap", "li", function(){
        currentProduct.id = $(this).find("[name='_id']").text();
        currentProduct.name = $(this).find("[name='name']").text();
        currentProduct.restauranttype = $(this).find("[name='restauranttype']").val();
        currentProduct.date = $(this).find("[name='bussinesstime']").val();
        currentProduct.price = $(this).find("[name='price']").text();
        currentProduct.service_rating = $(this).find("[name='service_rating']").val();
        currentProduct.cleanning_rating = $(this).find("[name='cleanning_rating']").val();
        currentProduct.food_rating = $(this).find("[name='food_rating']").val();
        currentProduct.note = $(this).find("[name='note']").val();
        currentProduct.nameReport = $(this).find("[name='namereport']").text();
        
 
        $('#popupUpdateDelete').popup("open");
        $("div").remove(".ui-popup-screen");
    });
}


$(document).on("pagebeforeshow", "#loadpage", function(){
    data.loadProducts(displayProducts);
});

function deleteProduct(){
        data.deleteProduct(currentProduct.id);
        data.loadProducts(displayProducts);
        $("#popupUpdateDelete").popup("close");
    
}

$(document).on("pagebeforeshow", "#updatedialog", function(){
    $("#new-name").val(currentProduct.name);
    $("#new-type").val(currentProduct.restauranttype);
    $("#new-date").val(currentProduct.date);
    $("#new-price").val(currentProduct.price);
    $("#new-note").val(currentProduct.note);
    $("#new-nameReport").val(currentProduct.nameReport);
    $("#new-services").val(currentProduct.service_rating);
    $("#new-clean").val(currentProduct.cleanning_rating);
    $("#new-food").val(currentProduct.food_rating);
});

function updateProduct(){
    var new_name = $("#new-name").val();
    var new_type = $("#new-type").val();
    var new_dateTime = $("#new-date").val();
    var new_price = $("#new-price").val();
    var new_note = $("#new-note").val();
    var new_nameReport = $("#new-nameReport").val();
    var new_serviceRating = $("#new-services").val();
    var new_cleanRating = $("#new-clean").val();
    var new_foodRating = $("#new-food").val();
    data.updateProduct(currentProduct.id, new_name, new_type, new_dateTime, new_price, new_note, new_nameReport, new_serviceRating, new_cleanRating, new_foodRating);
    $("#updatedialog").dialog("close");
}