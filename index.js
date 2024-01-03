// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const pool = mysql.createPool({
  host: process.env.Dbhost,
  user: process.env.Dbuser,
  password: process.env.DbPass,
  database: process.env.DbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Define a list of valid team codes
const validTeamCodes = ['244805', '984370', '196523', '205689','584017','840723','106083','550912','270385','640127',/* add more team codes as needed */];

app.post('/submit-playerform', upload.single('playerPhoto'), (req, res) => {
    const formData = req.body;
    const playerPhoto = req.file;
  
    // Check if the teamCode is in the list of valid team codes
    if (!validTeamCodes.includes(formData.teamCode)) {
      return res.status(400).json({ success: false, message: 'Invalid Team Code, Please Contact The Management For Your Code' });
    }
  
    // Check if the playerPhoto size is greater than 1MB
    if (playerPhoto && playerPhoto.size > 1024 * 1024) {
      return res.status(400).json({ success: false, message: 'Player Image size should be less than 1MB.' });
    }
  
    // If playerPhoto is present, convert it to a buffer before saving it to the database
    const photoBuffer = playerPhoto ? playerPhoto.buffer : null;
  
    // Create an object with the necessary fields for insertion
    const dataToInsert = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      teamCode: formData.teamCode,
      playerType: formData.playerType,
      handSide: formData.handSide,
      instagramLink: formData.instagramLink,
      playerPhoto: photoBuffer,
    };
  
    // Use pool.query for executing queries with connection pooling
    pool.query('INSERT INTO players SET ?', dataToInsert, (err, results) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).json({ success: false, message: 'Error submitting the form' });
      } else {
        console.log('Data inserted into the database');
        // Clear form fields on successful submission
        res.json({ success: true, message: 'Form submitted successfully' });
      }
    });
  });
  

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
app.get('/player_registration', (req, res) => {
    res.render('pages/player_registration', { pageTitle: 'Player Registration' });
});


// Teams pages routes

app.get('/balaji-star', (req, res) => {
    const teamCode = 244805;

    const query = 'SELECT * FROM players WHERE teamCode = ?';
    pool.query(query, [teamCode], (err, results) => {
        if (err) {
            console.error('Error fetching players from the database:', err);
            res.render('pages/error', { pageTitle: 'Error Page', errorMessage: 'Error fetching players' });
        } else {
        
            console.log(results);
            res.render('pages/balaji-star', { pageTitle: 'Balaji Stars Team', teamPlayers: results});
        }
    });    
});
app.get('/bn-gavare', (req, res) => {
    const teamCode = 984370;

    const query = 'SELECT * FROM players WHERE teamCode = ?';
    pool.query(query, [teamCode], (err, results) => {
        if (err) {
            console.error('Error fetching players from the database:', err);
            res.render('pages/error', { pageTitle: 'Error Page', errorMessage: 'Error fetching players' });
        } else {
        
            console.log(results);
            res.render('pages/bn-gavare', { pageTitle: 'B N Reddy Royals Team', teamPlayers: results});
        }
    });   
});
app.get('/laxmiraman', (req, res) => {
    const teamCode = 196523;

    const query = 'SELECT * FROM players WHERE teamCode = ?';
    pool.query(query, [teamCode], (err, results) => {
        if (err) {
            console.error('Error fetching players from the database:', err);
            res.render('pages/error', { pageTitle: 'Error Page', errorMessage: 'Error fetching players' });
        } else {
        
            console.log(results);
            res.render('pages/laxmiraman', { pageTitle: 'Laxmiraman Strikers Team', teamPlayers: results});
        }
    });
});
app.get('/mauli', (req, res) => {
    const teamCode = 205689;

    const query = 'SELECT * FROM players WHERE teamCode = ?';
    pool.query(query, [teamCode], (err, results) => {
        if (err) {
            console.error('Error fetching players from the database:', err);
            res.render('pages/error', { pageTitle: 'Error Page', errorMessage: 'Error fetching players' });
        } else {
        
            console.log(results);
            res.render('pages/mauli', { pageTitle: 'Mauli Yoddhas Team', teamPlayers: results});
        }
    });    
});
app.get('/onenonly', (req, res) => {
    const teamCode = 584017;

    const query = 'SELECT * FROM players WHERE teamCode = ?';
    pool.query(query, [teamCode], (err, results) => {
        if (err) {
            console.error('Error fetching players from the database:', err);
            res.render('pages/error', { pageTitle: 'Error Page', errorMessage: 'Error fetching players' });
        } else {
        
            console.log(results);
            res.render('pages/onenonly', { pageTitle: 'OneNOnly Champions Team', teamPlayers: results});
        }
    });    
});
app.get('/rajmudra', (req, res) => {
    const teamCode = 840723;

    const query = 'SELECT * FROM players WHERE teamCode = ?';
    pool.query(query, [teamCode], (err, results) => {
        if (err) {
            console.error('Error fetching players from the database:', err);
            res.render('pages/error', { pageTitle: 'Error Page', errorMessage: 'Error fetching players' });
        } else {
        
            console.log(results);
            res.render('pages/rajmudra', { pageTitle: 'Rajmudra Royals Team', teamPlayers: results});
        }
    });    
});
app.get('/rokdeshwar', (req, res) => {
    const teamCode = 106083;

    const query = 'SELECT * FROM players WHERE teamCode = ?';
    pool.query(query, [teamCode], (err, results) => {
        if (err) {
            console.error('Error fetching players from the database:', err);
            res.render('pages/error', { pageTitle: 'Error Page', errorMessage: 'Error fetching players' });
        } else {
        
            console.log(results);
            res.render('pages/rokdeshwar', { pageTitle: 'Rokdeshwar Legends Team', teamPlayers: results});
        }
    });
});
app.get('/sadgurusai', (req, res) => {
    const teamCode = 550912;

    const query = 'SELECT * FROM players WHERE teamCode = ?';
    pool.query(query, [teamCode], (err, results) => {
        if (err) {
            console.error('Error fetching players from the database:', err);
            res.render('pages/error', { pageTitle: 'Error Page', errorMessage: 'Error fetching players' });
        } else {
        
            console.log(results);
            res.render('pages/sadgurusai', { pageTitle: 'Sadgurusai spartans Team', teamPlayers: results});
        }
    });   
});
app.get('/vaishnawi', (req, res) => {
    const teamCode = 270385;

    const query = 'SELECT * FROM players WHERE teamCode = ?';
    pool.query(query, [teamCode], (err, results) => {
        if (err) {
            console.error('Error fetching players from the database:', err);
            res.render('pages/error', { pageTitle: 'Error Page', errorMessage: 'Error fetching players' });
        } else {
        
            console.log(results);
            res.render('pages/vaishnavi', { pageTitle: 'Kaile Challengers Team', teamPlayers: results});
        }
    });   

});
app.get('/wada', (req, res) => {
    const teamCode = 640127;

    const query = 'SELECT * FROM players WHERE teamCode = ?';
    pool.query(query, [teamCode], (err, results) => {
        if (err) {
            console.error('Error fetching players from the database:', err);
            res.render('pages/error', { pageTitle: 'Error Page', errorMessage: 'Error fetching players' });
        } else {
        
            console.log(results);
            res.render('pages/wada', { pageTitle: 'Wada Warriors Team', teamPlayers: results});
        }
    });
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
