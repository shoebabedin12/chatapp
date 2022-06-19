import { AiFillHome, AiOutlineSetting } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./SideNav.css";
const SideNav = (props) => {
  return (
    <div className="sidenav">
      <div className="profileImg">
        <img src={props.user.photoURL} alt={props.user.displayName} />
        <p>{props.user.displayName}</p>
      </div>
      
      <ul className="sideNavUl">
      
        <li className="active">
          <a href="#">
            <AiFillHome />
          </a>
        </li>
        <li>
          <a href="">
            <BsChatDotsFill />
          </a>
        </li>
        <li>
          <a href="">
            <IoMdNotificationsOutline />
          </a>
        </li>
        <li>
          <a href="">
            <AiOutlineSetting />
          </a>
        </li>
      </ul>
      <button className="logOut">
        <ImExit />
      </button>
    </div>
  );
};

export default SideNav;
