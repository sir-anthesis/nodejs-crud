const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
    host : "localhost",
    database : "db_dummy",
    user : "root",
    password : ""
});

// Connect db
db.connect((err) => {
    if (err) throw err;
    console.log("database connected");

        // Show data
        app.get("/", (req, res) => {
            const sql_shw = "SELECT * FROM tb_dummy";
            db.query(sql_shw, (err, result) => {
                const datas = JSON.parse(JSON.stringify(result));
                res.render("index", { datas: datas, title: "CRUD NODE JS"});
            });
        });

        let action = "";

        app.post("/", (req, res) => {
        action = req.body.action;
            // Insert Data
            if (action == "insert") {
                    const sql_ins = `INSERT INTO tb_dummy (name, class, phone) VALUES ('${req.body.name}', '${req.body.class}', '${req.body.phone}');` 
                    db.query(sql_ins, (err, result) => {
                    if (err) throw err;
                    res.redirect("/");
                    });
            };

            // Delete Data
            if (action == "delete") {
                    const sql_del = `DELETE FROM tb_dummy WHERE name = '${req.body.name}';`
                    db.query(sql_del, (err, result) => {
                    if (err) throw err;
                    res.redirect("/");
                    });
            };

            // Update Data
            if (action == "update") {
                    const sql_upd = `UPDATE tb_dummy SET name = '${req.body.name}', class = '${req.body.class}', phone = '${req.body.phone}' WHERE id = '${req.body.id}';`
                    db.query(sql_upd, (err, result) => {
                    if (err) throw err;
                    res.redirect("/");
                    });
            };

            // Select Data
            if (action == "select") {
                    const sql_slc = `SELECT * FROM tb_dummy WHERE id = '${req.body.id}';`
                    db.query(sql_slc, (err, result) => {
                    if (err) throw err;
                    const datas = JSON.parse(JSON.stringify(result));
                    res.render("index", { datas: datas, title: "CRUD NODE JS"});
                    });
            };

            // Select Data
            if (action == "refresh") {
                    const sql_slc = `SELECT * FROM tb_dummy;`
                    db.query(sql_slc, (err, result) => {
                    if (err) throw err;
                    const datas = JSON.parse(JSON.stringify(result));
                    res.render("index", { datas: datas, title: "CRUD NODE JS"});
                    });
            };

            
        });
});

app.listen(8000, () => {
    console.log("server ready");
});