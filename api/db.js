import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bullsPiazza",
    password: "hershey2000",
    port: 5432,
});

export default pool;
