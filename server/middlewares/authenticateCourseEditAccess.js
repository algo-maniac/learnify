const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;
const Course = require('../models/course');

const authenticateCourseEditAccess = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        const { courseId } = req.params;
        console.log(token);
        console.log(req.body);
        console.log("here");
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log("here1");

        const decoded = jwt.verify(token, process.env.INSTRUCTOR_JWT_SECRET);

        if(decoded.role != "instructor") {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        console.log("here3");
        console.log(courseId);
        const course = await Course.findById(courseId);
        console.log(course)
        console.log(course.instructorId)
        console.log(decoded.id);
        console.log(decoded.id === course.instructorId);
        const newInstructorObjectId = new ObjectId(decoded.id);

        if(!course || !course.instructorId.equals(newInstructorObjectId)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        console.log("here4");
        
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = authenticateCourseEditAccess;
