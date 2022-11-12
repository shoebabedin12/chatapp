import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const BlockUser = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [blockuser, setBlocklist] = useState([]);

  useEffect(() => {
    const friendRef = ref(db, "blockuser/");
    onValue(friendRef, (snapshot) => {
      const blockArr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid === item.val().blcokbyid ||
          auth.currentUser.uid === item.val().blockeduserid
        ) {
        blockArr.push({
          keyid: item.key,
          id: item.val().id,
          blockedusername: item.val().blockedusername,
          blockeduserid: item.val().blockeduserid,
          blcokbyid: item.val().blcokbyid,
          blockbyname: item.val().blockbyname,
        });
        }
      });
      setBlocklist(blockArr);
    });
  }, []);
  return (
    <div>
      <div className="group_request friends">
        <div className="group_ttl">
          <h2>Block User</h2>
          <BsThreeDotsVertical
            className="
          three_dot"
          />
        </div>

        {blockuser.length > 0 ?
        blockuser.map((item) => (
          <div key={item.keyid} className="group_item">
            <div className="group_img">
              <img
                src="https://media.istockphoto.com/photos/multiracial-group-of-young-people-standing-in-circle-and-smiling-at-picture-id1319947526?b=1&k=20&m=1319947526&s=170667a&w=0&h=o8mdog0xAEcBVsBnN_7PAexLqS7Q_pfybeBGx-TaB54="
                alt=""
              />
            </div>
            <div className="group_title">
              <h4>{item.blockbyname}</h4>
              <p>Hi Guys, Wassup!</p>
            </div>
            <div className="group_btn">
              <button>Unblock</button>
            </div>
          </div>
        ))
    : 
    <p>No block user have</p>
    }
      </div>
    </div>
  );
};

export default BlockUser;
