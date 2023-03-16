import Sidebar2 from "./Sidebar2";
import "./Sidebar2.css";
import Chatcontainer from "./Chatcontainer";
function Doubt() {
  return (
    <div
      className="container"
      style={{
        margin: "auto auto",
        border: "5px solid black",
        marginTop: "10px",
        borderRadius: "10px",
        boxShadow: "2px 7px 29px 4px rgba(0, 0, 0, 0.75)",
      }}
    >
      <Chatcontainer></Chatcontainer>
    </div>
  );
}

export default Doubt;
