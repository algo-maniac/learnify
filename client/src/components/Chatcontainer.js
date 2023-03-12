import './Chatcontainer.css'
import Posts from './Post.js'
import Sender from './Sender'
const Chatcontainer=()=>{
    return (
        <div className="chatContainer">
            <div className='chatHeader'><h3>Having a Doubt? Don't Hesitate to ask</h3></div>
            <Posts/>
            <Sender/>
        </div>
    )
}
export default Chatcontainer