var serverinit = function() {
    // Modules
    var ejs = require('ejs'); // EJS pour user des variables dans les .html
    var express = require("express"); // On appelle le module "express"
    var app = express(); // L'app va utiliser express
    app.set("view engine", "express");
    var fs = require("fs"); // Pour charger un fichier chez le client
    // Some paths
    var viewPath = __dirname + "/view/";
    var cssPath = viewPath + "css/";
    var appHomePath = ["/","/index.html","/index.htm","/index.php","/index","/home"]; // Liste des adresse pour laquelle on va renvoyer la page d'accueil
    var notFound = function(res) { // Je fais une fonction pour appeler la 404 sans me prendre la tête 
        console.log(">>> SEND '404' TO client");
        res.sendFile(viewPath + "404.html");
    }
    /* .GET pour ouvrir les fichiers demandés par le client */
    app.get(appHomePath, function(req, res) { // homepage
        var targetFile = viewPath + "index.ejs";
        console.log(">>> SEND '" + targetFile + "' TO client");
        res.render(targetFile); // Envoyer le fichier demandé au client
    }) // homepage
    .get("/:pageRequest", function(req, res) { // Premier niveau
        var targetFile = viewPath + req.params.pageRequest;
        if (fs.existsSync(targetFile)) {
            if (/.css/i.test(targetFile)) 
            {
                console.log(">>> SEND '" + targetFile + "' TO client"); 
            }
            res.sendFile(targetFile); 
        }
        else {
            console.log("<<< ASKED '" + targetFile + "' FROM client"); // Log au serveur que l'utilisateur a demandé une page impossible à trouver
            notFound(res); // 404
        }
    })
    .get("/:dirRequest/:pageRequest", function(req, res) { // Second niveau
        var targetFile = viewPath + req.params.dirRequest + "/" + req.params.pageRequest;
        if (fs.existsSync(targetFile)) {
            console.log(">>> SEND '" + targetFile + "' TO client");
            res.sendFile(targetFile);
        }
        else {
            console.log("<<< ASKED '" + targetFile + "' FROM client");
            notFound(res);
        }
    })
    .use(function(req, res) { // Autre
        notFound(res);
    });
    
    app.listen(8080);
}; // var init

serverinit(); // Lancer le serveur
/* Pour BeCode par Axel Fiolle */