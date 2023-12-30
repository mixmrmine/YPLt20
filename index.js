// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('pages/home', { pageTitle: 'Home' });
});
app.get('/matches', (req, res) => {
    res.render('pages/matches', { pageTitle: 'Matches Schedule' });
});
app.get('/about', (req, res) => {
    res.render('pages/about', { pageTitle: 'About' });
});
app.get('/error', (req, res) => {
    res.render('pages/error', { pageTitle: 'Error Page' });
});
app.get('/point-table', (req, res) => {
    res.render('pages/point-table', { pageTitle: 'Point Table' });
});
app.get('/teams', (req, res) => {
    res.render('pages/teams', { pageTitle: 'Teams' });
});
app.get('/venue', (req, res) => {
    res.render('pages/venue', { pageTitle: 'Venue' });
});

app.get('/balaji-star', (req, res) => {
    res.render('pages/balaji-star', { pageTitle: 'Balaji Stars Team' });
});
app.get('/bn-gavare', (req, res) => {
    res.render('pages/bn-gavare', { pageTitle: 'bn-gavare Team' });
});
app.get('/laxmiraman', (req, res) => {
    res.render('pages/laxmiraman', { pageTitle: ' Laxmiraman Warriors Team' });
});
app.get('/mauli', (req, res) => {
    res.render('pages/mauli', { pageTitle: 'Mauli Yodhas Team' });
});
app.get('/onenonly', (req, res) => {
    res.render('pages/onenonly', { pageTitle: 'One N Only Team' });
});
app.get('/rajmudra', (req, res) => {
    res.render('pages/rajmudra', { pageTitle: 'Rajmudra Royals Team' });
});
app.get('/rokdeshwar', (req, res) => {
    res.render('pages/rokdeshwar', { pageTitle: 'Rokdeshwar Warriors Team' });
});
app.get('/sadgurusai', (req, res) => {
    res.render('pages/sadgurusai', { pageTitle: 'Sadgurursai Spartans Team' });
});
app.get('/vaishnavi', (req, res) => {
    res.render('pages/vaishnavi', { pageTitle: 'Kaile Challengers Team' });
});
app.get('/wada', (req, res) => {
    res.render('pages/wada', { pageTitle: 'Wada Warriors Team' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
