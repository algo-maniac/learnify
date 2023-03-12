import { useEffect, useState } from "react";
import "./Post.css";
import SinglePost from "./SinglePost";
const Posts = () => {
  const [data, setData] = useState([]);
  const [loader,setLoader]=useState(true);
  useEffect(() => {
    fetch("http://localhost:8001/doubt", {
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
        loader && <p>Loading Wait for the Respense</p>
      }
      {
        data.map((obj,key)=>(
          <SinglePost key={key} data={obj}></SinglePost>
        ))
      }
    </div>);
};
export default Posts;
