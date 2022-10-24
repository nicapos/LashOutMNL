const db = require("../database/models/db");
const Products = require("../database/models/Products");
const Appointments = require("../database/models/Appointments");

const controller = {
    getHomePage: function (req,res){
        res.render ('index');

        var TempProduct = {
            Name: "Lash Lift",
            Category: "Lashes",
            Description: "The natural lash is lifted from the roots semi-permanently. Lasts 1 to 3 months.",
            Price: 550
        }
        var TempAppointment = {
            refNum: 100021,
            ClientName: "Joe Mama",
            ClientInfo: "Covid Negative",
            PaymentStatus: false
        }
        db.insertOne(Appointments, TempAppointment, function(){

        });
        db.insertOne(Products, TempProduct, (err)=> {
            res.render ('index');
        });
    }
}

module.exports = controller;