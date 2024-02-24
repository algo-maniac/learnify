import { Avatar } from "@mui/material";
import { fontSize } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import Comment from "./Comment";
import { grey } from "@mui/material/colors";
import { Navigate } from "react-router-dom";
const SinglePost = (props) => {
  const [answerToggle, setAnswer] = useState(false);
  const [answerText, setText] = useState("Show answers");
  const [comment, setComment] = useState("");
  const [comments, setCommentFlag] = useState([]);
  const [imgFlag, setImgFlag] = useState(false);
  const ctx=useContext(AuthContext);
  // it is the context api which store the data of the user
  useEffect(() => {
    if (props.data.comments.length > 0) {
      setCommentFlag(props.data.comments);
    }
    if (props.data.img !== "") {
      setImgFlag(true);
    }
  }, []);
  const commentHandler = (env) => {
    setComment(env.target.value);
  };
  const commentSubmitHandler = (env) => {
    const id = env.target.id;
    fetch(`${process.env.REACT_APP_BASE_URL}/doubt/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:ctx.username,
        id: id,
        comment: comment,
      }),
    })
      .then(() => {
        alert("Answer posted");
        // setComment("");
        setAnswer(false);
        setAnswer(true);
        // window.location.reload();
      })
      .catch();
  };
  const changeAnswer = () => {
    setAnswer(!answerToggle);
    if (answerText === "Show answers") {
      setText("Hide answers");
    } else {
      setText("Show answers");
    }
  };
  const date = new Date(props.data.date);
  let hour="";
  if(String(date.getHours()).length===1){
    hour+='0'+String(date.getHours());
  }
  else{
    hour+=String(date.getHours());
  }
  let minute="";
  if(String(date.getMinutes()).length===1){
    minute+='0'+String(date.getMinutes());
  }
  else{
    minute+=String(date.getMinutes());
  }
  return (
    <>
      <div className="post">
        <div
          style={{
            margin: "5px 0px",
            borderRadius: "10px",
            // backgroundColor: "#171b29",
            color: "black",
            // height: "50px",
            padding: "10px 0px",
            width: "40%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "1.25rem"
            }}>

            <Avatar src="props.data.img" />
            <b>
              {props.data.name}
            </b>
          </div>
          <span
            // style={{
            //   margin: "5px",
            //   borderRadius: "5px",
            //   backgroundColor: "#171b29",
            //   color: "white",
            // }}
            style={{
              fontSize: ".75rem"
            }}
          >
            Posted this on {date.getDate()}/
            {date.getMonth()}/{date.getFullYear()}, {hour}:
            {minute}

          </span>
          <br></br>
        </div>
        <div>
          {imgFlag && (
            <img
              className="postImage"
              src={`${process.env.REACT_APP_BASE_URL}/` + props.data.img}
              alt=""
            ></img>
          )}
          <p className="questionData">
            <b style={{
              fontSize: "1.25rem"
            }}>{props.data.question}</b>
          </p>
          <button
            onClick={changeAnswer}
            style={{
              height: "40px",
              width: "130px",
              borderRadius: "10px",
              padding: "4px",
              color: "white",
              border: 0,
              backgroundColor: "#d6d6d6",
              color: "black"
            }}
          >
            {answerText}
          </button>
        </div>
        {/* <hr></hr> */}
        {answerToggle &&
          <div className="commentSection" style={{ padding: "5px", borderRadius: "10px" }}>
            <div>
              <div>
                <label
                  // style={{
                  //   height: "30px",
                  //   width: "130px",
                  //   borderRadius: "10px",
                  //   padding: "6px",
                  //   color: "white",
                  //   backgroundColor: "#171b29",
                  //   textAlign: "center",
                  // }}
                >
                  {/* <b>Add a answer</b> */}
                </label>
                {/* <br></br> */}
                <input
                  className="commentPanel"
                  placeholder="Write your answer here"
                  onChange={commentHandler}
                  style={{
                    height: "40px",
                    width: "80%",
                    borderRadius: "10px",
                    padding: "6px",
                    // color: "white",
                    // backgroundColor: "#171b29",
                  }}
                ></input>
                <button
                  onClick={commentSubmitHandler}
                  id={props.data._id}
                  style={{
                    height: "40px",
                    width: "80px",
                    borderRadius: "10px",
                    padding: "4px",
                    color: "white",
                    // backgroundColor: "#171b29",
                    backgroundColor: "#264285"
                  }}
                >
                  Post
                </button>
              </div>
              {comments.map((val, key) => (
                <Comment val={val} key={key}></Comment>
              ))}
            </div>
          </div>
        }
      </div>

      <br></br>
      <br></br>
    </>
  );
};
export default SinglePost;
