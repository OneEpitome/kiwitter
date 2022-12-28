import React, { useEffect, useState } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { authService, dbService } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const Profile = ({ refreshUser, userObj }) => {
  let navigate = useNavigate();
  const [mykweets, setMyKweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    signOut(authService);
    navigate("/");
  };
  const getMyKweets = async () => {
    const q = query(
      collection(dbService, "kweet"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt")
    );
    const dbkweets = await getDocs(q);
    const kweets = dbkweets.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setMyKweets(kweets);
  };
  useEffect(() => {
    getMyKweets();
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
      refreshUser();
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
      <div>
        <ul>
          {mykweets.map((kweet) => {
            return (
              <li key={kweet.id}>
                {kweet.text}, createdAt : {kweet.createdAt}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Profile;
