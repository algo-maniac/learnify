import { useEffect, useState } from "react";
import Comment from "./Comment";
const SinglePost = (props) => {
  const [answerToggle, setAnswer] = useState(false);
  const [answerText, setText] = useState("Show answers");
  const [comment, setComment] = useState("");
  const [comments, setCommentFlag] = useState([]);
  const [imgFlag, setImgFlag] = useState(false);
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
    fetch("http://localhost:8000/doubt/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        comment: comment,
      }),
    })
      .then(() => {
        alert("Answer posted");
        window.location.reload();
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
  console.log(props.data.img);
  return (
    <>
      <div className="post">
        <div
          style={{
            margin: "5px 0px",
            borderRadius: "10px",
            backgroundColor: "#171b29",
            color: "white",
            height: "50px",
            padding: "10px 10px",
            width: "40%",
          }}
        >
          <span
          // style={{
          //   margin: "5px",
          //   borderRadius: "5px",
          //   backgroundColor: "#171b29",
          //   color: "white",
          // }}
          >
            <b>
              {props.data.name} Posted this on {date.getDate()}/
              {date.getMonth()}/{date.getFullYear()}, {date.getHours()}:
              {date.getMinutes()}
            </b>
          </span>
          <br></br>
        </div>
        <div>
          {imgFlag && (
            <img
              className="postImage"
              src={"http://localhost:8000/" + props.data.img}
              alt=""
            ></img>
          )}
          <p className="questionData">
            <b>{props.data.question}</b>
          </p>
          <button
            onClick={changeAnswer}
            style={{
              height: "40px",
              width: "130px",
              borderRadius: "10px",
              padding: "4px",
              color: "white",
              backgroundColor: "#171b29",
            }}
          >
            {answerText}
          </button>
        </div>
        <hr></hr>
        <div className="commentSection" style={{ padding: "5px" }}>
          {answerToggle && (
            <div>
              <div>
                <label
                  style={{
                    height: "30px",
                    width: "130px",
                    borderRadius: "10px",
                    padding: "6px",
                    color: "white",
                    backgroundColor: "#171b29",
                    textAlign: "center",
                  }}
                >
                  <b>Add a answer</b>
                </label>
                <br></br>
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
                    backgroundColor: "#171b29",
                  }}
                >
                  Post
                </button>
              </div>
              {comments.map((val, key) => (
                <Comment val={val} key={key}></Comment>
              ))}
            </div>
          )}
        </div>
      </div>

      <br></br>
      <br></br>
    </>
  );
};
export default SinglePost;
