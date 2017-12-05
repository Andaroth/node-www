var chatServer = function() {
    var app = require("express")(); // Je créé un objet qui va supporter le module express
    var server = require("http").Server(app); // Je créé un autre objet, le serveur, qui va être un module express qui va supporter l'objet "app" et donc express de la même occasion. 
    var fs = require("fs"); // Le module "fs" est nécessaire pour servir des fichiers externes au chat.js vers le visiteur
    var io = require("socket.io")(server); // Je vais placer le module io sur mon serveur, j'ai pas encore bien capté cette syntaxe mais ça marche. 
    
    /*
        Ici, j'utilise le module socket.io
        ---
        Grâce à "on" et le paramètre "connection", 
        je peux sélectionner en quelque-sorte la session de l'utilisateur. 
        Ca marche un peu comme un addEventListener(). 
    */
    io.on("connection", function(client){
        // Je vais placer des instructions dans mon listener
        var thisTime = new Date();
        console.log("<<< USER joined at '" + thisTime); 
        
        // Je peux faire un console log côté serveur pour faire des actions quand un utilisateur se connecte. 
        client.on("disconnect", function() {
            thisTime = new Date();
            console.log("<<< USER left at '" + thisTime);  
        }); // on disctonnect end
        
        // Ici, j'ai choisi "POSTED" arbitrairement. En gros, je vais écouter si un client envoie l'évènement "POSTED" au serveur. 
        client.on("POSTED", function(msg) { 
            // Ce listener s'active lorsque le serveur reçoit un message (le paramètre msg) de la part d'un visiteur. 
            var thisTime = new Date();
            console.log("<<< USER told something at '" + thisTime + " [" + msg + "]"); 
            // À ce moment, le serveur va envoyer une requête qui a pour but d'afficher le message (msg) chez tout le monde. 
            io.emit("REFRESH", msg);
        }); // listener end
    }); // on connection end
    
    var viewPath = __dirname + "/view/"; // Je créé une variable pour pas devoir réécrire tout le chemin/de/mes/fichiers. 
    /*
        Ici je vais travailler avec mon objet "server" que j'ai défini plus haut. 
        ---
        Chaque .get va fonctionner, en quelque-sorte, comme un switch() avec des case. 
    */
    app.get("/:pageRequest", function(req, res) { // Premier niveau
        // Le serveur va écouter quelle page le visiteur demande (je suis obligé si je veux que mon serveur renvoie les fichiers css, html, etc... correctement)
        var targetFile = viewPath + req.params.pageRequest; // Je vais récupérer le paramètre ":pageRequest" pour m'en servir plus bas
        if (fs.existsSync(targetFile)) { // Ici, je vais vérifier avec le module "fs" si le fichier demandé par l'utilisateur existe
            console.log(">>> SEND '" + targetFile + "' TO client");
            // Et donc je sers ce fichier en faisant sendFile()
            res.sendFile(targetFile); 
        }
    })
    // Je fais un get idem pour les sous dissiers
    .get("/:dirRequest/:pageRequest", function(req, res) { // pour pouvoir trouver le css et les js
        var targetFile = __dirname + "/view/" + req.params.dirRequest + "/" + req.params.pageRequest;
        if (fs.existsSync(targetFile)) {
            res.sendFile(targetFile);
        } // condition file exist
    })
    // Si aucun "paramètre" n'est demandé, on donne simplement la page chat.html
    .use(function(req, res, next){ // index
        res.sendFile(__dirname + "/view/chat.html");
    }); // index
    server.listen(3000); // Le serveur listen le port 3000
} // chatServer() function
chatServer(); // exec function
/* Pour BeCode par Axel Fiolle */