import React, { useState } from "react";
import Friends from "../Home/Friends";
import SideNav from "../SideNav/SideNav";
import profile from "./../../assets/images/profile.png";
import ChatArea from "./ChatArea";
import JoinGroup from "./JoinGroup";
import "./message.css";

const Message = (props) => {
 
  const [bgChagne, setBgChange] = useState(false);

 

  const handleSwitch = () => {
    setBgChange(!bgChagne);
  };
  return (
    <div className={`container-fluid ${bgChagne && "bg-black night"}`}>
      <div className="row">
        <div className="col-md-2">
          <div
            onClick={handleSwitch}
            className={`switch ${bgChagne && "black"}`}
          >
            <button className={`switch_border ${bgChagne && "bg-black"}`}>
              <div className={`switch_dot ${bgChagne && "bg-white"}`}></div>
            </button>
          </div>
          <SideNav active="chat" user={props.user} profile={profile} />
        </div>
        <div className="col-md-4">
          <JoinGroup/>
          <Friends />
        </div>
        <div className="col-md-6">
          <ChatArea />
        </div>
      </div>
    </div>
  );
};

export default Message;
