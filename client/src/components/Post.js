import { useEffect, useState } from "react";
import "./Post.css";
import SinglePost from "./SinglePost";
import Loader from './Loader'
const Posts = (props) => {
  const [data, setData] = useState([]);
  const [loader,setLoader]=useState(true);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/doubt`, {
      method: 'GET',
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setData(data.data);
        setLoader(false);
      })
      .catch(
        (er) => {
          console.log(er);
        },
      );
    },[props.flag]);
  return (
    <div className="postBox">
      {
        loader && <Loader/>
      }
      {
        data.map((obj,key)=>(
          <SinglePost key={key} data={obj}></SinglePost>
        ))
      }
    </div>);
};
export default Posts;
