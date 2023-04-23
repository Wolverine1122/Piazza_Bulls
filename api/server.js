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
        var permissionid = 0;
        if (role.toLowerCase() === 'student')
            permissionid =0;
        else if (role.toLowerCase() == 'teacher' || 'professor')
            permissionid =1;
        else if(role.toLowerCase() == 'ta' || 'teaching assistant')
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
    const  username  = req.params.username; 
    const role = await pool.query(
        'SELECT role FROM users WHERE username = $1',
        [username]
    );
    console.log(role.rows[0].role);
    console.log(username);
    res.json({role: role.rows[0].role,}); 

} );


app.post('/classes/:username/addcourse', async (req, res) => {
    console.log("i am here");
    console.log("add course called");
        const  username  = req.params.username; 
        const role = await pool.query(
            'SELECT role FROM users WHERE username = $1',
            [username]
        );
        console.log(role.rows[0].role);
        console.log(username);
        //res.json({role: role.rows[0].role,}); //this WORKED

        if( role.rows[0].role == 'Professor')
        {
            //console.log("i am a professor");
            const {classid, classtitle, description} = req.body;
            var qtyoftopics = 0; 
            const  newCourse = await pool.query('INSERT INTO classes (classid, classtitle, description, qtyoftopics) VALUES ($1, $2, $3, $4) RETURNING * ',
            [classid, classtitle, description,qtyoftopics ] 
            );
            const  newMem = await pool.query('INSERT INTO MemberOf (username, classid) VALUES ($1, $2) RETURNING * ',
            [username, classid] 
            );
            console.log(newCourse);
            console.log(newMem);
            res.json(newCourse.rows);

        }
        else if( role.rows[0].role =='Student' || 'TA')
        {
           // console.log("I am a student/TA");
            const {classid} = req.body;
            const  newMem = await pool.query('INSERT INTO MemberOf (username, classid) VALUES ($1, $2) RETURNING * ',
            [username, classid]
            );
            console.log(newMem);
            res.json(newMem.rows);


        }
        else 
        {
            console.log("Not a valid role");
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
            res.status(400).json({ error: 'Invalid username or password' });
            return;
        }
        else
        {
            console.log(user);
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
      const  username  = req.params.username; 
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







app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});