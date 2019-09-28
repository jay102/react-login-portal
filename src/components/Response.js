import React from 'react';
const Response = (props) => {
  return (
    <div className={`alert ${props.type}`} role="alert" style={{ margin: "20px" }}>
      {props.message}
    </div>
  );
}

export default Response;