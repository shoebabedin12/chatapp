import { Alert } from "@mui/material";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const FriendReq = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [friendReqList, setFriendReqList] = useState([]);
  let [emptyMsg, setEmptyMsg] = useState("");
  let [dlt, setDlt] = useState(true);

  useEffect(() => {
    const friendRequestArr = [];
    const friendRequestRef = ref(db, "friendrequest/");
    onValue(friendRequestRef, (snapshot) => {
      const data = snapshot.val();
      snapshot.forEach((item) => {
        if (item.val().receiverid === auth.currentUser.uid) {
          friendRequestArr.push({
            id: item.key,
            receiverName: item.val().receiverName,
            receiverid: item.val().receiverid,
            senderName: item.val().senderName,
            senderid: item.val().senderid,
          });
        } 
       
      });
      setEmptyMsg("You have no friend request");
      setFriendReqList(friendRequestArr);
    });
  }, [dlt]);

  const handleAcceptFriend = (friend) => {
    set(push(ref(db, 'friend/')), {
      id: friend.id,
      receiverName: friend.receiverName,
      receiverid: friend.receiverid,
      senderName: friend.senderName,
      senderid: friend.senderid,
      date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
    })
    .then((
      remove(ref(db, "friendrequest/" + friend.id))
      .then((
        setDlt(!dlt)
      ))
    ))
  }

  return (
    <div>
      <div className="group_request">
        <div className="group_ttl">
          <h2>Friend Request</h2>
          <BsThreeDotsVertical
            className="
          three_dot"
          />
        </div>
        {friendReqList.map((list) => (
          <div className="group_item">
            <div className="group_img">
              <img
                src="https://media.istockphoto.com/photos/multiracial-group-of-young-people-standing-in-circle-and-smiling-at-picture-id1319947526?b=1&k=20&m=1319947526&s=170667a&w=0&h=o8mdog0xAEcBVsBnN_7PAexLqS7Q_pfybeBGx-TaB54="
                alt=""
              />
            </div>
            <div className="group_title">
              <h4>{list.senderName}</h4>
            </div>
            <div className="group_btn">
              <button onClick={() => handleAcceptFriend(list)}>Accept</button>
            </div>
          </div>
        ))}

        {friendReqList.length === 0 && <Alert severity="info">{emptyMsg}</Alert>}
      </div>
    </div>
  );
};

export default FriendReq;
