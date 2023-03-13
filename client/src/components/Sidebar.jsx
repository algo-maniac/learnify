import React from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';


function Sidebar(props) {
    const { id } = props;

    const navigate = useNavigate();

    const goLive = () => {
      navigate("/live/?roomID=" + id + "&role=Host");
    }

    const uploadVideo = () => {
        navigate("/uploadvideo");
    }

  return (
    <div className="navigation">
        <button className="navbar_option" onClick={goLive}>Go Live</button>
        <button className="navbar_option" onClick={uploadVideo}>Upload Lecture</button>
    </div>
  )
}

export default Sidebar