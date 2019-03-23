var express  = require('express');
var app = express();
var http = require('http')
var path = require('path')
var server = http.createServer(app);
var io  = require('socket.io')(server);
var port = process.env.PORT || 3000;

io.on("connection", client=>{
    console.log("Client Connected "+client.id);
    client.emit("acknowlege",{message:"You are connected "})
    client.on("sendToServer",(chattername,msg)=>{
        console.log("Send to server "+msg)
        console.log(chattername + " says "+msg);
        client.broadcast.emit("msgToClient",chattername,msg);
        client.emit("msgToClient",'Me',msg)
    })
})
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"socket-client.html"))
})

server.listen(port,()=>{
    console.log("Server Started on port",port);
})