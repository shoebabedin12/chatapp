import { Alert } from "@mui/material";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { BiBlock } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { activeChat } from "../../slice/activeChatSlice";

const Friends = () => {
  const db = getDatabase();
  const auth = getAuth();
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);
  let [emptyMsg, setEmptyMsg] = useState("");
  let location = useLocation();

  console.log("location", location.pathname);

  useEffect(() => {
    const friendRef = ref(db, "friend/");
    onValue(friendRef, (snapshot) => {
      const friendArr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid === item.val().senderid ||
          auth.currentUser.uid === item.val().receiverid
        ) {
          friendArr.push({
            id: item.key,
            receiverid: item.val().receiverid,
            receiverName: item.val().receiverName,
            senderid: item.val().senderid,
            senderName: item.val().senderName,
            date: item.val().date,
          });
        }
      });
      setFriends(friendArr);
      setEmptyMsg("You have no friend");
    });
  }, []);

  const handleChat = (item) => {
    let userInfo = {};
    if (item.receiverid === auth.currentUser.uid) {
      userInfo.status = "single";
      userInfo.id = item.senderid;
      userInfo.name = item.senderName;
    } else {
      userInfo.status = "single";
      userInfo.id = item.receiverid;
      userInfo.name = item.receiverName;
    }
    dispatch(activeChat(userInfo));
  };


  const handleBlock = (info) => {
    console.log('info', info);
    set(push(ref(db, 'blockuser/')), {
      id: info.id,
      blockedusername: info.senderName,
      blockeduserid: info.senderid,
      blockbyname: info.receiverName,
      blcokbyid: info.receiverid,
    })
    .then((
      remove(ref(db, "friend/" + info.id))
    ))
  }

  return (
    <div>
      <div className="group_request friends">
        <div className="group_ttl">
          <h2>
            {friends.length > 1 ? "Friends" : "Friend"} - ({friends.length})
          </h2>
          <BsThreeDotsVertical />
        </div>
        {friends.length === 0 && <Alert severity="info">{emptyMsg}</Alert>}
        {friends.map((item, index) => (
          <div key={index} className="group_item">
            <div className="group_img">
              <img
                src="https://media.istockphoto.com/photos/multiracial-group-of-young-people-standing-in-circle-and-smiling-at-picture-id1319947526?b=1&k=20&m=1319947526&s=170667a&w=0&h=o8mdog0xAEcBVsBnN_7PAexLqS7Q_pfybeBGx-TaB54="
                alt=""
              />
            </div>
            <div className="group_title">
              {auth.currentUser.uid == item.senderid ? (
                <h4>{item.receiverName} </h4>
              ) : (
                <h4>{item.senderName} </h4>
              )}

              <p>Hi Guys, Wassup!</p>
            </div>
            <div className="group_btn">
              <p>{item.date}</p>
            </div>
            <div className="group_btn d-flex align-middle justify-content-center">
              {location.pathname === "/chat" ? (
                <button onClick={() => handleChat(item)}>chat</button>
              ) : (
                <button onClick={() => handleBlock(item)}>
                  <BiBlock />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
