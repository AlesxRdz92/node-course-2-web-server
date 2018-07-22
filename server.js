const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    let log = `${new Date().toString()}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err) => {
        if(err)
            console.log(err);
    });
    next();
});
app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    /*res.send({
        name: 'Alejandro',
        lastName: 'Góngora',
        likes: [
            'Cities',
            'Gym',
            'Nutrition'
        ]
    });*/
    res.render('home.hbs', {
        pageTittle: 'Home Page',
        welcomeMessage: 'Welcome to my new website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTittle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTittle: 'Projects'
    });
});

app.listen(port, () => {
    console.log('The server is up in the port 3000');
});