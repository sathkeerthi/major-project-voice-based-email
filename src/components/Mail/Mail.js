// import { Checkbox } from "@material-ui/core";
// import { Label, LabelOutlined, Star, StarBorder } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocalContect } from "../../context/context";
import { db } from "../../lib/firebase";
import "./styles.css";

const Mail = ({ data }) => {
  // const [starred, setStarred] = useState(false);
  // const [important, setImportant] = useState(false);

  const { currentUser } = useLocalContect();

  const history = useHistory();

  const updateRead = () => {
    history.push(`/${data.id}`);

    if (data.read === false) {
      db.collection("RecivedMails")
        .doc(currentUser.email)
        .collection("mail")
        .doc(data.id)
        .update({
          ...data,
          read: true,
        });
    }
  };
  return (
    <div
      onClick={updateRead}
      className={`mail ${data.read === false && "mail--unread"}`}
    >
      <div className='mail__texts'>
        {/* //? Sender's name */}
        <p className='mail__text'>{data.senderName}</p>
        <div className='mail__titleSubtitle'>
          <p className='mail__text'>{data.subject}</p>
          <p className='mail__text mail__body'> - {data.body}</p>
        </div>
        <p className='mail__text'>{data.time}</p>
      </div>
    </div>
  );
};

export default Mail;
