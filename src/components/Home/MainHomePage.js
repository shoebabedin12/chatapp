import SideNav from "../SideNav/SideNav";
import FriendReq from "./FriendReq";
import Friends from "./Friends";
import GroupReq from "./GroupReq";
import UserList from "./UserList";

const MainHomePage = (props) => {
    
  return (
    <div className="container-fluid my-2">
      <div className="row">
        <div className="col-md-2">
          <SideNav active="home" user={props.user}/>
        </div>
        <div className="col-md-4">
         <form action="">
          <div className="form-group">
            <input type="text" name="" id="" />
          </div>
         </form>
         <GroupReq/>
         <FriendReq/>
        </div>
        <div className="col-md-3">
          <Friends/>
        </div>
        <div className="col-md-3">
          <UserList/>
        </div>
      </div>
    </div>
  );
};

export default MainHomePage;
