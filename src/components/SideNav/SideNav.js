import { PhotoCamera } from "@mui/icons-material";
import { Backdrop, Fade, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "cropperjs/dist/cropper.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Cropper } from "react-cropper";
import { AiFillEdit, AiFillHome, AiOutlineCloudUpload, AiOutlineSetting } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
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
  const {profile} = props;
  const auth = getAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [time, setTime] = useState();
  const [id, setID] = useState();
  const [pic, setPic] = useState(profile);

  
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();




   let handleSignout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.');
    }).catch((error) => {
      // An error happened.
      console.log('signout hoini');
    });
   }

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setName(user.displayName)
      setEmail(user.email)
      setTime(user.metadata.creationTime)
      setID(user.uid)
    }
  });
},[]);


const handleProfileChnage = (e) => {
console.log(e.target.files[0]);
e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPic(reader.result);
    };
    reader.readAsDataURL(files[0]);

}



  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };


   
  return (
    <div className="sidenav">
      <div className="profileImg text-center">
        <div className="UserProfile">
          <img src={pic} alt={props.displayName} />
          <div className="uploadPic" onClick={handleOpen2}>
          <AiOutlineCloudUpload/>
          </div>
        </div>
        <p>{name}
          <span className="ms-1 cursor" onClick={handleOpen}>
          <AiFillEdit/>
          </span>
        </p>

        {/* user info modal */}
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
              <h2>Account Info</h2>
            <div className="d-flex align-items-center gap-3">
              <div className="img">
          <img src={pic} alt={props.displayName} />
              </div>
              <div className="name">
              <h2>{name}</h2>
              </div>
            </div>
            
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <p><b>Your ID:</b> {id}</p>
              <p><b>Your Email:</b> {email}</p>
              <p><b>Your Created Date:</b> {time}</p>
            </Typography>
          </Box>
        </Fade>
      </Modal>


      {/* image chagne modal */}
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open2}>
          <Box sx={style} className="modalProfile">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <h2>Account Info</h2>
            <div className="d-flex align-items-center gap-3">
              <div className="img">
          <img src={pic} alt={props.displayName} />
              </div>
              <div className="name">
              <h2>{name}</h2>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handleProfileChnage}/>
                <PhotoCamera />
              </IconButton>


             
              </div>
            </div>
            
            <div style={{ width: '300px' }}>
            <Cropper
          style={{ height: 200, width: "50%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={pic}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />


<div style={{ width: "100px" }}>
        <div className="box" style={{ width: "100px" }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{width: "100px", height: "100px" }}
          />
        </div>
        <div
          className="box"
          style={{height: "100px" }}
        >
          <h1>
            <span>Crop</span>
            <button onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: "100px" }} src={cropData} alt="cropped" />
        </div>
      </div>
            </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      </div>
      
      <ul className="sideNavUl">
      
        <li className={props.active === "home" && "active"}>
          <Link to="/home">
            <AiFillHome />
          </Link>
        </li>
        <li className={props.active === "chat" && "active"}>
          <Link to="/chat">
            <BsChatDotsFill />
          </Link>
        </li>
        <li className={props.active === "notification" && "active"}>
          <Link to="#">
            <IoMdNotificationsOutline />
          </Link>
        </li>
        <li className={props.active === "setting" && "active"}>
          <Link to="#">
            <AiOutlineSetting />
          </Link>
        </li>
      </ul>
      <button className="logOut" onClick={handleSignout}>
        <ImExit />
      </button>
    </div>
  );
};

export default SideNav;
