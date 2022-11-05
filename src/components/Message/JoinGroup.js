import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { activeChat } from "../../slice/activeChatSlice";

const JoinGroup = () => {
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch();
  const [groupList, setGroupList] = useState([]);

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
                <button onClick={() =>  handleGroupChat(item)}>Chat</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinGroup;
