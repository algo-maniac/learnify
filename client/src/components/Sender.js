import { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import "./Sender.css";
const Sender = (props) => {
  // // const event=()=>{
  // //   fetch("http://localhost:3000/doubt", {
  // //   method: "POST",
  // //   body: JSON.stringify({

  // //   }),
  // //   headers: {
  // //       "Content-type": "application/json; charset=UTF-8"
  // //   }
  // // }).then().catch();
  // // }
  const [postData, setpostData] = useState("");
  const [file, setFile] = useState("");
  const ctx=useContext(AuthContext);
  const questionHandler = (env) => {
    setpostData(env.target.value);
  };
  const imgHandler = (env) => {
    setFile(env.target.files[0]);
  };
  const submitHandler = (env) => {
    env.preventDefault();
    const formData = new FormData();
    formData.append("name",ctx.username);
    formData.append("image", file);
    formData.append("question", postData);
    fetch(`${process.env.REACT_APP_BASE_URL}/doubt`, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        alert("Question Posted");
        props.setFlag((prev) => {
          return !prev;
        })
        // window.location.reload();
      })
      .catch();
  };
  return (
    <form method="POST" className="sendingPanel" style={{ marginTop: "10px" }}>
      <input
        type="text"
        placeholder="Post your doubt here"
        name="question"
        onChange={questionHandler}
        style={{
          height: "40px",
          width: "85%",
          borderRadius: "10px",
          padding: "6px",
          // color: "white",
          // backgroundColor: "#171b29",
        }}
      ></input>
      <input
        type="file"
        className="fileUploader"
        name="img"
        id="imgUrl"
        onChange={imgHandler}
        style={{
          height: "50px",
          width: "120px",
          borderRadius: "10px",
          padding: "4px",
          color: "white",
          // backgroundColor: "#171b29",
        }}
      ></input>
      <button
        type="submit"
        onClick={submitHandler}
        style={{
          height: "45px",
          width: "130px",
          // fontSize: "1.5rem",
          borderRadius: "10px",
          border: 0,
          padding: "4px",
          color: "white",
          backgroundColor: "#2F58CD",
        }}
      >
        Post
      </button>
    </form>
  );
};
export default Sender;
