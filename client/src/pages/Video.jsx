import React, { useEffect, useRef, useState } from "react";
import "./Video.css"
import { useParams } from "react-router-dom"
import { Avatar } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from "react-toastify";
import LoadingBar from 'react-top-loading-bar'
import CircularProgress from "@mui/material/CircularProgress";
const Video = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [comments, setComment] = useState([])
    const [input, setInput] = useState("");
    const [url, setUrl] = useState('');
    const [loader, setLoader] = useState(false);
    const [replyTexts, setReplyTexts] = useState({})
    const [togglereply, setToggleReply] = useState(new Map());
    const [replyVisibility, setReplyVisibility] = useState(new Map());
    const ref = useRef(null)

    const fetchVideoDetails = async () => {
        console.log(id);
        const res = await fetch(`http://localhost:8000/video/getVideo/?videoId=${id}`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem("token"),
                'Content-type': 'application/json'
            }
        });
        const data = await res.json();
        console.log(data);

        const sortedComments = data.video.comments.map(comment => ({
            ...comment,
            replies: comment.replies.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setComment(sortedComments)
        setData(data.video)
        setUrl(data.video.videoFile);
        console.log(data.video);
    }

    useEffect(() => {
        fetchVideoDetails();
    }, [id])

    const getTime = (data) => {
        const dateObject = new Date(data);
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        var time = "";
        let period = hours >= 12 ? "PM" : "AM";
        time += `${hours}:${minutes} ${period}`;
        return time;
    }
    const getDate = (data) => {
        const dateObject = new Date(data);
        const year = dateObject.getUTCFullYear();
        const month = dateObject.getMonth() + 1;
        const monthNames = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        const day = dateObject.getDate();
        var date = ""
        date += `${day},${monthNames[month - 1]} ${year}`;
        return date
    }
    const changeHandler = (env) => {
        setInput(env.target.value);
    }
    const commentHandler = async () => {
        if (input === '') {
            toast.error("Validation Error! Do not leave the input blank", {
                position: 'top-center'
            })
            return;
        }
        setLoader(true)
        ref.current.continuousStart()
        const url = window.location.href.split('/')[4];

        try {
            const res = await fetch(`http://localhost:8000/video/addComment/?videoId=${url}`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    text: input
                })
            });

            const data = await res.json();
            console.log(data);
            ref.current.complete()
            setLoader(false)
            if (res.ok) {
                const newComment = data.comment;
                setComment(prevComments => [newComment, ...prevComments]);
                setInput('');
                setReplyTexts(prevReplies => {
                    return { [newComment._id]: '', ...prevReplies }
                })

                toast.success("Comment Posted", {
                    position: 'top-center'
                });
            } else {
                toast.error("Failed to post comment", {
                    position: 'top-center'
                });
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    }

    const replyTextHandler = (env) => {
        const commentId = env.target.id.split(' ')[1];
        const value = env.target.value;
        setReplyTexts({ ...replyTexts, [commentId]: value });
        console.log(replyTexts);
    }

    const replyHandler = async (env, commentid) => {
        const commentID = commentid;
        const videoId = data._id;
        const text = replyTexts[commentID]
        if (text === '') {
            toast.error("Validation Error! Do not leave the input blank", {
                position: 'top-center'
            })
            return;
        }
        try {
            const res = await fetch(`http://localhost:8000/video/addReply/?videoId=${videoId}&commentId=${commentID}`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    text: text,
                })
            });

            const data = await res.json();


            if (res.ok) {
                const updatedComment = data.comment;

                const updatedComments = comments.map(comment => {
                    if (comment._id === commentID) {
                        return {
                            ...comment,
                            replies: updatedComment.replies.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        };
                    }
                    return comment;
                });

                setReplyTexts(prevReply => {
                    return { ...prevReply, [updatedComment._id]: '' }
                });
                console.log(replyTexts)
                setComment(updatedComments);

                toast.success("Reply Posted", {
                    position: 'top-center'
                });
            } else {
                toast.error("Failed to post reply", {
                    position: 'top-center'
                });
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    }
    const replyToggleHandler = (commentID) => {
        const state = replyVisibility.get(commentID) || false;
        setReplyVisibility(new Map(replyVisibility.set(commentID, !state)));
    }
    const showRepliesToogleHandler = (commentID) => {
        const state = togglereply[commentID] || "close";

        if (state === "close") {
            const newMap = { ...togglereply, [commentID]: "open" };
            setToggleReply(newMap);
        }
        else if(state === "open") {
            const newMap = { ...togglereply, [commentID]: "close" };
            setToggleReply(newMap);
        }
        console.log(togglereply);
    }
    return <>
        <ToastContainer />
        <LoadingBar color="black" ref={ref} className="loading-bar" />
        <div className="video-box">
            <div className="video-player">
                <div className="video">
                    <video
                        id="my-player"
                        className="video-js"
                        controls
                        controlsList="nodownload"
                        poster={data.thumbnail}
                        preload="auto"
                        data-setup='{}'>
                        {url && <source src={url}></source>}
                    </video>
                </div>
                <div className="video-info">
                    <div className="header1">
                        <h3>{data.title}</h3>
                    </div>
                    <div className="avatar-box">
                        <div className="avatar">
                            <Avatar />
                        </div>
                        <div className="count-info">
                            <div className="name">
                                <span className="instructor">{"sd"}</span>
                                <span className="link">View Portal<ArrowOutwardIcon className="arrow-icon" /></span>
                            </div>
                            <div className="like-count">
                                <div>
                                    <span><ThumbUpOffAltIcon /></span>
                                    <span className="text">{data.likeCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="posted-time">
                        <span>Posted on {getTime(data.createdAt)},  {getDate(data.createdAt)}</span>
                    </div>
                    <div className="description">
                        <p>{data.description}</p>
                    </div>
                </div>
            </div>
            <div className="comment-box">
                <div className="header1"><h4><span>{comments.length}</span> Comments</h4></div>
                <div className="comment-field">
                    <input className="input" placeholder="Add a comment" onChange={changeHandler}></input>
                </div>
                <div className="comment-btn">
                    {loader ? <CircularProgress /> : <button className="button-21" onClick={commentHandler}>Comment</button>}
                </div>
                <div className="comments">
                    {comments.map((data, index) => (
                        <>
                            <div className="chats" key={index} id={index % 2 && "gray"}>
                                <div className="username">
                                    <span>{data.username}</span>
                                </div>
                                <div className="time">
                                    <span>{getTime(data.timestamp)}, {getDate(data.timestamp)}</span>
                                </div>
                                <div className="text">
                                    <span>{data.text}</span>
                                </div>
                                {/* <div className="link"><span onClick={() => showRepliesToogleHandler(data._id)}>{togglereply[data._id] === "open" && "Hide Replies"}{togglereply[data._id] !== "open" && "Show Replies"}</span></div> */}
                                <div className="link">
                                    <span onClick={() => replyToggleHandler(data._id)}>Reply</span>
                                    <span
                                        className={`reply-toggle ${data.replies.length > 0 ? "" : "hide"}`}
                                        onClick={() => showRepliesToogleHandler(data._id)}
                                    >
                                        {togglereply[data._id] === "open" ? "Hide Replies" : "Show Replies"}
                                    </span>
                                </div>
                            </div>
                            {replyVisibility.get(data._id) && (
                                <div className="input-field">
                                    <div className="input">
                                        <TextField
                                            id={`${"standard-basic"} ${data._id}`}
                                            placeholder="Add a reply..."
                                            variant="standard"
                                            className="input-text"
                                            onChange={replyTextHandler}
                                            value={replyTexts[data._id] || ''}
                                        />
                                    </div>
                                    <div className="send-btn">
                                        <SendIcon onClick={(env) => replyHandler(env, data._id)} />
                                    </div>
                                </div>
                            )}
                            {data.replies.length > 0 && togglereply[data._id] === "open" && <div className="reply">

                                <div className="replies">
                                    <div className="header-text">
                                        <span>All replies</span>
                                    </div>
                                    {
                                        data.replies.map((data, index) => (
                                            <div className="reply-chats">
                                                <div className="username">
                                                    <span>Chandrachur</span>
                                                </div>
                                                <div className="time">
                                                    <span>{getTime(data.timestamp)}, {getDate(data.timestamp)}</span>
                                                </div>
                                                <div className="text">
                                                    <span>{data.text}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>}
                        </>
                    ))}
                </div>
            </div>
        </div>
    </>
}
export default Video