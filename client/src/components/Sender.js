import { useState } from "react";
import "./Sender.css";
const Sender = () => {
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
  const [postData,setpostData]=useState('');
  const [file,setFile]=useState('');
  const questionHandler=(env)=>{
    setpostData(env.target.value);
  }
  const imgHandler=(env)=>{
    setFile(env.target.files[0]);
  }
  const submitHandler=(env)=>{
    env.preventDefault();
    const formData=new FormData();
    formData.append('image',file);
    formData.append('question',postData);
    fetch('http://localhost:8001/doubt',{
      method:'POST',
      body:formData
    }).then(()=>{
      alert('Question Posted');
      window.location.reload();
    }).catch();
    if(file!==''){
      fetch('http://localhost:8001/saveimage',{
        body:formData
      }).then().catch();
    }
  }
  return (
    <form method="POST" className="sendingPanel">
        <input type="text" placeholder="Post your doubt here" name="question" onChange={questionHandler}></input>
        <input type="file" className="fileUploader" name="img" id="imgUrl" onChange={imgHandler}></input>
        <button type="submit" onClick={submitHandler}>Post</button>
    </form>
  );
};
export default Sender;
