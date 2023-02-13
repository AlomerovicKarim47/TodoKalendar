const CONFIG  = {
    db:{
        NAME: "todokalendar",
        PORT: 5432,
        HOST: "localhost",
        USER: "root",
        PASS: "root"
    },
    connectionString: process.env.NODE_ENV=="development"?
            `postgres://root:root@localhost:5432/todokalendar`:
            "postgres://root:J0MctfgHElCuVcJIJG37gZFcW8hUoRu5@dpg-cfl7nu5a49903fk9nc5g-a.frankfurt-postgres.render.com/todokalendar",
    allowedOrigin: process.env.NODE_ENV=="development"?
            "http://localhost:3000":
            "https://todokalendar.onrender.com"
}

export default CONFIG;