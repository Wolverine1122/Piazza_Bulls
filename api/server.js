import express from 'express';
import cors from 'cors';
import pool from './db.js';
const PORT = 5000 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', async (req, res) => {
    try {
        const { role, username, email, password } = req.body;
        const newUser = await pool.query(
            'INSERT INTO users (role, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [role, username, email, password]
        );


        console.log(newUser);
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
// return true if the user exists in the database with the email
app.get('/checkUserExists', async (req, res) => {
    console.log('userExists called ');
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ error: 'Email parameter is required' });
            return;
        }
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        const userExists = user.rows.length > 0;
        res.json(userExists);
        console.log(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
}
);

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );
        if (user.rows.length === 0) {
            res.status(400).json({ error: 'Invalid email or password' });
            return;
        }

    } catch (err) {
        console.error(err.message);
    }
});

// Get list of classes for a specific user
app.get('/classes', async (req, res) => {
    try {
        const { username} = req.body;
        if (!username) {
            res.status(400).json({ error: 'Username parameter is required' });
            return;
        }
        const classes = await pool.query(
            'SELECT * FROM classes WHERE username = $1',
            [username]
        );
        res.json(classes.rows);
    } catch (err) {
        console.error(err.message);
    }
});







app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});