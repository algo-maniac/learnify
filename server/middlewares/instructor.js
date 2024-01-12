const jwt = require('jsonwebtoken');

const authenticateInstructor = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(req.headers);
    console.log("in middleware");
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log()
    try {
        console.log(token);
        console.log(jwt.decode(token));
        const user = jwt.verify(token, process.env.INSTRUCTOR_JWT_SECRET);
        console.log(user);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = authenticateInstructor;
