import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import './ExamCorner.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import detail from './examdata.json';
const ExamHeader = () => {
  const exams=["jee","neet","ctet","nda","upsc"];
  const [data,setData]=useState(detail);
  const [key,setKey]=useState(0);
  const syllabus=[false,false,false,false,false];
  const [value, setValue] = React.useState('recents');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
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
    <div className='outer'>
      <div className={"exam-container"}>
        


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
                <br></br>
                <a href="" target="_blank">
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
                <span clasNames={"info"}>Best youtube channel Link above</span>
              </div>
            ))
          }
        </div>
        <h2>Best Resouces Channel</h2>
        <div className={"resources"}>
        <Card sx={{ maxWidth: 245 }}>
          <CardMedia
            sx={{ height:140  }}
            image="/profile-13.png"
          />
          <CardContent className='notes-content'>
            <Typography variant="h6" component="div" className='notes-header'>
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
        </div>
      </div>
      </div>

    </div>
  );
};
export default ExamHeader;
