const db = require("../connection/connection");
const moment = require("moment");

const today = moment().format("YYYY-MM-DD");
const rightNow = moment().format("YYYY-MM-DD HH:mm:ss");
module.exports = {
    getUserByID: function (req, res) {
        const userID = req.params.id;
        db.query("SELECT * FROM oxn711nfcpjgwcr2.users WHERE id = " + userID + ";",
            function (err, results) {
                if (err) {
                    return res.send(err);
                } else {
                    return res.json({
                        results
                    });
                }
            })
    },
    createUser: function (req, res) {
        const user = req.body[0];
        const queryInsert = "INSERT INTO oxn711nfcpjgwcr2.users (first_name, last_name, user_password, email, phone, joined_date) VALUES (";
        const queryValues = "'" + user.first_name + "'," + "'" + user.last_name + "'," + "'" + user.user_password + "'," + "'" + user.email + "'," + "" + user.phone + "," + "'" + today + "');";
        db.query(queryInsert + queryValues,
            function (err, results) {
                if (err) {
                    return res.send(err);
                } else {
                    return res.json({
                        results
                    });
                }
            })
    }
}