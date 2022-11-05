import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { BsFillPersonCheckFill, BsFillPersonPlusFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

const UserList = () => {
  const auth = getAuth();
  const db = getDatabase();
  let [userList, setUserList] = useState([]);
  let [userListEmpty, setUserListEmpty] = useState("");
  const [friendReqList, setFriendReqList] = useState([]);
  const [friendReqCheck, setFriendReqCheck] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let userArr = [];
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      snapshot.forEach((item) => {
        // console.log(item.val());
        if (item.val().email !== auth.currentUser.email) {
          userArr.push({
            username: item.val().username,
            email: item.val().email,
            id: item.key,
          });
        } else {
          setUserListEmpty("User list is empty");
        }
      });
      setUserList(userArr);
    });
  }, []);

  const handleFriendRequest = (info) => {
    // const auth = getAuth();
    set(push(ref(db, "friendrequest/")), {
      senderName: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      receiverName: info.username,
      receiverid: info.id,
    });
    // console.log('user List theke ashci',info);
    setFriendReqCheck(!friendReqCheck);
  };

  useEffect(() => {
    const friendRequestArr = [];
    const friendRequestRef = ref(db, "friendrequest/");
    onValue(friendRequestRef, (snapshot) => {
      const data = snapshot.val();
      snapshot.forEach((item) => {
        friendRequestArr.push(item.val().receiverid + item.val().senderid);
      });
      setFriendReqList(friendRequestArr);
    });
  }, [friendReqCheck]);

  useEffect(() => {
    const friendRequestArr = [];
    const friendRequestRef = ref(db, "friend/");
    onValue(friendRequestRef, (snapshot) => {
      const data = snapshot.val();
      snapshot.forEach((item) => {
        friendRequestArr.push(item.val().receiverid + item.val().senderid);
      });
      setFriends(friendRequestArr);
    });
  }, []);

  return (
    <div>
      <div className="group_request friends">
        <div className="group_ttl">
          <h2>User List</h2>
          <BsThreeDotsVertical className="three_dot" />
        </div>

        {userList.map((item, index) => (
          <div key={index} className="group_item">
            <div className="group_img">
              <img
                src="https://media.istockphoto.com/photos/multiracial-group-of-young-people-standing-in-circle-and-smiling-at-picture-id1319947526?b=1&k=20&m=1319947526&s=170667a&w=0&h=o8mdog0xAEcBVsBnN_7PAexLqS7Q_pfybeBGx-TaB54="
                alt=""
              />
            </div>
            <div className="group_title">
              <h4>{item.username}</h4>
              <p>{item.email}</p>
            </div>

            {friends.includes(item.id + auth.currentUser.uid) ||
            friends.includes(auth.currentUser.uid + item.id) ? (
              <div className="group_btn">
                <button>
                  <FaUserFriends />
                </button>
              </div>
            ) : friendReqList.includes(item.id + auth.currentUser.uid) ||
              friendReqList.includes(auth.currentUser.uid + item.id) ? (
              <div className="group_btn">
                <button>
                <BsFillPersonCheckFill/>
                </button>
              </div>
            ) : (
              <div className="group_btn">
                <button onClick={() => handleFriendRequest(item)}>
                <BsFillPersonPlusFill/>
                </button>
              </div>
            )}
          </div>
        ))}
        {userList.length === 0 && <p>{userListEmpty}</p>}
      </div>
    </div>
  );
};

export default UserList;
