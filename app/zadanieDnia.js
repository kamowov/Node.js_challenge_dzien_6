// Zadanie dnia: Forum

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
//const path = require('path');

const htmlFiles = __dirname + '/public/zadanieDnia';

app.use(express.static('./public/zadanieDnia'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

let commentsCookieValue;

app.get('/', (req, res) => {
    
});

app.get('/add', (req, res) => {
    res.sendFile(htmlFiles + '/add.html');
});

app.post('/comments', (req, res) => {
    const {textarea} = req.body;
    
    res.cookie('comment', textarea, {
        maxAge: 30000,
    });

    commentsCookieValue = addComment(commentsCookieValue, textarea);
    
    res.setHeader('Content-Type', 'text/html');

    console.log(commentsCookieValue);
    //res.send(commentsCookieValue);

    printComments(commentsCookieValue, res);

    res.write('<p><br><br><a href="/add">Add another comment</a>');
    res.write('<br><a href="/">Back to home page</a><p>')

    res.end();
});

app.get('/comments', (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    console.log(commentsCookieValue);
    //res.send(commentsCookieValue);

    if(!commentsCookieValue) {
        res.write('There is no comments yet!');
    } else {
        printComments(commentsCookieValue, res);
    }

    res.write('<p><br><br><a href="/add">Add another comment</a>');
    res.write('<br><a href="/">Back to home page</a><p>')

    res.end();
});

function addComment(commentsCookieValue, newComment) {
    const comments = readComments(commentsCookieValue);
    comments.push(newComment);
    return JSON.stringify(comments);
}

function readComments(commentsCookieValue) {
    return commentsCookieValue ? JSON.parse(commentsCookieValue) : [];
}

function printComments(commentsCookieValue, res) {
    for(let i = 0, j = 1; i < commentsCookieValue.length; i++) {        
        if(commentsCookieValue[i] + commentsCookieValue[i+1] == '["') {
            res.write('Comment #' + j++ + '<br>');
            i++;
        } else if (commentsCookieValue[i] + commentsCookieValue[i+1] + commentsCookieValue[i+2] == '","') {
            res.write('<br><br>' + 'Comment #' + j++ + '<br>');
            i += 2;
        } else if (commentsCookieValue[i] + commentsCookieValue[i+1] == '"]') { i++; }
        else {
            res.write(commentsCookieValue[i]);
        }
    }
}

app.listen(3000, () => {
    console.log('port:3000');
});