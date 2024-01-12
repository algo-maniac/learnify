import './RequestBox.css'
import Button from '@mui/material/Button'; // Assuming you're using Material-UI for Button
import Modal from '@mui/material/Modal'; // Assuming you're using Material-UI for Modal
import Box from '@mui/material/Box'; // Assuming you're using Material-UI for Box
import { Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../store/auth-context';
const RequestBox=()=>{
    const [img,setImg]=useState(false);
    const [imgUrl,setImgUrl]=useState();
    const [document,setDocument]=useState(false);
    const [data,setData]=useState([]);
    const ctx=useContext(AuthContext);
    console.log(ctx)
    const imagePopupHandler=(env)=>{
        // console.log(env.target.id)
        const id=env.target.id;
        console.log(data[id].profileImage)
        setImgUrl(data[id].profileImage)
        setDocument(false)
        setImg(true)
    }
    const disableImagePopup=()=>{
        setImg(false)
        setDocument(false)
    }
    const documentHandler=()=>{
        setImg(false);
        setDocument(true)
    }
    useEffect(() => {
        const fetchHandler = async () => {
          try {
            const result = await fetch('http://localhost:8000/admin/getpendingrequests', {
              method: 'GET',
              headers: {
                "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTE1MWFiZmJmMTQwNWY3NjIxMmE3OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNTA4ODUyOCwiZXhwIjoxNzA1MDkyMTI4fQ.iebAwYYS7iWUF0urVSnwlfVbqQWC8ym0LbKbrwPVnLk"
              }
            });
      
            if (!result.ok) {
              throw new Error("Network response was not ok");
            }
      
            const data = await result.json();
            setData(data.pendingInstructors)
            console.log(data)
          } catch (error) {
            console.error("Error occurred:");
          }
        };
      
        fetchHandler();
    }, []);
    const getTime=(data)=>{
        const dateObject = new Date(data);
        const hours = dateObject.getUTCHours();
        const minutes = dateObject.getUTCMinutes();
        var time="";
        let period = hours >= 12 ? "PM" : "AM";
        time+=`${hours}:${minutes} ${period}`;
        return time;
    }
    const getDate=(data)=>{
        const dateObject = new Date(data);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; 
        const monthNames = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
          ];
        const day = dateObject.getDay();
        var date=""
        date+=`${day},${monthNames[month]} ${year}`;
        return date
    }
    return <>
        {img && <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box className="content" onClick={disableImagePopup}>
                {img && <Typography id="modal-modal-title" variant="h6" component="h2">
                    <img src={imgUrl}></img>
                </Typography>}
            </Box>
        </Modal>}
        {document && <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box className="content" onClick={disableImagePopup}>
                {document && <Typography id="modal-modal-title" variant="h6" component="h2">
                    <img src={imgUrl}></img>
                </Typography>}
            </Box>
        </Modal>}
        <div className='request-box'>
            <h3 className="heading">Pending Request</h3>
            <table class="content-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Image Link</th>
                    <th>Date & Time</th>
                    <th>Document</th>
                    <th>Accept</th>
                    <th>Reject</th>
                </tr>
                </thead>
                <tbody class="table-body">
                {/* <tr>
                    <td className="serial-no">1</td>
                    <td className="name">Manoj Kumar</td>
                    <td className="email">manoj69@gmail.com</td>
                    <td className='img-link' onClick={imagePopupHandler}>Image-Link</td>
                    <td className="timestamp">11:10am<br></br>11 Jan,2024</td>
                    <td className="link" onClick={documentHandler}>Attachment</td>
                    <td><button className="button-41" role="button">Accept</button></td>
                    <td><button className="button-24" role="button">Reject</button></td>
                </tr> */}
                {data.length > 0 && data.map((item,index) => (
                    <tr key={item.id}>
                        <td className="serial-no">{index+1}</td>
                        <td className="name">{item.username}</td>
                        <td className="email">{item.email}</td>
                        <td className='img-link' id={index} onClick={imagePopupHandler}>Image-Link</td>
                        <td className="timestamp">{getTime(item.createdAt)}<br></br>{getDate(item.createdAt)}</td>
                        <td className="link" id={index} onClick={documentHandler}>Attachment</td>
                        <td><button className="button-41" role="button">Accept</button></td>
                        <td><button className="button-24" role="button">Reject</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </>
}
export default RequestBox