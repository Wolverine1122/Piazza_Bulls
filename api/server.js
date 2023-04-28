import express from 'express';
import cors from 'cors';
import pool from './db.js';
const PORT = 5000 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

const Roles = {
    Professor: 'professor',
    TA: 'ta',
    Student: 'student'
};

const Permissions = {
    Student: 0,
    Professor: 1,
    TA: 2

}
function getPermission(role) {
    role = role.toLowerCase();
    var permissionid = 0;
    if (role === Roles.Student)
        permissionid = Permissions.Student;
    else if (role === Roles.Professor)
        permissionid = Permissions.Professor;
    else if (role === Roles.TA)
        permissionid = Permissions.TA;
    return permissionid;
}

async function getRole(username) {

    const role = await pool.query(
        'SELECT role FROM users WHERE username = $1',
        [username]
    );
    if (role.rows.length === 0)

        return null;
    else {
        switch (role.rows[0].role.toString().toLowerCase()) {
            case Roles.Professor:
                return Roles.Professor;
            case Roles.TA:
                return Roles.TA;
            case Roles.Student:
                return Roles.Student;
            default:
                return null;

        }
    }
}


async function getClassID(classcode) {
    const classidReq = await pool.query(
        'SELECT classid FROM classes WHERE classcode = $1',
        [classcode]
    );

    if (classidReq.rowCount == 0)
        return null;
    const classid = classidReq.rows[0].classid;
    return classid;
}
// sign up a user
app.post('/sign-up', async (req, res) => {
    console.log("sign up called")
    try {
        const { role, username, email, password } = req.body;
        var permissionid = getPermission(role);

        if (!role || !username || !email || !password) {
            res.status(400).json({ error: 'role, username, email, and password are required' });
            return;
        }
        const newUser = await pool.query(
            'INSERT INTO users (role, username, email, password,permissionid) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [role, username, email, password, permissionid]
        );

        // console.log(newUser);
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// gets the role of a user
app.get('/getrole/:username', async (req, res) => {
    console.log("get role called")
    try {
        const username = req.params.username;
        if (!username) {
            res.status(400).json({ error: 'username is required' });
            return;
        }
        const role = await pool.query(
            'SELECT role FROM users WHERE username = $1',
            [username]
        );

        console.log(role);
        res.json(role.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});


// return true if the user exists in the database with the email
app.get('/checkUserExists/:email', async (req, res) => {
    console.log('userExists called ');
    const email = req.params.email;
    if (!email) {
        res.status(400).json({ error: 'Email parameter is required' });
        return;
    }
    console.log(email);
    try {
        const user = await pool.query(
            'SELECT  username FROM users WHERE email = $1',
            [email]
        );
        var userExists = false;
        // console.log(user);
        if (user.rowCount != 0) { userExists = true; }

        console.log("userExists: " + userExists);
        res.json(userExists);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
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
        res.status(500).json({ error: 'Server error' });
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
        // getting membercount per class
        // loop through each class to get the member count
        for (let i = 0; i < classes.rows.length; i++) {
            const classid = classes.rows[i].classid;
            const memberCount = await pool.query(
                'SELECT COUNT(Username) FROM MemberOf WHERE classID=$1',
                [classid]
            );
            classes.rows[i].memberCount = memberCount.rows[0].count;
        }

        res.json(classes.rows);
        console.log(classes.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a list of posts for a course
app.get("/classes/:classcode/posts", async (req, res) => {

    console.log("posts called");
    try {
        const classcode = req.params.classcode;
        if (!classcode) {
            res.status(400).json({ error: 'Classcode parameter is required' });
            return;

        }
        const classidReq = await pool.query(
            'SELECT classid FROM classes WHERE classcode = $1',
            [classcode]
        );
        const classid = classidReq.rows[0].classid;
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
    const { classcode } = req.body;

    if (!username) {
        res.status(400).json({ error: 'Username parameter is required' });
        return;
    }
    var roleQuery = await pool.query(
        'SELECT role FROM users WHERE username = $1',
        [username]
    );
    //    convert to  lowercase string
    const role = roleQuery.rows[0].role.toString().toLowerCase();
    console.log(role);

    if (role == Roles.Professor) {
        console.log("i am a professor");
        const { classcode, classtitle, description } = req.body;
        if (!classcode || !classtitle || !description) {
            res.status(400).json({ error: 'classid, classtitle, and description are required' });
            return;
        }
        var qtyoftopics = 0;
        const newCourse = await pool.query('INSERT INTO classes (classtitle, description, qtyoftopics, classcode) VALUES ($1, $2, $3, $4) RETURNING classid ',
            [classtitle, description, qtyoftopics, classcode]
        );
        const classid = newCourse.rows[0].classid;

        const newMem = await pool.query('INSERT INTO MemberOf (username, classid) VALUES ($1, $2) RETURNING * ',
            [username, classid]
        );
        console.log(newCourse);
        console.log(newMem);
        res.json(newCourse.rows);

    }
    else if (role === Roles.Student || Roles.TA) {
        console.log("I am a student/TA");

        if (!classcode) {
            res.status(400).json({ error: 'classcode is required' });
            return;
        }

        const classid = await getClassID(classcode);
        const newMem = await pool.query('INSERT INTO MemberOf (username, classid) VALUES ($1, $2) RETURNING * ',
            [username, classid]
        );
        console.log(newMem);
        res.json(newMem.rows);
    }
    else {
        console.log("Not a valid role");
        res.status(400).json({ error: 'Not a valid role' });
        return;

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
app.post('/classes/:classcode/posts/:postid/upvote', async (req, res) => {
    console.log("upvote called");
    try {
        const classcode = req.params.classcode;
        console.log(classcode);
        const classid = await getClassID(classcode);
        if (!classid) {
            res.status(400).json({ error: 'Invalid classcode' });
            return;
        }
        const postid = req.params.postid;
        if (!classid || !postid) {
            res.status(400).json({ error: 'Classid and postid parameters are required' });
            return;
        }
        const upvote = await pool.query(
            'UPDATE posts SET totalvote = totalvote + 1 WHERE postid = $1 RETURNING totalvote',
            [postid]);
        res.json(upvote.rows[0]);
        console.log(upvote.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// downvote a post
app.post('/classes/:classcode/posts/:postid/downvote', async (req, res) => {
    console.log("downvote called");
    try {
        const classcode = req.params.classcode;
        const classid = await getClassID(classcode);
        if (!classid) {
            res.status(400).json({ error: 'Invalid classcode' });
            return;
        }
        const postid = req.params.postid;


        if (!classid || !postid) {
            res.status(400).json({ error: 'Classid and postid parameters are required' });
            return;
        }
        const downvote = await pool.query(
            'UPDATE posts SET totalvote = totalvote - 1 WHERE postid = $1 RETURNING totalvote',
            [postid]);
        res.json(downvote.rows[0]);
        console.log(downvote.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// add a post
app.post('/classes/:classcode/posts', async (req, res) => {
    console.log("add post called");
    try {
        const classcode = req.params.classcode;
        const classid = await getClassID(classcode);
        if (!classid) {
            res.status(400).json({ error: 'Invalid classcode' });
            return;
        }
        const { topicid, username, title, description, postType } = req.body;

        if (!classid || !topicid || !username || !title || !description || !postType) {
            res.status(400).json({ error: 'Classid, topicid, username, title, description, and postType parameters are required' });
            return;
        }
        const insertQuery = {
            text: 'SELECT InsertPost($1, $2, $3, $4, $5, $6)',
            values: [classid, topicid, title, description, username, postType]
        }

        const post = await pool.query(insertQuery);
        res.json(post.rows);
        console.log(post.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// add a topic for a class 
app.post("/classes/:classcode/:username/topics", async (req, res) => {
    console.log("add topic called");
    try {
        const classcode = req.params.classcode;
        const username = req.params.username;
        const role = await getRole(username);
        if (role == Roles.Student) {
            res.status(400).json({ error: 'Students cannot add topics' });
            return;
        }

        const { title, description } = req.body;
        if (!classcode || !title || !description) {
            res.status(400).json({ error: 'Classcode, title, and description parameters are required' });
            return;
        }
        const classid = await getClassID(classcode);
        const insertQuery = {
            text: 'SELECT +($1, $2, $3, $4)',
            values: [classid, title, description, username]
        }
        const topic = await pool.query(insertQuery);
        res.json(topic.rows[0].inserttopic);
        console.log(topic.topic.rows[0].inserttopic);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 