import React from "react";
import "./Video.css"
import { Avatar } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import TextField from '@mui/material/TextField';
const Video=()=>{
    const src="https://res.cloudinary.com/desdkbhvz/video/upload/v1705173563/l09rwfmifegpl5bnlc1w.mp4"
    const poster="https://res.cloudinary.com/desdkbhvz/image/upload/v1705173624/pegmrwuzalpexxprglvk.png";
    return <>
        <div className="video-box">
            <div className="video-player">
                <div className="video">
                    <video
                        id="my-player"
                        className="video-js"
                        controls
                        controlsList="nodownload"
                        poster={poster}
                        preload="auto"
                        width={1050}
                        data-setup='{}'>
                    <source src="https://res.cloudinary.com/desdkbhvz/video/upload/v1705173563/l09rwfmifegpl5bnlc1w.mp4" type="video/mp4"></source>
                    </video>
                </div>
                <div className="video-info">
                    <div className="header1">
                        <h3>Forest Video</h3>
                    </div>
                    <div className="avatar-box">
                        <div className="avatar">
                            <Avatar/>
                        </div>
                        <div className="count-info">
                            <div className="name">
                                <span className="instructor">Nandini Mukherjee</span>
                                <span className="link">View Portal<ArrowOutwardIcon className="arrow-icon"/></span>
                            </div>
                            <div className="like-count">
                                <div>
                                    <span><ThumbUpOffAltIcon/></span>
                                    <span className="text">12</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="posted-time">
                        <span>Posted on 11:10am,<br></br> 12 January,2024</span>
                    </div>
                    <div className="description">
                        <p>This is the video created by viruThis is the video created by viruThis is the video created by viruThis is the video created by viruThis is the video created by viruThis is the video created by viruThis is the video created by viru</p>
                    </div>
                </div>
            </div>
            <div className="comment-box">
                <div className="header1"><h4>12 Comments</h4></div>
                <div className="comment-field">
                    <TextField id="filled-basic" label="Add a Comment" className="input"/>
                </div>
                <div className="comment-btn">
                    <button className="button-21">Comment</button>
                </div>
                <div className="comments">
                    <div className="chats">
                        <div className="username">
                            <span>Chandrachur</span>
                        </div>
                        <div className="time">
                            <span>11:10am, 12 January, 2024</span>
                        </div>
                        <div className="text">
                            <span>Very awesome Content</span>
                        </div>
                    </div>
                    <div className="chats">
                        <div className="username">
                            <span>Chandrachur</span>
                        </div>
                        <div className="time">
                            <span>11:10am, 12 January, 2024</span>
                        </div>
                        <div className="text">
                            <span>Very awesome Content</span>
                        </div>
                    </div>
                    <div className="chats">
                        <div className="username">
                            <span>Chandrachur</span>
                        </div>
                        <div className="time">
                            <span>11:10am, 12 January, 2024</span>
                        </div>
                        <div className="text">
                            <span>Very awesome Content</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Video