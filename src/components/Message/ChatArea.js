import { Box, Button, LinearProgress, Modal, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { getDownloadURL, getStorage, ref as sref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ChatArea = () => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();


  const user = useSelector((state) => state.activeChat.active);

  const [isactive, setIsActive] = useState(true);
  const [msg, setMsg] = useState("");
  const [msglist, setMsglist] = useState([]);
  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)

  const handlemsg = (e) => {
    setMsg(e.target.value);
  };

  const msgSubmit = () => {
    if (msg !== "") {
      if (user.status == "group") {
        console.log("this is group");
      } else {
        set(push(ref(db, "singlemsg")), {
          whosnedid: auth.currentUser.uid,
          whosnedname: auth.currentUser.displayName,
          whoreceivename: user.name,
          whoreceive: user.id,
          msg: msg,
        }).then(() => {
          setMsg("")
        });
      }
    }
  };

  useEffect(() => {
    onValue(ref(db, "singlemsg"), (snapshot) => {
      let msgarr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whosnedid == auth.currentUser.uid &&
            item.val().whoreceive == user.id) ||
          (item.val().whosnedid == user.id &&
            item.val().whoreceive == auth.currentUser.uid)
        )
          msgarr.push(item.val());
      });
      setMsglist(msgarr);
    });
  }, [user.id]);

  const handleSingleImageUpload = (e) => {
    setFile(e.target.files[0]);
    
  };


  const handleUploadSingleImage = () => {
    const singleImageRef = sref(storage, 'singleimage/' + file.name);
    const uploadTask = uploadBytesResumable(singleImageRef, file);

    uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setProgress(progress)
    
  }, 
  (error) => {
    console.log(error);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      if (file !== "") {
        if (user.status == "group") {
          console.log("this is group");
        } else {
          set(push(ref(db, "singlemsg")), {
            whosnedid: auth.currentUser.uid,
            whosnedname: auth.currentUser.displayName,
            whoreceivename: user.name,
            whoreceive: user.id,
            img: downloadURL,
          })
          .then(() => {
            setMsg("")
            handleClose(false)
          });
        }
      }
    });
  }
);
  }

  return (
    <>
      <div className="group_request chatarea">
        <div className="group_ttl">
          <div className="chatHead">
            <div className="group_img">
              <img
                src="https://media.istockphoto.com/photos/multiracial-group-of-young-people-standing-in-circle-and-smiling-at-picture-id1319947526?b=1&k=20&m=1319947526&s=170667a&w=0&h=o8mdog0xAEcBVsBnN_7PAexLqS7Q_pfybeBGx-TaB54="
                alt=""
              />
              <div className="activeStatus">
                <span>
                  {isactive ? (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="7.5"
                        cy="7.5"
                        r="6.5"
                        fill="#00FF75"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="7.5"
                        cy="7.5"
                        r="6.5"
                        fill="#000"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <div>
              <h2>{user.name}</h2>
              {isactive ? <p>Online</p> : <p>Ofline</p>}
            </div>
          </div>
          <BsThreeDotsVertical />
        </div>

        <div className="ChatBody">
          {msglist.map((item, index) =>
            item.whosnedid === auth.currentUser.uid ? (
              item.msg ?
              <div key={index} className="msg right">
                <p className="text">{item.msg}</p>
                <p className="date">20.10.2022</p>
              </div>
              :
              <div key={index} className="msg right">
                <div className="img">
                  <img className="img-fluid w-100" src={item.img} alt="" /></div>
                <p className="date">20.10.2022</p>
              </div>
            ) : (
              item.msg ?
              <div key={index} className="msg left">
                <p className="text">{item.msg}</p>
                <p className="date">20.10.2022</p>
              </div>
              :
              <div key={index} className="msg left">
              <div className="img"><img className="img-fluid w-100" src={item.img} alt="" /></div>
              <p className="date">20.10.2022</p>
            </div>
            )
          )}
        </div>
        <div className="ChatFooter">
          <div className="msginput">
            <input
              type="text"
              onChange={handlemsg}
              className="text"
              placeholder=""
              value={msg}
            />
            <span className="msgcamera" onClick={handleOpen}>
              <svg
                width="20"
                height="15"
                viewBox="0 0 20 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.2368 1.36364H18.4091L19.0909 2.04545V14.3182L18.4091 15H0.681818L0 14.3182V2.04545L0.681818 1.36364H5.85409L7.01727 0.199091L7.5 0H11.5909L12.0736 0.199091L13.2368 1.36364ZM1.36364 13.6364H17.7273V2.72727H12.9545L12.4718 2.52818L11.3086 1.36364H7.78227L6.61909 2.52818L6.13636 2.72727H1.36364V13.6364ZM3.40909 4.09091C3.22826 4.09091 3.05484 4.16274 2.92697 4.29061C2.79911 4.41847 2.72727 4.5919 2.72727 4.77273C2.72727 4.95356 2.79911 5.12698 2.92697 5.25485C3.05484 5.38271 3.22826 5.45455 3.40909 5.45455C3.58992 5.45455 3.76334 5.38271 3.89121 5.25485C4.01907 5.12698 4.09091 4.95356 4.09091 4.77273C4.09091 4.5919 4.01907 4.41847 3.89121 4.29061C3.76334 4.16274 3.58992 4.09091 3.40909 4.09091ZM9.54545 5.45455C10.2688 5.45455 10.9625 5.74188 11.4739 6.25335C11.9854 6.76481 12.2727 7.4585 12.2727 8.18182C12.2727 8.90514 11.9854 9.59883 11.4739 10.1103C10.9625 10.6218 10.2688 10.9091 9.54545 10.9091C8.82214 10.9091 8.12844 10.6218 7.61698 10.1103C7.10552 9.59883 6.81818 8.90514 6.81818 8.18182C6.81818 7.4585 7.10552 6.76481 7.61698 6.25335C8.12844 5.74188 8.82214 5.45455 9.54545 5.45455ZM9.54545 4.09091C8.46048 4.09091 7.41994 4.52191 6.65275 5.28911C5.88555 6.0563 5.45455 7.09684 5.45455 8.18182C5.45455 9.2668 5.88555 10.3073 6.65275 11.0745C7.41994 11.8417 8.46048 12.2727 9.54545 12.2727C10.6304 12.2727 11.671 11.8417 12.4382 11.0745C13.2054 10.3073 13.6364 9.2668 13.6364 8.18182C13.6364 7.09684 13.2054 6.0563 12.4382 5.28911C11.671 4.52191 10.6304 4.09091 9.54545 4.09091Z"
                  fill="black"
                  fill-opacity="0.5"
                />
              </svg>
            </span>
          </div>
          <button onClick={msgSubmit}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_227)">
                <path
                  d="M13.9453 0.0937652L0.366161 7.92775C-0.164113 8.23244 -0.0967301 8.97072 0.430614 9.19337L3.54487 10.5L11.9619 3.08205C12.123 2.93849 12.3515 3.15822 12.2138 3.32521L5.1562 11.9238V14.2822C5.1562 14.9736 5.99116 15.2461 6.40132 14.7451L8.26167 12.4805L11.9121 14.0098C12.3281 14.1856 12.8027 13.9248 12.8789 13.4766L14.9882 0.820328C15.0878 0.228531 14.4521 -0.199204 13.9453 0.0937652Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_227">
                  <rect width="15" height="15" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      {/* camera popup */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Your Image
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input className="mb-3"
              type="file"
              onChange={handleSingleImageUpload}
            />
            <LinearProgress value={progress}  variant="determinate" className="mb-3"/>
            <Button onClick={handleUploadSingleImage} variant="contained" color="success">
              Upload
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ChatArea;
