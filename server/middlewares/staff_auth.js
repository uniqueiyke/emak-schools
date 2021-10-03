const jwt = require('jsonwebtoken');
const Staff = require('../models/staff');

function staffAuth(staff_role = '') {
    return async (req, res, next) => {
        const token = req.header('x-auth-token');

        //Check for token
        if (!token) {
            return res.status(401).json({ message: 'You do not have access to the resouces. Sign in to continue if you are a staff.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.jwtSecret);
            //confirm that there is such user in the database
            const staff = await Staff.findById(decoded.user.id);
            if (!staff) {
                return res.status(401).json({ message: 'You do not have access to the resouces. Sign in to continue if you are a staff.' });
            }

            if(staff_role ==='admin' && !(staff.roles.includes('admin') || staff.roles.includes('super-admin'))){
                return res.status(401).json({ message: 'You do not have access to the resouces' });
            }

            if(staff_role ==='super-admin' && !staff.roles.includes('super-admin')){
                return res.status(401).json({ message: 'You do not have access to the resouces' });
            }

            //Add user from payload
            req.staff_token = decoded;
            next();
        } catch (e) {
            res.status(400).json({ message: 'Token not valid' });
        }
    }
}

module.exports = staffAuth;