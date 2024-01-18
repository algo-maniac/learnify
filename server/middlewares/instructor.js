const jwt = require('jsonwebtoken');

const authenticateInstructor = (req, res, next) => {
    const token = req.headers['authorization'];

    console.log(token);
    console.log(req.body);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = jwt.verify(token, process.env.INSTRUCTOR_JWT_SECRET);
        
        req.user = user;
        console.log(req.user);
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = authenticateInstructor;
