const express = require('express');
const bodyParser = require('body-parser');
const ejs  = require('ejs');
const _ = require('lodash');

const app = express();

const hometext = "Hi my name is vikas kumar rana and this is my diary";
const abouttext = "I am ungrad student at Army institute of technology";
const contacttext = "call me @8859992737";
const posts=[{title:"Home",text:hometext}];

app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.render(__dirname+"/views/home.ejs",{
        heading:"HOME",
        content:hometext,
        posts:posts
    });
});
app.get("/about",function(req,res){
    res.render(__dirname+"/views/about.ejs",{
        heading:"About",
        content:abouttext
    });
});
app.get("/contact",function(req,res){
    res.render(__dirname+"/views/contact.ejs",{
        heading:"Contact",
        content:contacttext
    });
});
app.get("/compose",function(req,res){
    res.render(__dirname+"/views/compose.ejs",{
        heading:"Compose",
    });
});

app.get("/posts/:post_title",function(req,res){

    var get_title = _.lowerCase(req.params.post_title);
 
    posts.forEach(function(post)
    {
        let title_in_array = _.lowerCase(post.title);
 
        if(title_in_array == get_title)
        {
            res.render(__dirname+"/views/post.ejs",{
                heading:post.title,
                content:post.text
            });
        }
       
    })
    
 });

app.post("/compose",function(req,res){
   
    const post = {
        title : req.body.newtext,
        text: req.body.widecontent
    }
    posts.push(post);

    res.redirect('/');
});

app.post("/",function(req,res){

    res.redirect("/compose");
});



app.listen(3000,function(){
    console.log("server running");
});

