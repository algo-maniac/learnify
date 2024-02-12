const jwt = require('jsonwebtoken');

const { VideoLecture } = require('../models/videoLecture');
const Instructor = require('../models/instructor');
const User = require('../models/user');

const authenticateVideoAccess = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        const { videoId } = req.query;
        
        if (!token || !videoId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const role = jwt.decode(token).role;
        let JWT_SECRET;
        if(role == "admin") JWT_SECRET = process.env.ADMIN_JWT_SECRET;
        if(role == "instructor") JWT_SECRET = process.env.INSTRUCTOR_JWT_SECRET;
        if(role == "user") JWT_SECRET = process.env.USER_JWT_SECRET;
    
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;

        const video = await VideoLecture.findById(videoId, "_id instructorId courseId");
        console.log(videoId);
        console.log(video);
        if(video.courseId == null) {
            next();
            return;
        }

        switch (user.role) {
            case "admin":
                next();
                return;
                break;

            case "instructor":
                const isInEnrolledCourses = await Instructor.exists({
                    _id: user.id,
                    enrolledCourses: { $in: [video.courseId] }
                });
                if (video.instructorId == user.id || isInEnrolledCourses) {
                    next();
                    return;
                } 

            case "user":
                const isInEnrolledCourses1 = await User.exists({
                    _id: user.id,
                    enrolledCourses: { $in: [video.courseId] }
                });

                if (isInEnrolledCourses1) {
                    next();
                    return;
                } 
                break;
        }

        return res.status(401).json({
            error: "unauthorized access"
        })
    } catch (err) {
        console.log(err);
        return res.status(403).json({ 
            message: 'Forbidden' 
        });
    }
};

module.exports = authenticateVideoAccess;
