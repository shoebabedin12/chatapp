import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const UserList = () => {
  const auth = getAuth();
  const db = getDatabase();
  let [userList, setUserList] = useState([]);

  useEffect(() => {
    let userArr = [];
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      snapshot.forEach((item) => {
        userArr.push({
          username: item.val().username,
          email: item.val().email,
          id: item.key,
        });
      });
      setUserList(userArr);
    });
  }, []);

  console.log(userList);

  const handleFriendRequest = (info) => {
    console.log(info);
    set(push(ref(db, 'friendrequest/')), {
      name: info.username,
      receiverid: info.id,
      senderid: auth.currentUser.uid,
    });
  }


  return (
    <div>
      <div className="group_request friends">
        <div className="group_ttl">
          <h2>User List</h2>
          <BsThreeDotsVertical className="three_dot" />
        </div>

        {userList.map(
          (item) =>
            auth.currentUser.uid !== item.id && (
              <div className="group_item">
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
                <div className="group_btn">
                  <button onClick={()=>handleFriendRequest(item)}>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.84 7.1H7.06V10.98H4.42V7.1H0.64V4.66H4.42V0.78H7.06V4.66H10.84V7.1Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default UserList;
