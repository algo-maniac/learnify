import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import './ExamCorner.css'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import detail from './examdata.json';
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '43%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p:1
};
const ExamHeader = () => {
  const exams=["jee","neet","ctet","nda","upsc"];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const [data,setData]=useState(detail);
  const [key,setKey]=useState(0);
  const syllabus=[false,false,false,false,false];
  const [age, setAge] = React.useState(10);
  const handleChange = (event) => {
    setAge(event.target.value);
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

  },[value])
  const [youtube,setYoutube]=useState([]);
  useEffect(()=>{
    const fetchHandler=async()=>{
      console.log(value)
      try{
        const res=await fetch(`http://localhost:3000/instructor/youtube/${value}`,{
          method:"GET",
        })
        const data=await res.json();
        setYoutube(data.data)
        console.log(data)
      }catch(er){
        console.log("Error occured")
      }
    }
    fetchHandler();
  },[value])
  const [channelname,setChannelName]=useState('');
  const [channellink,setChannelLink]=useState('');
  const [channelImgurl,setChannelImgurl]=useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const uploadHandler=async()=>{
    if(age===10){
      try{
        const response=await fetch("http://localhost:3000/instructor/youtube",{
            method:'POST',
            headers:{
              'Content-type':'application/json'
            },
            body:JSON.stringify({channelname:channelname,channellink:channellink,channelImgurl:channelImgurl,username:"inst",category:value})
          })
          const data=await response.json();
          console.log(data)
      }
      catch(er){
        console.log("Error occured",er)
      }
    }
  }
  return (
    <div className='outer'>
      <div className={"exam-container"}>
        <div className='header-icons'>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          className='icons'
        >
          <BottomNavigationAction label="JEE" />
          <BottomNavigationAction label="NEET" />
          <BottomNavigationAction label="CTET"  />
          <BottomNavigationAction label="NDA" />
          <BottomNavigationAction label="UPSC" />
        </BottomNavigation>
        </div>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className='select-div'>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 190 }}>
                  <InputLabel id="demo-simple-select-standard-label">Select Resource Type:</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value={10}>Youtube Channel</MenuItem>
                    <MenuItem value={20}>PDF Material</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {age===10 && <><div className='link-div'>
                <label>Enter the Channel Name</label><br></br>
                <input onChange={(env)=>{setChannelName(env.target.value)}} placeholder='Name of the Channel'></input>
              </div>
              <div className='link-div'>
                <label>Paste the channel link</label><br></br>
                <input onChange={(env)=>{setChannelLink(env.target.value)}} placeholder='Channel link'></input>
              </div>
              <div className='link-div'>
                <label>Paste the image link</label><br></br>
                <input onChange={(env)=>{setChannelImgurl(env.target.value)}} placeholder='Image url'></input>
              </div></>}
              {age===20 && <><div className='link-div'>
                <label>Enter the Topic Name</label><br></br>
                <input placeholder='Name of the Topic'></input>
              </div>
              <div className='link-div'>
                <label>Upload file</label><br></br>
                <input type='file' className='input-file'></input>
              </div>
              </>}
              <div className='submit-btn'>
                <button class="button-26" role="button" onClick={uploadHandler}>Upload</button>
              </div>
            </Box>
          </Modal>
        </div>
        <div className={"blog-card"}>
          <input type="radio" name="select" id="tap-1" checked></input>
          <input type="checkbox" id="imgTap"></input>
          <div className={"inner-part"}>
            <label for="imgTap" class="img">
              <img className={"img-1"} alt="" src={data[value].examImg}></img>
            </label>
            <div className={"content content-1"}>
              <div className={"title"}>{data[value].examName}</div>
              <h3>Registration Date</h3>
              <div className={"text"}>{data[value].examReg}</div>
              <h3>Exam Date</h3>
              <div className={"text"}>{data[value].examDate}</div>
              <h3>Role/Position offered</h3>
              <div className={"text"}>{data[value].examRole}</div>
              <h3>Official Website Link</h3>
              <div className={"text"}>Follow this <a href={data[value].examUrl} target="_blank">Link</a></div>
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
        <div className='material-header'>
          <h2>Best Resouces Channel</h2>
          <AddIcon className='upload-btn' onClick={handleOpen}/>
        </div>
        <div className={"channel1"}>
          {
            youtube.map((obj)=>(
              <div className='cards'>
                <a href={obj.channelLink} target='_blank'>
                <div className='image'>
                  <img src={obj.imageUrl}></img>
                </div>
                <div className='text'>
                  <h6>{obj.channelname}</h6>
                  <p>Suggested by <strong>{obj.username}</strong></p>
                </div>
                </a>
              </div>
            ))
          }
        </div>
        <h2>Best resources</h2>
        <div>
    </div>
        <div className={"channel1"}>
        <div className='cards'>
          <div className='image'>
              <img src='/profile-13.png'></img>
            </div>
            <div className='text'>
              <h6>Physics Wallah</h6>
              <p>Uploaded by <strong>inst</strong> on <span className='time'>11:10am, 14 Sept, 2024</span></p>
            </div>
          </div>
        </div>
      </div>
      </div>

    </div>
  );
};
export default ExamHeader;
