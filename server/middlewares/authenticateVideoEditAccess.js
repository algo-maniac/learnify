const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;
const Course = require('../models/course');
const { VideoLecture } = require('../models/videoLecture');

const authenticateVideoEditAccess = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        const { videoId } = req.params;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.INSTRUCTOR_JWT_SECRET);

        if(decoded.role != "instructor") {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const video = await VideoLecture.findById(videoId);

        console.log(decoded.id === video.instructorId);
        const newInstructorObjectId = new ObjectId(decoded.id);

        if(!video || !video.instructorId.equals(newInstructorObjectId)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = authenticateVideoEditAccess;
