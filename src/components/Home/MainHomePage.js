import { useState } from "react";
import SideNav from "../SideNav/SideNav";
import profile from "./../../assets/images/profile.png";
import BlockUser from "./BlockUser";
import FriendReq from "./FriendReq";
import Friends from "./Friends";
import GroupReq from "./GroupReq";
import MyGroup from "./MyGroup";
import UserList from "./UserList";

const MainHomePage = (props) => {
  const [bgChagne, setBgChange] = useState(false);

  const handleSwitch = () => {
    setBgChange(!bgChagne)

  }
    
  return (
    <div className={`container-fluid ${bgChagne && 'bg-black night'}`}>
      
      <div className="row">
        <div className="col-md-2">
        <div onClick={handleSwitch} className={`switch ${bgChagne && 'black'}`}>
        <button className={`switch_border ${bgChagne && 'bg-black'}`}>
          <div className={`switch_dot ${bgChagne && 'bg-white'}`} ></div>
        </button>
      </div>
          <SideNav active="home" user={props.user} profile={profile}/>
        </div>
        <div className="col-md-4">
         <GroupReq>
         <form action="">
          <div className="form-group">
            <input className="form-control" type="text" name="" id="" placeholder="Search your group"/>
          </div>
         </form>

         </GroupReq>
         <FriendReq/>
        </div>
        <div className="col-md-3">
          <Friends/>
          <MyGroup/>
        </div>
        <div className="col-md-3">
          <UserList/>
          <BlockUser/>
        </div>
      </div>
    </div>
  );
};

export default MainHomePage;
