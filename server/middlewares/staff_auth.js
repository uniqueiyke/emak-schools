const jwt = require('jsonwebtoken');
const Staff = require('../models/staff');

async function staffAuth(req, res, next) {
    const token = req.header('x-auth-token');
    
    //Check for token
    if(!token){
        return res.status(401).json({message: 'You do have access to the resouces'});
    }

    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        //confirm that there is such user in the database
        const staff = await Staff.findById(decoded.user.id);
        if(!staff){
            return res.status(401).json({message: 'You do have access to the resouces'});
        }
        //Add user from payload
        req.staff_token = decoded;
        next();
    } catch (e) {
        res.status(400).json({message: 'Token not valid'});
    }
}

module.exports = staffAuth;