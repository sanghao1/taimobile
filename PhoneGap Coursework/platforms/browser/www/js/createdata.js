var database = { db: null,
createDatabase: function(){
    this.db = window.openDatabase( "irate0.db","1.0", "restaurant database",1000000);
    this.db.transaction(
        function(tx){
            //Run sql here using tx
            tx.executeSql(
                "create table if not exists restaurant(_id integer primary key, name text, restauranttype text , bussinesstime datetime, price text  , service_rating text , cleanning_rating text , food_rating text, note text , namereport text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table: " + error.message);
                }
            );
        },
        function(error){
            console.log("Transaction error: " + error.message);
        },
        function(){
            console.log("Create DB transaction completed successfully");
        }
    );
}
}
window.onload = function(){
    const form = document.getElementById("form");
    const error = document.getElementsByClassName("error");
    const name = document.getElementById("name");
    const price = document.getElementById("price");
    const nameReport = document.getElementById("nameReport");

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        validateForm();
        
    });

    function validateForm(){
        if(removewhitespace(name.value) === ''){
            setError(name,0,"Name is Required");
        }else{
            setSuccess(name,0);
        }
        
        if(removewhitespace(price.value) === '' || checkNumber(price.value)){
            setError(price,2,"* Price is Required");
        }else{
            setSuccess(price,2);
        }
        if(removewhitespace(nameReport.value) === ''){
            setError(nameReport,3,"Name report is Required");
        }else{
            setSuccess(nameReport,3);
        }
         if(removewhitespace(date.value) === ''){
            setError(date,1,"bussinesstime report is Required");
        }else{
            setSuccess(nameReport,1);
        }
        if(removewhitespace(name.value) !== '' && removewhitespace(price.value) !== '' && removewhitespace(nameReport.value) !== ''&& !checkNumber(price.value)){
            form.reset();
        }

    }

    function setError(input,index,message) {
        error[index].innerText = message;
        input.style.borderColor = "red";
    }
    function setSuccess(input,index) {
        error[index].innerText = '';
        input.style.borderColor = "#ccc";
    }
    function removewhitespace(text){
        return text.trim();
    }
    function checkNumber(number){
        if(isNaN(number)){
            return true;
        }else{
            return false;
        }
    }
    

};



