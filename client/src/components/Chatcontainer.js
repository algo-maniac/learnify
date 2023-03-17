import { useContext } from 'react'
import AuthContext from '../store/auth-context'
import React from "react"
import './Chatcontainer.css'
import Posts from './Post.js'
import Sender from './Sender'
const Chatcontainer=()=>{
    const ctx=useContext(AuthContext);
    console.log('ctx',ctx);
    const [flag, setFlag] = React.useState(false)
    return (
        <div className="chatContainer">
            <div className='chatHeader'><h3>Having a Doubt? Don't Hesitate to ask</h3></div>
            <Posts flag={flag} setFlag={setFlag}/>
            <Sender flag={flag} setFlag={setFlag}/>
        </div>
    )
}
export default Chatcontainer