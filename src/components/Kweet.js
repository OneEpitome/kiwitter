import React from "react";

const Kweet = ({ kweets, userObj }) => {
  return (
    <ul>
      {kweets.map((data) => {
        return (
          <li key={data.id}>
            {data.text}, created : {data.createdAt}
            {userObj.uid === data.creatorId ? (
              <div>
                <button>Delete Kweet</button>
                <button>Update Kweet</button>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default Kweet;
