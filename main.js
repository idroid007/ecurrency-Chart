let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

let request = require("request");

app.listen(3000);

app.get("/",function(req,resp){
    resp.sendFile(__dirname+"/index.html");

})
app.post("/",function(req,resp){
   // resp.sendFile(__dirname+"/index.html");
    request("https://apiv2.bitcoinaverage.com/indices/global/ticker/"+req.body.crypto+req.body.currency,(error,response,body)=>{
        resp.send(response)
    })
})

app.post("/conversion",function(req,resp){
   // resp.sendFile(__dirname+"/index.html");

   let options = {
       url:"https://apiv2.bitcoinaverage.com/convert/global",
       method:"GET", // default
       qs:{
           amount:req.body.amount,
           from:req.body.from,
           to:req.body.to
       }
   }

    request(options,(error,response,body)=>{
        resp.send(body)
    })
})

