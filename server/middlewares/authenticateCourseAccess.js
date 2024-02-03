const jwt = require('jsonwebtoken');
const Instructor = require('../models/instructor');
const User = require('../models/user');
const Course = require('../models/course');
const { ObjectId } = require('mongoose').Types;

const authenticateCourseAccess = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        const { courseId } = req.params;
        console.log(token);
        console.log(req.body);
        const courseObjectId = new ObjectId(courseId);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.decode(token);

        if(decoded.role === 'admin') {
            return res.status(401).json({ message: 'Unauthorized' });
        } 
        else if(decoded.role === 'instructor') {
            const instructorFromToken = jwt.verify(token, process.env.INSTRUCTOR_JWT_SECRET);
            const instructorId = instructorFromToken.id;

            const instructor = await Instructor.findOne({_id: instructorId, isApproved: true});
            if (!instructor) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            console.log(instructor.courses);
            console.log(courseObjectId);
            const hasCourse = (
                instructor.courses.includes(courseObjectId) ||
                instructor.enrolledCourses.includes(courseObjectId) ||
                instructor.purchasedCourses.includes(courseObjectId)
            );

            if(!hasCourse) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            req.user = instructorFromToken;
            next();
            return;
        } 
        else if(decoded.role === 'user') {
            const userFromToken = jwt.verify(token, process.env.USER_JWT_SECRET);
            const userId = userFromToken.id;
            const user = await User.findById(userId);
            console.log(userId);
            console.log("Here");
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const hasCourse = (
                user.enrolledCourses.includes(courseObjectId) ||
                user.purchasedCourses.includes(courseObjectId)
            );

            if(!hasCourse) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = userFromToken;
            next();
            return;
        } 
        return res.status(401).json({ message: 'Unauthorized' });
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = authenticateCourseAccess;
