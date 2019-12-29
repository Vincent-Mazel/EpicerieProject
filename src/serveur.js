const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017";


MongoClient.connect(url, {useNewUrlParser : true}, (err, client) => {
    console.log("MongoDB connecté !");
    let db = client.db("SUPERVENTES"); 
 
    app.get('/', function (req, res) {
        console.log('/');
        res.send('Hello World!')
      })

    /* Liste des produits */
    app.get("/produits", (req, res) => {
        console.log("/produits");

        try {
            db.collection("produits").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
                console.log(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Infos sur les categories */
    app.get("/categories", (req, res) => {
        console.log("/categories");

        try {
            db.collection("categories").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /categories : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Liste des categories (leur nom) */
    app.get("/categorieNames", (req, res) => {
        console.log("/categorieNames");

        try {
            db.collection("categories").find({}, 'catName').toArray((err, documents) => {
                res.end(JSON.stringify(documents));
                console.log(documents);
            });
        } catch (e) {
            console.log("Erreur sur /categorieNames : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Récupération des produits d'une catégorie en particulier */
    app.get("/produits/cat/:categorie", (req, res) => {
        console.log("/produits/cat/");

        let categorie = req.params.categorie;

        try {
            db.collection("produits").find({ categorie: categorie }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits/cat : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Récupération des produits d'une catégorie en particulier avec un min price */
    app.get("/produits/cat/:categorie/minPrice/:minPrice", (req, res) => {
        console.log("/produits/cat/minPrice");

        let categorie = req.params.categorie;
        let minPrice = parseInt(req.params.minPrice, 10);

        try {
            db.collection("produits").find({ categorie: categorie, price: { $gte: minPrice } }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits/cat/minPrice : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Récupération des produits d'une catégorie en particulier avec un max price */
    app.get("/produits/cat/:categorie/maxPrice/:maxPrice", (req, res) => {
        console.log("/produits/cat/maxPrice");

        let categorie = req.params.categorie;
        let maxPrice = parseInt(req.params.maxPrice, 10);

        try {
            db.collection("produits").find({ categorie: categorie, price: { $lte: maxPrice } }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits/cat/maxPrice : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Récupération des produits d'une catégorie en particulier en précisant les prix min et max */
    app.get("/produits/cat/:categorie/minPrice/:minPrice/maxPrice/:maxPrice", (req, res) => {
        console.log("/produits/cat/minPrice/maxPrice");
        
        let categorie = req.params.categorie;
        let minPrice = parseInt(req.params.minPrice, 10);
        let maxPrice = parseInt(req.params.maxPrice, 10);
        console.log(categorie);
        try {
            db.collection("produits").find({ categorie: categorie, price: { $gte: minPrice,  $lte: maxPrice } }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits/cat/minPrice/maxPrice : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Récupération des produits entre les prix min et max */
    app.get("/produits/minPrice/:minPrice/maxPrice/:maxPrice", (req, res) => {
        console.log("/produits/minPrice/maxPrice");

        let minPrice = parseInt(req.params.minPrice, 10);
        let maxPrice = parseInt(req.params.maxPrice, 10);

        try {
            db.collection("produits").find({ price: { $gte: minPrice,  $lte: maxPrice } }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits/minPrice/maxPrice : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Récupération des produits ayant un prix supérieur au prix min */
    app.get("/produits/minPrice/:minPrice", (req, res) => {
        console.log("/produits/minPrice");

        let minPrice = parseInt(req.params.minPrice, 10);

        try {
            db.collection("produits").find({ price: { $gte: minPrice } }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits/minPrice : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Récupération des produits ayant un prix inférieur au prix max */
    app.get("/produits/maxPrice/:maxPrice", (req, res) => {
        console.log("/produits/maxPrice");

        let maxPrice = parseInt(req.params.maxPrice, 10);

        try {
            db.collection("produits").find({ price: { $lte: maxPrice } }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits/maxPrice : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Liste des catégories de produits */
    app.get("/categories", (req, res) => {
        console.log("/categories");
        let categories = [];

        try {
            db.collection("produits").find().toArray((err, documents) => {
                for (let doc of documents)
                    if (!categories.includes(doc.type)) categories.push(doc.type);

                console.log("Renvoi de " + JSON.stringify(categories));
                res.end(JSON.stringify(categories));
            });
        } catch (e) {
            console.log("Erreur sur /categories : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Connexion */
    app.post("/membre/connexion", (req, res) => {
        console.log("/membre/connexion");

        try {
            db.collection("membres")
              .find(req.body)
              .toArray((err, documents) => {
                    if (documents.length == 1)
                        res.end(JSON.stringify({ "resultat" : 1, "message" : "Authentification réussie" }));
                    else res.end(JSON.stringify({ "resultat" : 0, "message" : "Email et/ou mot de passe incorrect" }));
              });
        } catch(e) {
            res.end(JSON.stringify({ "resultat" : 0, "message" : e}));
        }      
    });
});

app.listen(8080, function () {
    console.log("express has started on port 8080 !");
});

