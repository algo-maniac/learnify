import { useEffect, useState } from "react";
import "./Post.css";
import SinglePost from "./SinglePost";
import Loader from './Loader'
const Posts = () => {
  const [data, setData] = useState([]);
  const [loader,setLoader]=useState(true);
  useEffect(() => {
    fetch("http://localhost:8000/doubt", {
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
    },[]);
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
