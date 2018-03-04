// 

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(express.static('./public/zadanie01/'));

app.get('/dividor/check', (req, res) => {
    res.send('Something went wrong. Did you set correct numbers?<br><a href="/">Go back to home page!</a>');
});

app.post('/dividor/check', (req, res) => {
    const {numA, numB} = req.body;

    let stringToPrint = 'You\'ve set numbers<br>A = ' + numA + '<br>B = ' + numB + '<br><br>'

    if(numA%numB == 0) {
        stringToPrint += ('Number B is divisor of number A.<br>A / B = ' + (numA / numB));
    } else {
        stringToPrint += ('Number B is not divisor of number A.<br>A / B = ' + (numA / numB));
    }

    stringToPrint += '<br><br><br><a href="/">Go back to home page!</a>';

    res.send(stringToPrint);
});


app.listen(3000, () => {
    console.log('Port:3000');
});