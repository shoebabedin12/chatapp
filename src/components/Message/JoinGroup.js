import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { activeChat } from "../../slice/activeChatSlice";


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

const JoinGroup = () => {
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch();
  const [groupList, setGroupList] = useState([]);
  const [groupReqList, setGroupReqList] = useState([]);

  // modal
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  
  const handleOpen = (info) => {
    console.log(info.key);
    setOpen(true)
    const starCountRef = ref(db, "groupmember");
      onValue(starCountRef, (snapshot) => {
        const arr = [];
        snapshot.forEach((item) => {
          if(item.val().gid === info.key){
            let joingroup = {
            adminId: item.val().adminid,
            groupId: item.val().gid,
            userId: item.val().userid,
            userName: item.val().username,
            oldkey: item.val().key,
            key: item.key
          }
          arr.push(joingroup);
          }
        });
        setGroupReqList(arr);
      });
  };

  useEffect(() => {
    const starCountRef = ref(db, "CreateGroup");
    onValue(starCountRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        let groupInfo = {
          adminID: item.val().Adminid,
          adminName: item.val().AdminName,
          groupName: item.val().GroupName,
          groupTagLine: item.val().GroupTagList,
          key: item.key,
        };
        arr.push(groupInfo);
      });
      setGroupList(arr);
    });
  }, []);

  const handleGroupChat = (item) => {
    let userInfo = {
      status: 'group',
      name: item.groupName,
      groupid: item.key,
      groupadminid: item.adminID
    };
    console.log("group area", userInfo);
    dispatch(activeChat(userInfo));
  };


  console.log(groupReqList)

  return (
    <div className="group_request">
      <div className="group_ttl">
        <h2>Chat Group List</h2>
      </div>

      <div className="scroll">
        {groupList.map((item, index) => (
          <div
            key={index}
            className="group_item d-flex align-middle justify-content-between"
          >
            <div className="d-flex align-middle gap-3">
              <div className="group_img">
                <img
                  src="https://media.istockphoto.com/photos/multiracial-group-of-young-people-standing-in-circle-and-smiling-at-picture-id1319947526?b=1&k=20&m=1319947526&s=170667a&w=0&h=o8mdog0xAEcBVsBnN_7PAexLqS7Q_pfybeBGx-TaB54="
                  alt=""
                />
              </div>
              <div className="group_title">
                <h4>{item.groupName}</h4>
                <p>{item.adminID !== auth.currentUser.uid ? item.groupTagLine : "Your Group"}</p>
              </div>
            </div>
            <div className="group_btn">
                <button onClick={() =>  handleOpen(item)}>Info</button>
                <button onClick={() =>  handleGroupChat(item)}>Chat</button>
            </div>
          </div>
        ))}
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

export default JoinGroup;
