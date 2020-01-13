const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
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

    /* Check si l'email existe déjà dans la base de données */
    app.post("/membre/checkEmail", (req, res) => {
        console.log("membre/checkEmail/");
        console.log(req.body.email);

        try {
            db.collection("membres")
              .find(req.body)
              .toArray((err, documents) => {
                    if (documents.length == 1)
                        res.end(JSON.stringify({ "resultat" : 1 }));
                    else res.end(JSON.stringify({ "resultat" : 0 }));
              });
        } catch(e) {
            res.end(JSON.stringify({ "resultat" : 0, "message" : e}));
        }      
    });

    /* Création d'un compte */
    app.post("/membre/creationCompte", (req, res) => {
        console.log("membre/creationCompte/");

        try {
            db.collection("membres").insertOne(req.body, function(err, res) {
                if (err) throw err;
                console.log("L'utilisateur " + req.body.prenom + " " + req.body.nom + " a été ajouté à la base de données !");

                let newPanier = {
                    "email": req.body.email,
                    "totalPrice": 0,
                    "products": []
                };

                db.collection("panier").insertOne(newPanier, function(err, res) {
                    if (err) throw err;
                });
            });

            res.end(JSON.stringify({ "resultat": 1 }));
        } catch(e) {
            res.end(JSON.stringify({ "resultat" : 0, "message" : e}));
        }      
    });

    /* Récupération du panier d'un utilisateur */
    app.post("/panier", (req, res) => {
        console.log("/panier");

        try {
            db.collection("panier")
            .find(req.body)
            .toArray((err, documents) => {
                    res.end(JSON.stringify({ "panier": documents }));
            });
        } catch(e) {
            res.end(JSON.stringify({ "resultat" : 0, "message" : e}));
        }      
    });

    /* Ajout d'un ou plusieurs produits au panier d'un utilisateur */
    app.post("/panier/add", (req, res) => {
        console.log("/panier/add");

        let email = { "email": req.body.email };

        try {
            db.collection("panier")
            .find(email)
            .toArray((err, documents) => {
                let bool = false;

                for (let i = 0; i < documents[0]["products"].length; i++) {
                    if (documents[0]["products"][i].productName == req.body.productName) {
                        documents[0]["products"][i].quantite += req.body.nbToAdd;
                        documents[0]["totalPrice"] += documents[0]["products"][i].price * req.body.nbToAdd;

                        documents[0]["totalPrice"] = Math.round(documents[0]["totalPrice"] * 100)/100;

                        bool = true;
                        finalIndex = i;
                        break;
                    }
                }

                if (!bool) {
                    let products = documents[0]["products"];
                    let newProduct = {
                        "productName": req.body.productName,
                        "price": req.body.productDatas.price,
                        "categorie": req.body.productDatas.categorie,
                        "imgSrc": req.body.productDatas.imgSrc,
                        "quantite": req.body.nbToAdd
                    };
                    let totalPrice =  documents[0]["totalPrice"] + req.body.productDatas.price * req.body.nbToAdd;
                    totalPrice = Math.round(totalPrice * 100)/100;

                    products.push(newProduct);

                    db.collection("panier").update( email, { $set: {
                        totalPrice: totalPrice,
                        products: products
                    }});
                }
                else {
                    db.collection("panier").update( email, { $set: {
                        totalPrice: documents[0]["totalPrice"],
                        products: documents[0]["products"]
                    }});
                }

                res.end(JSON.stringify({ "resultat": 1 }));
            });
        } catch(e) {
            res.end(JSON.stringify({ "resultat" : 0, "message" : e}));
        }      
    });

    /* Suppresion d'une unité d'un produit au panier d'un utilisateur */
    app.post("/panier/deleteOne", (req, res) => {
        console.log("/panier/deleteOne");

        let email = { "email": req.body.email };

        try {
            db.collection("panier")
            .find(email)
            .toArray((err, documents) => {
                let haveToDelete = false;
                
                for (let i = 0; i < documents[0]["products"].length; i++) {
                    if (documents[0]["products"][i].productName == req.body.productName) {
                        documents[0]["products"][i].quantite -= 1;

                        documents[0]["totalPrice"] -= documents[0]["products"][i].price;
                        documents[0]["totalPrice"] = Math.round(documents[0]["totalPrice"] * 100)/100;

                        if (documents[0]["products"][i].quantite == 0)
                            documents[0]["products"].splice(i, 1);
                        
                        break;
                    }
                }

                db.collection("panier").update( email, { $set: {
                    totalPrice: documents[0]["totalPrice"],
                    products: documents[0]["products"]
                }});

                res.end(JSON.stringify({ "resultat": 1 }));
            });
        } catch(e) {
            res.end(JSON.stringify({ "resultat" : 0, "message" : e}));
        }      
    });

    /* Suppresion du panier d'un utilisateur */
    app.post("/panier/deletePanier", (req, res) => {
        console.log("/panier/deletePanier");

        try {
            db.collection("panier")
            .find(req.body)
            .toArray((err, documents) => {
                db.collection("panier").update( req.body, { $set: {
                    totalPrice: 0.0,
                    products: []
                }});
            });

            res.end(JSON.stringify({ "resultat": 1 }));
        } catch(e) {
            res.end(JSON.stringify({ "resultat" : 0, "message" : e}));
        }      
    });
});

app.listen(8080, function () {
    console.log("express has started on port 8080 !");
});

