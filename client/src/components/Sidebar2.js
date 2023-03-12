import { Link } from "react-router-dom"
import Websitetitle from "./Websitetitle"

const Sidebar=()=>{
    return (
        <div className="sideBar">
            <div className="menuList">
                <div><i class="fa fa-link" aria-hidden="true"></i>Links</div>
                <div><i class="fa-solid fa-image"></i>Photos</div>
            </div>
            <Websitetitle/>
        </div>
    )
}
export default Sidebar