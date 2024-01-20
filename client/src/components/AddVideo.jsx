import React, { useState } from 'react';
import './AddVideo.css'

const AddVideo = ({ courseId, sectionId, setCourseDetails, handleAddVideoClick, loading, setLoading }) => {
    const [localLoading, setLocalLoading] = useState(false);
    const [videoDetails, setVideoDetails] = useState({
        title: '',
        description: '',
        video: null,
        thumbnail: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        setVideoDetails((prevDetails) => ({
            ...prevDetails,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            setLocalLoading(true);
            setLoading(true);
            const form = new FormData();
            form.append("courseId", courseId);
            form.append("sectionId", sectionId);
            form.append("title", videoDetails.title);
            form.append("description", videoDetails.description);
            form.append("video", videoDetails.video);
            form.append("thumbnail", videoDetails.thumbnail);
            console.log(videoDetails);

            const res = await fetch("http://localhost:8000/instructor/uploadVideo", {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token")
                },
                body: form,
            })
            const data = await res.json();
            const newVideo = data.video;

            if (!newVideo) {
                // show err
            } else {

                setCourseDetails((prevDetails) => {
                    const updatedSections = prevDetails.sections.map((section) => {
                        if (section._id === sectionId) {
                            return {
                                ...section,
                                videoLectures: [...section.videoLectures, newVideo],
                            };
                        }
                        return section;
                    });

                    return {
                        ...prevDetails,
                        sections: updatedSections,
                    };
                });

                setVideoDetails({
                    title: '',
                    description: '',
                    video: null,
                    thumbnail: null,
                });

                handleAddVideoClick(sectionId);
            }
        } catch (err) {

        } finally {
            setLocalLoading(false);
            setLoading(false);
        }
    };

    return (
        <div className="add-video-form">
            <label>
                Title:
                <input type="text" name="title" value={videoDetails.title} onChange={handleChange} />
            </label>
            <label>
                Description:
                <textarea name="description" value={videoDetails.description} onChange={handleChange} />
            </label>
            <label>
                Video File:
                <input type="file" name="video" onChange={handleChange} accept="video/*" />
            </label>
            <label>
                Thumbnail:
                <input type="file" name="thumbnail" onChange={handleChange} accept="image/*" />
            </label>
            <button onClick={handleUpload} disabled={loading}>
                {!localLoading ? 'Upload Video' : 'Uploading...'}
            </button>
        </div>
    );
};

export default AddVideo;
