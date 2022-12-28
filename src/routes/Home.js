import React, { useEffect, useState } from "react";
import { dbService, storage } from "../firebase";
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
  const [attachment, setAttachment] = useState();
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
    // await addDoc(collection(dbService, "kweet"), {
    //   text: kweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setKweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setKweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishEvent) => {
      const {
        target: { result },
      } = finishEvent;
      setAttachment(result);
    };
  };
  const onClearAttachment = () => {
    setAttachment();
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Kweet" />
        {attachment && (
          <>
            <div>
              <img
                src={attachment}
                alt="uploadedImg"
                width={200}
                height={200}
              />
              <button onClick={onClearAttachment}>Clear</button>
            </div>
          </>
        )}
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
