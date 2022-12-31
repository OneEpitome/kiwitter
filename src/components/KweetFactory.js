import React from "react";
import { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { dbService, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";

const KweetFactory = ({ userObj }) => {
  const [kweet, setKweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = ref(storage, `/images/${userObj.uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, "data_url");
      attachmentURL = await getDownloadURL(attachmentRef);
      setAttachment("");
    }

    await addDoc(collection(dbService, "kweet"), {
      text: kweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    });
    setKweet("");
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
            <img src={attachment} alt="uploadedImg" width={200} height={200} />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        </>
      )}
    </form>
  );
};

export default KweetFactory;
