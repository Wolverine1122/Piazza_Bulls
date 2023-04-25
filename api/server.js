import express from 'express';
import cors from 'cors';
import pool from './db.js';
const PORT = 5000 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());



app.post('/sign-up', async (req, res) => {
    console.log("sign up called")
    try {
        const { role, username, email, password } = req.body;
        var permissionid = 0;
        if (role.toLowerCase() === 'student')
            permissionid = 0;
        else if (role.toLowerCase() == 'teacher' || 'professor')
            permissionid = 1;
        else if (role.toLowerCase() == 'ta' || 'teaching assistant')
            permissionid = 2;


        const newUser = await pool.query(
            'INSERT INTO users (role, username, email, password,permissionid) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [role, username, email, password, permissionid]
        );

        console.log(newUser);
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// gets the role of a user
app.get('/getrole/:username', async (req, res) => {
    console.log("getting role");
    const username = req.params.username;
    const role = await pool.query(
        'SELECT role FROM users WHERE username = $1',
        [username]
    );
    console.log(role.rows[0].role);
    console.log(username);
    res.json({ role: role.rows[0].role, });

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
    } catch (err) {
        console.error(err.message);
    }
}
);

app.post('/login', async (req, res) => {
    console.log("login called")
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ error: 'username and password are required' });
            return;
        }
        const user = await pool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]

        );

        if (user.rows.length === 0) {
            console.log("Invalid username or password");
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        else {
            res.status(200).send("Successful Login");
        }

    } catch (err) {
        console.error(err.message);
    }
});

// Get list of classes for a specific user
app.get('/classes/:username', async (req, res) => {
    console.log("classes called");
    try {
        //  const { classid, classtitle, description, qtyoftopics, username} = req.body;
        const username = req.params.username;
        if (!username) {
            res.status(400).json({ error: 'Username parameter is required' });
            return;
        }
        const classes = await pool.query(
            'SELECT * FROM classes NATURAL JOIN memberof WHERE memberof.username=$1',
            [username]
        );
        res.json(classes.rows);
        console.log(classes.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a list of posts for a course
app.get("/classes/:classid/posts", async (req, res) => {

    console.log("posts called");
    try {
        const classid = req.params.classid;
        if (!classid) {
            res.status(400).json({ error: 'Classid parameter is required' });
            return;
        }
        const posts = await pool.query(
            'SELECT * FROM posts WHERE classid=$1',
            [classid]
        );
        res.json(posts.rows);
        console.log(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/classes/:username/addcourse', async (req, res) => {
    console.log("i am here");
    console.log("add course called");
    const username = req.params.username;
    const role = await pool.query(
        'SELECT role FROM users WHERE username = $1',
        [username]
    );
    console.log(role.rows[0].role);
    console.log(username);
    //res.json({role: role.rows[0].role,}); //this WORKED

    if (role.rows[0].role == 'Professor') {
        //console.log("i am a professor");
        const { classid, classtitle, description } = req.body;
        var qtyoftopics = 0;
        const newCourse = await pool.query('INSERT INTO classes (classid, classtitle, description, qtyoftopics) VALUES ($1, $2, $3, $4) RETURNING * ',
            [classid, classtitle, description, qtyoftopics]
        );
        const newMem = await pool.query('INSERT INTO MemberOf (username, classid) VALUES ($1, $2) RETURNING * ',
            [username, classid]
        );
        console.log(newCourse);
        console.log(newMem);
        res.json(newCourse.rows);

    }
    else if (role.rows[0].role == 'Student' || 'TA') {
        // console.log("I am a student/TA");
        const { classid } = req.body;
        const newMem = await pool.query('INSERT INTO MemberOf (username, classid) VALUES ($1, $2) RETURNING * ',
            [username, classid]
        );
        console.log(newMem);
        res.json(newMem.rows);
    }
    else {
        console.log("Not a valid role");
    }


});

// get list of topics for specific class
app.get('/classes/:classid/topics', async (req, res) => {
    console.log("topics called");
    try {
        const classid = req.params.classid;
        if (!classid) {
            res.status(400).json({ error: 'Classid parameter is required' });
            return;
        }
        const topics = await pool.query(
            'SELECT * FROM topics WHERE classid=$1',
            [classid]
        );
        res.json(topics.rows);
        console.log(topics.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get list of posts for specific topic
app.get('/classes/:classid/topics/:topicid/posts', async (req, res) => {
    console.log("posts called");
    try {
        const classid = req.params.classid;
        const topicid = req.params.topicid;
        if (!classid || !topicid) {
            res.status(400).json({ error: 'Classid and topicid parameters are required' });
            return;
        }
        const posts = await pool.query(
            'SELECT * FROM posts WHERE classid=$1 AND topicid=$2',
            [classid, topicid]
        );
        res.json(posts.rows);
        console.log(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});


// get all asnwers for a specific post
app.get('/classes/:classid/posts/:postid/answers', async (req, res) => {
    console.log("answers called");
    try {
        const classid = req.params.classid;
        const postid = req.params.postid;
        if (!classid || !postid) {
            res.status(400).json({ error: 'Classid and postid parameters are required' });
            return;
        }
        const answers = await pool.query(
            'SELECT * FROM answers WHERE ticketid=$2',
            [postid]);
        res.json(answers.rows);
        console.log(answers.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// upvote a post
app.post('/classes/:classid/posts/:postid/upvote', async (req, res) => {
    console.log("upvote called");
    try {
        const classid = req.params.classid;
        const postid = req.params.postid;
        if (!classid || !postid) {
            res.status(400).json({ error: 'Classid and postid parameters are required' });
            return;
        }
        const upvote = await pool.query(
            'UPDATE posts SET totalvote = totalvote + 1 WHERE ticketid = $1',
            [postid]);
        res.json(upvote.rows);
        console.log(upvote.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// downvote a post
app.post('/classes/:classid/posts/:postid/downvote', async (req, res) => {
    console.log("downvote called");
    try {
        const classid = req.params.classid;
        const postid = req.params.postid;
        if (!classid || !postid) {
            res.status(400).json({ error: 'Classid and postid parameters are required' });
            return;
        }
        const downvote = await pool.query(
            'UPDATE posts SET totalvote = totalvote - 1 WHERE ticketid = $1',
            [postid]);
        res.json(downvote.rows);
        console.log(downvote.rows);
    } catch (err) {
        console.error(err.message);
    }
});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});