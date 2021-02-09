import jwt from 'jsonwebtoken'
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined')
    {
        try
        {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            jwt.verify(bearerToken, 'secretkey')
            req.token = bearerToken
            next()
        }
        catch(err){
            res.sendStatus(401)
        }
    }
    else
    {
        res.sendStatus(401)
    }
}

const decodeUserInfo = (req, res, next) => {
    const token = req.token;
    const currentUser = jwt.decode(token, 'secretkey')
    req.userInfo = currentUser.user
    next()
}

let middleware = {
    verifyToken,
    decodeUserInfo
}

export default middleware