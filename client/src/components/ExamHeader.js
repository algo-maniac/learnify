import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ExamCorner.css'
import detail from './examdata.json';
const ExamHeader = () => {
  const exams=["jee","neet","ctet","nda","upsc"];
  const [data,setData]=useState(detail);
  const [key,setKey]=useState(0);
  const syllabus=[false,false,false,false,false];
  const syllabusHandler=(env)=>{
    console.log(env.target.parentNode);
  }
  const jeeHandler=()=>{
    setKey(0);
  }
  const neetHandler=()=>{
    setKey(1);
  }
  const ctetHandler=()=>{
    setKey(2);
  }
  const ndaHandler=()=>{
    setKey(3);
  }
  const upscHandler=()=>{
    setKey(4);
  }
  useEffect(()=>{

  },[key])
  return (
    <div className={"exam-container"}>
      <div className={"header"}>
        <div id="jee" onClick={jeeHandler} className={key===0?'active':''}>
          <span>JEE</span>
        </div>
        <div id="neet" onClick={neetHandler} className={key===1?'active':''}>
          <span>NEET</span>
        </div>
        <div onClick={ctetHandler} className={key===2?'active':''}>
          <span>CTET</span>
        </div>
        <div onClick={ndaHandler} className={key===3?'active':''}>
          <span>NDA</span>
        </div>
        <div onClick={upscHandler} className={key===4?'active':''}>
          <span>UPSC</span>
        </div>
      </div>
      <div className={"blog-card"}>
        <input type="radio" name="select" id="tap-1" checked></input>
        <input type="checkbox" id="imgTap"></input>
        <div className={"inner-part"}>
          <label for="imgTap" class="img">
            <img className={"img-1"} alt="" src={data[key].examImg}></img>
          </label>
          <div className={"content content-1"}>
            <div className={"title"}>{data[key].examName}</div>
            <h3>Registration Date</h3>
            <div className={"text"}>{data[key].examReg}</div>
            <h3>Exam Date</h3>
            <div className={"text"}>{data[key].examDate}</div>
            <h3>Role/Position offered</h3>
            <div className={"text"}>{data[key].examRole}</div>
            <h3>Official Website Link</h3>
            <div className={"text"}>Follow this <a href={data[key].examUrl} target="_blank">Link</a></div>
            <h3>Syllabus</h3>
            <div className={"text"}>
              {data[key].examSyllabus}
              <br></br>
              <a href={data[key].examSyllabusUrl} target="_blank">
              <label style={{"fontSize":"1.2rem"}} className="linkSyllabus">To know more </label>
              </a>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className={"resourceContainer"}>
      <h2>Best Youtube Channel</h2>
      <div className={"channel"}>
        {
          data[key].examVideoLinks.map((obj)=>(
            <div>
              <a href={obj.url} target="_blank">
                <img src={obj.img} alt=""></img>
              </a>
              <span className={"header"}>{obj.name}</span>
              <span clasNames={"info"}>Guns and roses Sweet Child of Mine</span>
            </div>
          ))
        }
      </div>
      <h2>Best Resouces Channel</h2>
      <div className={"resources"}>
        {
          data[key].examResources.map((obj)=>(
            <div className={"resourceCard"}>
              <a href={obj.url} target="_blank">
                <img src={obj.img} alt=""></img>
              </a>
              <span className={"header"}>{obj.name}</span>
              <span className={"info"}>Start practicing by solving questions</span>
            </div>
          ))
        }
      </div>
    </div>
    </div>
  );
};
export default ExamHeader;
