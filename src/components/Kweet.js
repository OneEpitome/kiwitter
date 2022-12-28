import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../firebase";

const Kweet = ({ kweetObj, userObj }) => {
  const [edit, setEdit] = useState(false);
  const [newKweet, setNewKweet] = useState(kweetObj.text);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewKweet(value);
  };
  const preventDefault = (event) => {
    event.preventDefault();
  };
  const onSubmit = async (event) => {
    await updateDoc(doc(dbService, "kweet", event.target.id), "text", newKweet);
    toggleEdit();
  };
  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };
  const onDelete = async (event) => {
    const ok = window.confirm("Are you sure to delete this kweet?");
    if (ok) {
      // delete kweet
      await deleteDoc(doc(dbService, "kweet", event.target.id));
    }
  };
  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={preventDefault}>
            <input onChange={onChange} value={newKweet} required />
            <input type="submit" id={kweetObj.id} onClick={onSubmit} />
          </form>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h4>
            {kweetObj.text}, created : {kweetObj.createdAt}
          </h4>
          {userObj.uid === kweetObj.creatorId ? (
            <div>
              <button onClick={onDelete} id={kweetObj.id}>
                Delete Kweet
              </button>
              <button onClick={toggleEdit}>Update Kweet</button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Kweet;
