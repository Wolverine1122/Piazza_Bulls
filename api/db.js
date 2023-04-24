import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bullsPiazza", 
    password: "qwerty123", //"hershey2000",
    port: 5432,
});

export default pool;
