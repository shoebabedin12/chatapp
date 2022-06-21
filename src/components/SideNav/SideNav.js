import { Backdrop, Fade, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { AiFillEdit, AiFillHome, AiOutlineSetting } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./SideNav.css";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const SideNav = (props) => {

  const auth = getAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



   let handleSignout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.');
    }).catch((error) => {
      // An error happened.
      console.log('signout hoini');
    });
   }

   
  return (
    <div className="sidenav">
      <div className="profileImg">
        <img src={props.user.photoURL} alt={props.user.displayName} />
        <p>{props.user.displayName}
          <span className="ms-1 cursor" onClick={handleOpen}>
          <AiFillEdit/>
          </span>
        </p>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="modalProfile">
            <Typography id="transition-modal-title" variant="h6" component="h2">
            <div className="d-flex align-items-center gap-3">
              <div className="img">
                <img src={props.user.photoURL} alt={props.user.displayName} />
              </div>
              <div className="name">
              <h2>{props.user.displayName}</h2>
              <p>Stay home stay safe</p>
              </div>
            </div>
            
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
      </div>
      
      <ul className="sideNavUl">
      
        <li className={props.active == "home" && "active"}>
          <a href="#">
            <AiFillHome />
          </a>
        </li>
        <li className={props.active == "chat" && "active"}>
          <a href="">
            <BsChatDotsFill />
          </a>
        </li>
        <li className={props.active == "notification" && "active"}>
          <a href="">
            <IoMdNotificationsOutline />
          </a>
        </li>
        <li className={props.active == "setting" && "active"}>
          <a href="">
            <AiOutlineSetting />
          </a>
        </li>
      </ul>
      <button className="logOut" onClick={handleSignout}>
        <ImExit />
      </button>
    </div>
  );
};

export default SideNav;
