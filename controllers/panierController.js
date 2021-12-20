let Panier = require('../models/panierModel.js');

let panierList = [];

var mysql = require("mysql");
const res = require('express/lib/response');
const { redirect } = require('express/lib/response');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'mvcdb'
});
connection.connect(function(error) {if (error) console.log(error);});

exports.formationList = function(request, response){
    connection.query("select * from formation;", function(error, result) {
        if (error) console(error);
        else{
            response.render('catalogue.ejs', {todot: result});
        }
    });
}

exports.Pseudo = function(request, response){
    response.render('user.ejs');
}

exports.Post = function(request, response){
    request.session.user = request.body.champ;
    response.redirect('/catalogue');
}

exports.Ajout = function(request, response){
    connection.query("select * from formation;", function(error, result) {
        if (error) console(error);
        else{
            let a = result[request.params.id - 1];
            panierList.push(new Panier(request.params.id, a.Nom, a.Prix, a.Debut, a.Fin));
            response.redirect('/');
        }
    });
}

exports.Panier = function(request, response){
    console.log(panierList);
    response.render('panier.ejs', {todot: panierList});
}

exports.bd = function(request, response){
    let pseudo = {"pseudo":request.session.user};
    connection.query("INSERT INTO inscription SET ?", pseudo, function(err, result) {
        if (err) console.log(err);
    })

    let idformation = {"idformation":2};
    connection.query("INSERT INTO inscription SET ?", idformation, function(err, result) {
        if (err) console.log(err);
    })
}

exports.Remove = function(request, response){
    let d = request.params.d;
    panierList.splice(d,1);
    response.redirect('/');
}