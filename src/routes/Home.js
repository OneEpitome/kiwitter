import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Home = () => {
  const [kweet, setKweet] = useState("");
  const [kweets, setKweets] = useState([]);
  const getDocuments = async () => {
    const k = await getDocs(collection(dbService, "kweet"));
    k.forEach((doc) => {
      const newKweet = {
        ...doc.data(),
        id: doc.id,
      };
      setKweets((prev) => [newKweet, ...prev]);
    });
  };
  useEffect(() => {
    getDocuments();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "kweet"), {
      kweet,
      createdAt: Date.now(),
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
          {kweets.map((data) => {
            return (
              <li key={data.id}>
                {data.kweet}, created : {data.createdAt}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Home;
