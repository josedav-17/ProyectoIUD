const app = require('./app');
const { mongoConn } = require('./Database/Configuration')
const dotenv = require('dotenv').config()


app.set('port', process.env.PORT || 3000)

const conn = mongoConn()

app.listen(app.get('port'), () => {
    console.log(`Servidor arrancó por puerto ${app.get('port')}`);
});


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

