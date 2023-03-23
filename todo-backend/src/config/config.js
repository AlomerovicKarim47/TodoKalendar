import dotenv from 'dotenv'
dotenv.config();
console.log("IMPORTED");
const CONFIG  = {
    db:{
        NAME: "todokalendar",
        PORT: 5432,
        HOST: "localhost",
        USER: "root",
        PASS: "root"
    },
    connectionString: process.env.NODE_ENV=="development"?
            "postgres://root:root@localhost:5432/todokalendar":
            process.env.DB_CONN,
    allowedOrigin: process.env.NODE_ENV=="development"?
            "http://localhost:3000":
            "https://todokalendar.onrender.com"
}

export default CONFIG;