$("document").ready(function() {
   
    var socket = io(); // Dans le html j'ai utilisé socket.io donc je peux faire ceci pour rendre ce JS dynamique
    var strToSend = $("#textbox").val(); // Je définis strToSend qui prend la valeur de ma textbox

    $("form").submit(function(){ // Quand l'utilisateur submit le formulaire
        strToSend = $("#textbox").val(); // On récupère le contenu de la textbox
        if (strToSend != undefined && strToSend != "") { // Ne s'exécute que si la saisie est non-nulle. 
            console.log(strToSend);
            socket.emit("POSTED", strToSend); // On va envoyé l'évènement "POSTED" au serveur, qui sera pris en charge par io, rappelez-vous. 
            $("#textbox").val(""); // Je vide ma textbox
            return false;
        } // not empty end
    });
    
    socket.on("REFRESH", function(msg){ // Un listener, possible grâce à socket.io : Lorsque le browser reçoit "REFRESH" de la part du serveur
        var thisTime = new Date();
        console.log("<<< USER told something at '" + thisTime); 
        $("#mslist").append( $("<li>").text(msg) ); // Ajouter le message (msg) dans le DOM. 
    }); 
});