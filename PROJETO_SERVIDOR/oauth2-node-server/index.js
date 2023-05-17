const express = require("express");
const axios = require("axios");
var cors = require("cors");
const CLIENT_ID = "01e9f781dbe005efa44a";
const CLIENT_SECRET = "0ae71ea4e375a059b13ecb06c82a60bead7d7995no";
const GITHUB_URL = "https://github.com/login/oauth/access_token";
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.get("/oauth/redirect", (req, res) => {
    axios({
        method: "POST",
        url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
        headers: {
            Accept: "application/json",
        },
    }).then((response) => {
        res.redirect(
            `http://localhost:3000?access_token=${response.data.access_token}`
        );
    });
});
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});