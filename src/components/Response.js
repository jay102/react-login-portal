import React from 'react';
const Response = (props) => {
  return (
    <div className={`alert ${props.type}`} role="alert" style={{ margin: "20px" }}>
      {props.message}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" onClick={props.clear}>&times;</span>
      </button>
    </div>
  );
}

export default Response;