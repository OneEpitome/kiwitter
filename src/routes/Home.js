import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Kweet from "../components/Kweet";

const Home = ({ userObj }) => {
  const [kweet, setKweet] = useState("");
  const [kweets, setKweets] = useState([]);
  const getDocuments = () => {
    const dbKweets = query(
      collection(dbService, "kweet"),
      orderBy("createdAt")
    );
    onSnapshot(dbKweets, (querySnapshot) => {
      const newKweets = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setKweets(newKweets);
    });
  };
  useEffect(() => {
    getDocuments();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "kweet"), {
      text: kweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setKweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setKweet(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={kweet}
          type="text"
          placeholder="What's in your Mind?"
          maxLength={120}
        />
        <input type="submit" value="Kweet" />
      </form>
      <div>
        <ul>
          {kweets.map((kweetObj) => {
            return (
              <Kweet key={kweetObj.id} kweetObj={kweetObj} userObj={userObj} />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Home;
