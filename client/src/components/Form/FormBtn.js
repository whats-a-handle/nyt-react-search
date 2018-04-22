import React from "react";

export const FormBtn = props =>
  <button 
  {...props}
  onClick={()=>props.onClick(props.title, props.author, props.synopsis)} 
  style={{ float: "right", marginBottom: 10 }} 
  className="btn btn-success">

    {props.children}

  </button>;
