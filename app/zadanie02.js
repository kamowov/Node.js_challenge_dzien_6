const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(express.static('./public/zadanie02/'));

app.post('/cookie/set', (req, res) => {
    const {firstNamePost} = req.body;
    
    res.cookie('firstNameCookie', firstNamePost, {
        maxAge: 2592000000,
    });
    res.send('Zapisano imię ' + firstNamePost);
});

app.get('/cookie/show', (req, res) => {
    const firstName = req.cookies.firstNameCookie;
    if(firstName === undefined) {
        res.redirect('/cookie/check');
    } else {
        res.send('Zapisane imię to: ' + firstName);
    }
});

app.get('/cookie/check', (req, res) => {
    const firstName = req.cookies.firstNameCookie;
    if(firstName === undefined) {
        res.send('Imię nie zostało zapisane.');
    } else {
        res.send('Imię jest zapisane.');
    }
});

app.get('/cookie/remove', (req, res) => {
    res.clearCookie('firstNameCookie');
    res.send('Imię usunięte.');
})



app.listen(3000, () => {
    console.log('port:3000');
});
