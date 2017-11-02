$("document").ready(function() {
    $("#clicker").click(function(){
        console.log("hey");
        $.ajax({
            type: "POST",
            url: "http://localhost:81/clicked"
        });
    });
});