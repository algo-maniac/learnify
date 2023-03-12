const Comment = (props) => {
    return (
      <>
        <div className="commentDetail">
          <span>
            <b>
              {props.val.name} commented on {props.val.date}
            </b>
          </span>
          <br></br>
        </div>
        <div>
          <span className="commentData">{props.val.comment}</span>
        </div>
      </>
    );
  };
  
  export default Comment;
  