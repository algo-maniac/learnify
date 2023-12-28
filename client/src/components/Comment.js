const Comment = (props) => {
  return (
    <>
      <div className="commentDetail">
        <span style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "0.75rem"
        }}>
          <b style={{ fontSize: "1.25rem" }}>
            {props.val.name}
          </b>
          commented on {props.val.date}
        </span>
      </div>
      <div>
        <span
          className="commentData"
          style={{
            fontSize: "1.25rem"
          }}
        >
          {props.val.comment}
        </span>
      </div>
    </>
  );
};

export default Comment;
