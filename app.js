const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

const items = ["DSA","WEB","CT3"];
const workItem = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/",function(req,res){
    
    const day = date.getDate();

    res.render("list",{listTitle:day, newListItem : items});
});

app.post("/",function(req,res){
    const item = req.body.newItem

    if (req.body.list === "Work"){
        workItem.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});

//get req for work list page

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List",newListItem:workItem});
});

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItem.push(item);
    res.redirect("/work");
})

app.listen(3000,function(){
    console.log("Server started on port 3000");
});