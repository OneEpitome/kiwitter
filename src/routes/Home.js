import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Kweet from "../components/Kweet";
import KweetFactory from "../components/KweetFactory";

const Home = ({ userObj }) => {
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
  return (
    <>
      <KweetFactory userObj={userObj} />
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
