import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";

const ChatArea = () => {
  const db = getDatabase();
  const auth = getAuth();

  const user = useSelector((state) => state.activeChat.value);
  console.log("chat area", user);

  const [isactive, setIsActive] = useState(true);
  const [msg, setMsg] = useState("");
  const [msglist, setMsglist] = useState([]);

  const handlemsg = (e) => {
    setMsg(e.target.value);
  };

  const msgSubmit = () => {
    if (msg !== "") {
      console.log(user);
      if (user.status == "group") {
        console.log("this is group");
      } else {
        set(push(ref(db, "singlemsg")), {
          whosnedid: auth.currentUser.uid,
          whosnedname: auth.currentUser.displayName,
          whoreceivename: user.name,
          whoreceive: user.id,
          msg: msg,
        });
      }
    }
  };

  useEffect(() => {
    onValue(ref(db, "singlemsg"), (snapshot) => {
      let msgarr = [];
      snapshot.forEach((item) => {
        msgarr.push(item.val());
      });
      setMsglist(msgarr);
    });
  }, []);

  console.log("sms list",msglist);

  return (
    <>
      {user ? (
        <div className="group_request chatarea">
          <div className="group_ttl">
            <div className="chatHead">
              <div className="group_img">
                <img
                  src="https://media.istockphoto.com/photos/multiracial-group-of-young-people-standing-in-circle-and-smiling-at-picture-id1319947526?b=1&k=20&m=1319947526&s=170667a&w=0&h=o8mdog0xAEcBVsBnN_7PAexLqS7Q_pfybeBGx-TaB54="
                  alt=""
                />
                <div className="activeStatus">
                  <span>
                    {isactive ? (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="7.5"
                          cy="7.5"
                          r="6.5"
                          fill="#00FF75"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="7.5"
                          cy="7.5"
                          r="6.5"
                          fill="#000"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <h2>{user.name}</h2>
                {isactive ? <p>Online</p> : <p>Ofline</p>}
              </div>
            </div>
            <BsThreeDotsVertical />
          </div>

          <div className="ChatBody">
            {msglist.map((item) => 
              item.whosnedid == auth.currentUser.uid ? (
                <div className="msg right">
                  <p className="text">{item.msg}</p>
                  <p className="date">20.10.2022</p>
                </div>
              ) : (
                <div className="msg left">
                  <p className="text">{item.msg}</p>
                  <p className="date">20.10.2022</p>
                </div>
              )
            )}
          </div>
          <div className="ChatFooter">
            <div>
              <input
                type="text"
                onChange={handlemsg}
                className="text"
                placeholder=""
              />
            </div>
            <button onClick={msgSubmit}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1_227)">
                  <path
                    d="M13.9453 0.0937652L0.366161 7.92775C-0.164113 8.23244 -0.0967301 8.97072 0.430614 9.19337L3.54487 10.5L11.9619 3.08205C12.123 2.93849 12.3515 3.15822 12.2138 3.32521L5.1562 11.9238V14.2822C5.1562 14.9736 5.99116 15.2461 6.40132 14.7451L8.26167 12.4805L11.9121 14.0098C12.3281 14.1856 12.8027 13.9248 12.8789 13.4766L14.9882 0.820328C15.0878 0.228531 14.4521 -0.199204 13.9453 0.0937652Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_227">
                    <rect width="15" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <p>Chat Area</p>
      )}
    </>
  );
};

export default ChatArea;
