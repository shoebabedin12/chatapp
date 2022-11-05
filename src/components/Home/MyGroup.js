import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const MyGroup = () => {
  // firebase
  const auth = getAuth();
  const db = getDatabase();
  const [groupList, setGroupList] = useState([]);

  // group data fetch from database
  useEffect(() => {
    const arr = [];
    const starCountRef = ref(db, "CreateGroup");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setGroupList(arr);
    });
  }, []);


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
            item.Adminid == auth.currentUser.uid && (
              <div key={index} className="group_item">
                <div className="group_img">
                  <img
                    src="https://media.istockphoto.com/photos/multiracial-group-of-young-people-standing-in-circle-and-smiling-at-picture-id1319947526?b=1&k=20&m=1319947526&s=170667a&w=0&h=o8mdog0xAEcBVsBnN_7PAexLqS7Q_pfybeBGx-TaB54="
                    alt=""
                  />
                </div>
                <div className="group_title">
                  <h4>{item.GroupName}</h4>
                  <p>{item.GroupTagList}</p>
                </div>
                <div className="group_btn">
                  <button>Invite</button>
                </div>
              </div>
            )
        )}
        </div>
      </div>
    </div>
  );
};

export default MyGroup;
