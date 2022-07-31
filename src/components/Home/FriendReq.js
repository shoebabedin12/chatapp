import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const FriendReq = () => {
  const db = getDatabase();
  
  const [friendReqList, setFriendReqList] = useState([]);

  useEffect(() => {
    const friendRequestArr = [];
    const friendRequestRef = ref(db, "friendrequest/");
    onValue(friendRequestRef, (snapshot) => {
      const data = snapshot.val();
      snapshot.forEach((item) => {
        friendRequestArr.push({
          name: item.val().name,
          receiverid: item.val().receiverid,
          senderid: item.val().senderid,
        });
      });
      setFriendReqList(friendRequestArr);
    });
  }, []);

  console.log(friendReqList);

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
        {friendReqList.map(list => (
          <div className="group_item">
            <div className="group_img">
              <img
                src="https://media.istockphoto.com/photos/multiracial-group-of-young-people-standing-in-circle-and-smiling-at-picture-id1319947526?b=1&k=20&m=1319947526&s=170667a&w=0&h=o8mdog0xAEcBVsBnN_7PAexLqS7Q_pfybeBGx-TaB54="
                alt=""
              />
            </div>
            <div className="group_title">
              <h4>{list.name}</h4>
            </div>
            <div className="group_btn">
              <button>Accept</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendReq;
