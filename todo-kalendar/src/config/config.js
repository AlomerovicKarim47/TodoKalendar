const CONFIG = {
    BACKEND_URL: process.env.NODE_ENV=="production"?
    "https://todoback.onrender.com":
    "http://localhost:4000"
}

export default CONFIG