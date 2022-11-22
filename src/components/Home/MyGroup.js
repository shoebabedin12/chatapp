import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

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

const MyGroup = () => {
  // firebase
  const auth = getAuth();
  const db = getDatabase();
  const [groupList, setGroupList] = useState([]);
  const [groupReqList, setGroupReqList] = useState([]);

  // modal
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (info) => {
    setOpen(true)
    const starCountRef = ref(db, "JoinGroup");
      onValue(starCountRef, (snapshot) => {
        const arr = [];
        snapshot.forEach((item) => {
          if(item.val().groupId === info.key){
            let joingroup = {
              adminId: item.val().adminId,
              groupId: item.val().groupId,
              userId: item.val().userId,
              userName: item.val().userName,
              key: item.key,
            }
            arr.push(joingroup);
            console.log(item.val().groupId);
            
          }
        });
        setGroupReqList(arr);
      });
  };

  // group data fetch from database
  useEffect(() => {
    const starCountRef = ref(db, "CreateGroup");
    onValue(starCountRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        let grouplistfetch ={
          key: item.key,
          adminname: item.val().AdminName,
          adminid: item.val().Adminid,
          groupname: item.val().GroupName,
          grouptaglist: item.val().GroupTagList,
        }
        arr.push(grouplistfetch);
      });
      setGroupList(arr);
    });
  }, []);


  const handleAccept = (memberinfo) => {
    console.log("memberinfo", memberinfo)
    set(push(ref(db, "groupmember")), {
      gid: memberinfo.groupId,
      adminid: memberinfo.adminId,
      userid: memberinfo.userId,
      username: memberinfo.userName,
      key: memberinfo.key,
    }).then(() => {
      remove(ref(db, "JoinGroup/" + memberinfo.key))
    })
  };
  
  const handleReject = (info) => {
    remove(ref(db, "JoinGroup/" + info.key))
  };

  return (
    <div>
      <div className="group_request friends">
        <div className="group_ttl">
          <h2>My Group</h2>
          <BsThreeDotsVertical className="three_dot" />
        </div>
        <div className="scroll">
          {groupList.map(
            (item, index) =>
              item.adminid == auth.currentUser.uid && (
                <div key={index} className="group_item">
                  <div className="group_img">
                    <img
                      src="https://media.istockphoto.com/photos/multiracial-group-of-young-people-standing-in-circle-and-smiling-at-picture-id1319947526?b=1&k=20&m=1319947526&s=170667a&w=0&h=o8mdog0xAEcBVsBnN_7PAexLqS7Q_pfybeBGx-TaB54="
                      alt=""
                    />
                  </div>
                  <div className="group_title">
                    <h4>{item.groupname}</h4>
                    <p>{item.grouptaglist}</p>
                  </div>
                  <div className="group_btn">
                    <button onClick={() => handleOpen(item)}>INfo</button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Group Request List
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="container">
              <div className="row">
                {groupReqList.map((item, index) => 
                  item.adminId === auth.currentUser.uid &&
                  <>
                    <div key={index} className="col-md-2">
                      <img
                        className="img-fluid"
                        src="https://media.istockphoto.com/photos/multiracial-group-of-young-people-standing-in-circle-and-smiling-at-picture-id1319947526?b=1&k=20&m=1319947526&s=170667a&w=0&h=o8mdog0xAEcBVsBnN_7PAexLqS7Q_pfybeBGx-TaB54="
                        alt=""
                      />
                    </div>
                    <div className="col-md-10">
                      <h4>{item.userName}</h4>
                      <div className="d-flex">
                        <button onClick={() => handleAccept(item)}>Accept</button>
                        <button onClick={() => handleReject(item)}>Reject</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default MyGroup;
