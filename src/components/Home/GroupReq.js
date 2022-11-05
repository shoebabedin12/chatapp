import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const GroupReq = (props) => {
  // firebase
  const auth = getAuth();
  const db = getDatabase();


  const { children } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [tagList, setTagList] = useState("");
  const [groupList, setGroupList] = useState([]);

  // create Group
  const createGroup = () => {
    set(push(ref(db, "CreateGroup")), {
      GroupName: name,
      GroupTagList: tagList,
      Adminid: auth.currentUser.uid,
      AdminName: auth.currentUser.displayName,
    }).then(() => {
      setName("");
      setTagList("");
      setOpen(false);
    });
  };

  // group data fetch from database
  useEffect(() => {
    const arr = [];
    const starCountRef = ref(db, "CreateGroup");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        let groupInfo = {
          adminID: item.val().Adminid,
          adminName: item.val().AdminName,
          groupName: item.val().GroupName,
          groupTagLine: item.val().GroupTagList,
          key: item.key
        }
        arr.push(groupInfo);
      });
      setGroupList(arr);
    });
  }, []);

  const handleGroupRequest = (id, key) => {
    set(push(ref(db, "JoinGroup")), {
      adminId: id,
      groupId: key,
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      userProfile: auth.currentUser.photoURL,
    });    
  }

 
  
  return (
    <div>
      <div className="group_request">
        {children}
        <div className="group_ttl">
          <h2>Group List</h2>
          <Button onClick={handleOpen}>Create New Group</Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create New Group
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="mb-4">
                  <TextField
                    id="outlined-basic"
                    label="Group Name"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    id="outlined-basic"
                    label="Group Tag List"
                    variant="outlined"
                    onChange={(e) => setTagList(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <button onClick={createGroup} className="btn btn-success">
                    Create
                  </button>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>

        <div className="scroll">
          {groupList.map(
            (item, index) =>
              item.adminID !== auth.currentUser.uid && (
                <div key={index} className="group_item d-flex align-middle justify-content-between">
                  <div className="d-flex align-middle gap-3">
                    <div className="group_img">
                      <img
                        src="https://media.istockphoto.com/photos/multiracial-group-of-young-people-standing-in-circle-and-smiling-at-picture-id1319947526?b=1&k=20&m=1319947526&s=170667a&w=0&h=o8mdog0xAEcBVsBnN_7PAexLqS7Q_pfybeBGx-TaB54="
                        alt=""
                      />
                    </div>
                    <div className="group_title">
                      <h4>{item.groupName}</h4>
                      <p>{item.groupTagLine}</p>
                    </div>
                  </div>
                  <div className="group_btn">
                    <button onClick={() => handleGroupRequest(item.adminID, item.key)}>Join</button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupReq;
