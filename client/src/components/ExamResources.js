import "./ExamCorner.css";
const ExamResources = () => {
  return(<>
    <div className={"resourceContainer"}>
      <h2>Best Youtube Channel</h2>
      <div className={"channel"}>
        <div>
          <img src={"/profile-10.jpeg"} alt=""></img>
          <span className={"header"}>Physics Wallah</span>
          <span clasNames={"info"}>Guns and roses Sweet Child of Mine</span>
        </div>
        <div>
          <img src={"/profile-11.jpeg"} alt=""></img>
          <span className={"header"}>Unacademy</span>
          <span className={"info"}>Guns and roses Sweet Child of Mine</span>
        </div>
      </div>
      <h2>Best Resouces Channel</h2>
      <div className={"resources"}>
        <div>
          <img src={"/profile-12.jpeg"} alt=""></img>
          <span className={"header"}>Previous Year Paper</span>
          <span className={"info"}>Guns and roses Sweet Child of Mine</span>
        </div>
        <div>
          <img src={"/profile-13.png"} alt=""></img>
          <span className={"header"}>Handwritten Notes</span>
          <span className={"info"}>Guns and roses Sweet Child of Mine</span>
        </div>
      </div>
    </div>
  </>
  )
};
export default ExamResources;
