import React from 'react'
import './App.css';
import HomepageTeacher from './components/HomepageTeacher';
import LiveStream from './components/LiveStream';
import TeacherForum from './components/TeacherForum'
import Navbar from './components/Navbar';
import { BrowserRouter as Router} from 'react-router-dom'
import { Routes, Route, Link } from 'react-router-dom'
import UploadVideo from './components/UploadVideo';

function App() {
  const [userData, setUserData] = React.useState({
    isLoggedIn: true,
    userName: "Chandrachur Mukherjee",
    img: "https://media.licdn.com/dms/image/D4D03AQE1L_29dsHJ3g/profile-displayphoto-shrink_800_800/0/1670253835119?e=1683763200&v=beta&t=tm54rixg2PoYWK7ya5FH6xQNbYEAJY5fm40s7LBl1Xo",
    isTeacher: true,
    userID: "ab12"
  })
  return (
    <Router>
    <div className="App">
      <Navbar userData={userData}/>
      <Routes>
        <Route path="/home" element={<HomepageTeacher/ >} />
        {userData.isLoggedIn && <Route path="/live" element={<LiveStream/ >} />}
        <Route path="/uploadvideo" element={<UploadVideo data={userData}/> } />
        <Route path="/teacher/:param" element={<TeacherForum />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
