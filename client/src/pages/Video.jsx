import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import CircularProgress from "@mui/material/CircularProgress";
import AuthContext from "../store/auth-context";
import styled from "styled-components";

const Video = () => {
  const { userdata, isSidebarExpanded } = useContext(AuthContext);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComment] = useState([]);
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [replyTexts, setReplyTexts] = useState({});
  const [togglereply, setToggleReply] = useState(new Map());
  const [replyVisibility, setReplyVisibility] = useState(new Map());
  const ref = useRef(null);

  const fetchVideoDetails = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/video/getVideo/?videoId=${id}`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);

    const sortedComments = (!data.video.comments) ? [] : data.video.comments
      .map((comment) => ({
        ...comment,
        replies: comment.replies.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        ),
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setComment(sortedComments);
    setData(data.video);
    setUrl(data.video.videoFile);
    setLikeCount(data.video.likeCount);

    const userIdAsString = userdata.id.toString();
    if (data.video.likes.includes(userIdAsString)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    fetchVideoDetails();
  }, [id]);

  const getTime = (data) => {
    const dateObject = new Date(data);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    var time = "";
    let period = hours >= 12 ? "PM" : "AM";
    time += `${hours}:${minutes} ${period}`;
    return time;
  };
  const getDate = (data) => {
    const dateObject = new Date(data);
    const year = dateObject.getUTCFullYear();
    const month = dateObject.getMonth() + 1;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = dateObject.getDate();
    var date = "";
    date += `${day},${monthNames[month - 1]} ${year}`;
    return date;
  };
  const changeHandler = (env) => {
    setInput(env.target.value);
  };
  const commentHandler = async () => {
    if (input === "") {
      toast.error("Validation Error! Do not leave the input blank", {
        position: "top-center",
      });
      return;
    }
    setLoader(true);
    ref.current.continuousStart();
    const url = window.location.href.split("/")[4];

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/video/addComment/?videoId=${url}`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            text: input,
          }),
        }
      );

      const data = await res.json();
      ref.current.complete();
      setLoader(false);
      if (res.ok) {
        const newComment = data.comment;
        setComment((prevComments) => [newComment, ...prevComments]);
        setInput("");
        setReplyTexts((prevReplies) => {
          return { [newComment._id]: "", ...prevReplies };
        });

        toast.success("Comment Posted", {
          position: "top-center",
        });
      } else {
        toast.error("Failed to post comment", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const replyTextHandler = (env) => {
    const commentId = env.target.id.split(" ")[1];
    const value = env.target.value;
    setReplyTexts({ ...replyTexts, [commentId]: value });
  };

  const replyHandler = async (env, commentid) => {
    const commentID = commentid;
    const videoId = data._id;
    const text = replyTexts[commentID];
    if (text === "") {
      toast.error("Validation Error! Do not leave the input blank", {
        position: "top-center",
      });
      return;
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/video/addReply/?videoId=${videoId}&commentId=${commentID}`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            text: text,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        const updatedComment = data.comment;

        const updatedComments = comments.map((comment) => {
          if (comment._id === commentID) {
            return {
              ...comment,
              replies: updatedComment.replies.sort(
                (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
              ),
            };
          }
          return comment;
        });

        setReplyTexts((prevReply) => {
          return { ...prevReply, [updatedComment._id]: "" };
        });
        setComment(updatedComments);

        toast.success("Reply Posted", {
          position: "top-center",
        });
      } else {
        toast.error("Failed to post reply", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  const replyToggleHandler = (commentID) => {
    const state = replyVisibility.get(commentID) || false;
    setReplyVisibility(new Map(replyVisibility.set(commentID, !state)));
  };
  const showRepliesToogleHandler = (commentID) => {
    const state = togglereply[commentID] || "close";

    if (state === "close") {
      const newMap = { ...togglereply, [commentID]: "open" };
      setToggleReply(newMap);
    } else if (state === "open") {
      const newMap = { ...togglereply, [commentID]: "close" };
      setToggleReply(newMap);
    }
  };
  const likeHandler = async () => {
    const videoId = data._id;

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/video/addLike/?videoId=${videoId}`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const result = await res.json();
    setLikeCount(result.likeCount);
    setIsLiked(true);
  };

  const unlikeHandler = async () => {
    const videoId = data._id;

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/video/removeLike/?videoId=${videoId}`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const result = await res.json();
    setLikeCount(result.likeCount);
    setIsLiked(false);
  };
  return (
    <Container>
      <ToastContainer />
      <LoadingBar color="black" ref={ref} className="loading-bar" />
      <div className={`video-box ${ isSidebarExpanded ? 'sidebarExpanded' : '' }`}>
        <div className={`video-player ${ isSidebarExpanded ? 'sidebarExpanded' : '' }`}>
          <div className="video">
            <video
              id="my-player"
              className="video-js"
              controls
              controlsList="nodownload"
              poster={data.thumbnail}
              preload="auto"
              data-setup="{}"
            >
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
                  <span className="link">
                    View Portal
                    <ArrowOutwardIcon className="arrow-icon" />
                  </span>
                </div>
                <div className="like-count">
                  <div onClick={isLiked ? unlikeHandler : likeHandler}>
                    <span>
                      {isLiked ? (
                        <ThumbUpAltIcon
                          style={{ color: "black" }}
                          className="liked"
                        />
                      ) : (
                        <ThumbUpOffAltIcon />
                      )}
                    </span>
                    <span className="text">{likeCount}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="posted-time">
              <span>
                Posted on {getTime(data.createdAt)}, {getDate(data.createdAt)}
              </span>
            </div>
            <div className="description">
              <p>{data.description}</p>
            </div>
          </div>
        </div>
        <div className={`comment-box ${ isSidebarExpanded ? 'sidebarExpanded' : '' }`}>
          <div className="header1">
            <h4>
              <span>{comments ? comments.length : 0}</span> Comments
            </h4>
          </div>
          <div className="comment-field">
            <input
              className="input"
              placeholder="Add a comment"
              value={input}
              onChange={changeHandler}
            ></input>
          </div>
          <div className="comment-btn">
            {loader ? (
              <CircularProgress />
            ) : (
              <button className="button-21" onClick={commentHandler}>
                Comment
              </button>
            )}
          </div>
          <div className="comments">
            {comments && comments.map((data, index) => (
              <div className="chatWithReply">
                <div
                  className={`chats ${
                    data.role === "admin"
                      ? "admin-chat"
                      : data.role === "instructor"
                      ? "instructor-chat"
                      : "user-chat"
                  }`}
                  key={index}
                  id={index % 2 && "gray"}
                >
                  <div className="username">
                    <span>{data.username}</span>
                  </div>
                  <div className="time">
                    <span>
                      {getTime(data.timestamp)}, {getDate(data.timestamp)}
                    </span>
                  </div>
                  <div className="text">
                    <span>{data.text}</span>
                  </div>
                  {/* <div className="link"><span onClick={() => showRepliesToogleHandler(data._id)}>{togglereply[data._id] === "open" && "Hide Replies"}{togglereply[data._id] !== "open" && "Show Replies"}</span></div> */}
                  <div className="link">
                    <span onClick={() => replyToggleHandler(data._id)}>
                      Reply
                    </span>
                    <span
                      className={`reply-toggle ${
                        data.replies.length > 0 ? "" : "hide"
                      }`}
                      onClick={() => showRepliesToogleHandler(data._id)}
                    >
                      {togglereply[data._id] === "open"
                        ? "Hide Replies"
                        : "Show Replies"}
                    </span>
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
                          value={replyTexts[data._id] || ""}
                        />
                      </div>
                      <div className="send-btn">
                        <SendIcon
                          onClick={(env) => replyHandler(env, data._id)}
                        />
                      </div>
                    </div>
                  )}
                  {data.replies.length > 0 &&
                    togglereply[data._id] === "open" && (
                      <div className="reply">
                        <div className="replies">
                          <div className="header-text">
                            <span>All replies</span>
                          </div>
                          {data.replies.map((reply, index) => (
                            <div
                              className={`reply-chats ${
                                reply.role === "admin"
                                  ? "admin-chat"
                                  : reply.role === "instructor"
                                  ? "instructor-chat"
                                  : "user-chat"
                              }`}
                            >
                              <div className="username">
                                <span>{reply.username}</span>
                              </div>
                              <div className="time">
                                <span>
                                  {getTime(reply.timestamp)},{" "}
                                  {getDate(reply.timestamp)}
                                </span>
                              </div>
                              <div className="text">
                                <span>{reply.text}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Video;

const Container = styled.div`
  .video-box {
    min-height: calc(100vh - 70px);
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 768px) and (max-width: 1400px) {
    .video-box {
      flex-direction: row;
    }

    .video-box.sidebarExpanded {
      flex-direction: column;
    }
  }

  @media (min-width: 1401px) {
    .video-box {
      flex-direction: row;
    }

    .video-box.sidebarExpanded {
      flex-direction: row;
    }
  }

  .video-player {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.video-player.sidebarExpanded {
  width: 100%;
}

@media (min-width: 768px) and (max-width: 1400px) {
  .video-player {
    width: 70%;
  }

  .video-player.sidebarExpanded {
    width: 100%;
  }
}

@media (min-width: 1401px) {
  .video-player {
    width: 70%;
  }

  .video-player.sidebarExpanded {
    width: 70%;
  }
}
  .video-player .video {
    width: 100%;
    min-height: 78.2vh;
  }
  .video-player .video-js {
    width: 100%;
    height: 76vh;
    border-radius: 15px;
  }
  .video-player img {
    width: 100%;
    min-height: 60vh;
  }
  .video-player .video {
    min-height: 60vh;
    width: 100%;
    border-radius: 15px;
  }
  .video-player video {
    border-radius: 15px;
    /* margin: 0.8rem; */
    padding: 0.8rem;
  }
  .video-player .video-info {
    min-height: 50vh;
  }
  .video-player .video-info .header1 {
    padding-left: 1.5rem;
    min-height: 16px;
  }
  .video-player .video-info .count-info {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
  }
  .video-player .video-info .avatar-box {
    padding-left: 1rem;
    display: flex;
    flex-direction: row;
  }
  .video-player .video-info .avatar-box .avatar {
    padding-right: 0.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .video-player .video-info .header1 h3 {
    font-family: sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
  }
  .video-player .video-info .avatar-box .name {
    display: flex;
    width: 70%;
    flex-direction: column;
    justify-content: space-around;
  }
  .video-player .video-info .avatar-box .name .link {
    font-weight: 500;
    width: fit-content;
    font-size: 0.9rem;
    color: rgb(142, 142, 142);
  }
  .video-player .video-info .avatar-box .name .link:hover {
    color: rgb(43, 0, 100);
    cursor: pointer;
  }
  .video-player .video-info .avatar-box .name .link .arrow-icon {
    font-size: 1rem;
    padding-left: 0.1rem;
    padding-bottom: 0.1rem;
  }
  .video-player .like-count {
    display: flex;
    width: 9%;
    border-radius: 20px;
    background-color: rgb(226, 226, 226);
    text-align: center;
    flex-direction: column;
    justify-content: center;
  }
  .video-player .like-count div span {
    margin: 0.2rem;
  }
  .video-player .like-count:hover {
    background-color: rgb(200, 200, 200);
    cursor: pointer;
    color: black;
  }
  .video-player .like-count div .text {
    font-weight: 600;
    color: black;
  }
  .video-player .like-count div svg {
    color: gray;
  }
  .video-player .posted-time {
    color: rgb(0, 0, 0);
    font-size: 0.85rem;
    font-weight: 700;
    margin-top: 0.5rem;
    padding-left: 1.3rem;
  }
  .video-player .description {
    width: 98%;
    border-radius: 10px;
    padding: 0.3rem;
    background-color: rgb(230, 228, 228);
    margin: auto;
    margin-top: 0.2rem;
  }

  /* comments */
  .comments {
    width: 100%;
  }
  .comment-box {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .comment-box.sidebarExpanded {
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1400px) {
    .comment-box {
      width: 30%;
    }

    .comment-box.sidebarExpanded {
      width: 100%;
    }
  }

  @media (min-width: 1401px) {
    .comment-box {
      width: 30%;
    }

    .comment-box.sidebarExpanded {
      width: 30%;
    }
  }
  
  .comment-box .header1 {
    margin-top: 0.5rem;
    padding-left: 1%;
    height: fit-content;
  }
  .comment-box h4 {
    font-weight: 700;
  }
  .comment-box .comment-field {
    width: 100%;
    text-align: center;
    /* height: 7vh; */
    height: 50px;
    margin-bottom: 0.5rem;
  }
  .comment-box .comment-field .input {
    width: 96%;
    height: 100%;
    padding: 0.2rem;
    border-radius: 5px;
    border: 2px solid rgb(0, 0, 0);
    font-size: 0.9rem;
  }
  .comment-box .comments .time {
    width: fit-content;
    height: fit-content;
  }

  .comment-box .comments .username span {
    font-weight: 750;
  }
  .comment-box .comments .time span {
    font-weight: 500;
    color: gray;
    font-size: 0.6rem;
    display: block;
  }
  .comment-box .comments {
    margin-top: 0.6rem;
    border-radius: 4px;
  }
  .comment-box .comments .chats {
    padding-left: 2%;
    padding-top: 0.5rem;
    border-radius: 4px;
    padding-bottom: 0.4rem;
    margin: 5px;
    background-color: rgb(243, 243, 243);
  }
  .comment-box #gray {
    background-color: rgb(219, 218, 218);
  }
  .comment-box .comments span {
    font-size: 0.9rem;
  }

  .comment-box .text {
    font-weight: 600;
    font-weight: 1.2rem;
    padding: 5px 0;
  }
  /* CSS */
  .button-21 {
    align-items: center;
    appearance: none;
    background-color: #3431ff;
    /* background-image: linear-gradient(1deg, #4F58FD, #149BF3 99%); */
    background-size: calc(100% + 20px) calc(100% + 20px);
    border-width: 0;
    border-radius: 15px;
    box-shadow: none;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-flex;
    font-family: CircularStd, sans-serif;
    font-size: 0.85rem;
    height: auto;
    justify-content: center;
    line-height: 1.5;
    padding: 6px 20px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.2s, background-position 0.2s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: top;
    white-space: nowrap;
  }

  .button-21:active,
  .button-21:focus {
    outline: none;
  }

  .button-21:hover {
    background-position: -20px -20px;
    background-color: rgb(55, 55, 218);
  }

  .button-21:focus:not(:active) {
    box-shadow: rgba(40, 170, 255, 0.25) 0 0 0 0.125em;
  }
  .comment-btn {
    width: 100%;
    padding-top: 0.2rem;
    padding-left: 2%;
    padding-bottom: 0.2rem;
  }
  .loading-bar {
    color: blue;
    font-weight: 800;
  }

  .comment-box {
    padding: 15px;
  }
  .comment-box .comments .link {
    color: #5b59be;
    font-weight: 600;
    width: fit-content;
    cursor: pointer;
  }
  .comment-box .comments .link:hover {
    color: rgb(9, 9, 198);
  }
  .comment-box .reply {
    width: 100%;
    /* margin-left: 2rem; */
    padding-left: 25px;
    margin-bottom: 0.7rem;
  }
  .comment-box .input-field {
    display: flex;
    flex-direction: row;
    padding-left: 25px;
  }
  .comment-box .input-field .input {
    width: 88%;
  }
  .comment-box .input-field .input .input-text {
    width: 100%;
    font-size: 0.5rem;
  }
  .comment-box .input-field .send-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .comment-box .input-field .send-btn svg {
    cursor: pointer;
    color: rgb(9, 9, 198);
  }
  .comment-box .input-field .send-btn:hover {
    cursor: pointer;
  }
  .comment-box .replies .header-text span {
    color: black;
    font-weight: 400;
  }
  .chatWithReply {
    background-color: rgb(239, 239, 239);
    padding: 0.2px;
    margin-bottom: 5px;
    border-radius: 10px;
  }
  .reply {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.114);
    margin: 10px 5px 0 0;
    padding: 10px;
    border-radius: 10px;
  }

  .replies {
    width: 100%;
  }
  .reply-chats {
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
  }

  .comment-box .replies .reply-chats {
    border-radius: 4px;
    padding-bottom: 0.4rem;
    /* margin-left: 5px; */
    background-color: rgb(255, 255, 255);
  }

  .link span {
    cursor: pointer;
    margin-right: 10px;
    color: rgb(9, 9, 198);
  }

  .input-field {
    display: flex;
    margin-top: 10px;
  }

  .input {
    flex: 1;
  }

  /* Style for the "Send" button */
  .send-btn {
    margin-left: 10px;
  }

  /* Style to hide "Show Replies" if there are no replies */
  .link span.hide {
    display: none;
  }

  .reply-toggle {
    cursor: pointer;
    color: rgb(52, 52, 124);
    text-decoration: underline;
  }

  /* Style for hiding the "Hide Replies" and "Show Replies" span */
  .hide {
    display: none;
  }
  .instructor-chat {
    background-color: rgb(249, 248, 233) !important;
    /* Additional styles for instructor role */
  }

  .admin-chat {
    background-color: rgb(240, 222, 212) !important;
    /* Additional styles for student role */
  }

  .user-chat {
    background-color: rgb(219, 219, 219) !important;
  }
`;
