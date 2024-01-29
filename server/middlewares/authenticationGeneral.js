const jwt = require('jsonwebtoken');

const authenticateGeneral = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        console.log(jwt.decode(token));
        const role = jwt.decode(token).role;

        let user;
        switch (role) {
            case "user":
                user = jwt.verify(token, process.env.USER_JWT_SECRET);
                break;
            case "instructor":
                user = jwt.verify(token, process.env.INSTRUCTOR_JWT_SECRET);
                break;
            case "admin":
                user = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
                break;
        }
        req.user = user;
        req.role = user.role;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = authenticateGeneral;
