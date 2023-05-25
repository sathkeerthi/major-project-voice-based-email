import { Badge } from "@material-ui/core";
import { Inbox, Keyboard, Update, Videocam } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocalContect } from "../../context/context";
import { useMailContext } from "../../context/MailCotext";

const SidebarNavBtn = () => {
  const { drawerOpen } = useLocalContect();
  const { setMailsType, inboxUnreadNo } = useMailContext();
  let history = useHistory();
  const [active, setActive] = useState("inbox");

  const updatePrimaryActive = () => {
    if (active === "inbox") {
      history.push("/");
    }
    setMailsType("Primary");
    setActive("inbox");
  };

  const UpdateHome = () => {
    history.push("/");
  };

  const sentActive = () => {
    if (active === "inbox") {
      history.push("/");
    }
    setMailsType("Sent");
    setActive("sent");
  };
  return (
    <div className='sidebar__btns'>
      <div
        onClick={UpdateHome}
        className={`sidebar__btn sidebar__topBtn  ${
          !drawerOpen && "sidebar__btnClose"
        } ${active === "home" && "sidebar__active"}`}
      >
        <div
          className={`sidebar__btnLeft ${
            !drawerOpen && "sidebar__btnLeftClose"
          }`}
        >
          {
            <>
              <Inbox className='sidebar__icon' />
              <p>Home</p>
            </>
          }
        </div>
      </div>
      <div
        onClick={updatePrimaryActive}
        className={`sidebar__btn sidebar__topBtn  ${
          !drawerOpen && "sidebar__btnClose"
        } ${active === "inbox" && "sidebar__active"}`}
      >
        <div
          className={`sidebar__btnLeft ${
            !drawerOpen && "sidebar__btnLeftClose"
          }`}
        >
          {drawerOpen ? (
            <>
              <Inbox className='sidebar__icon' />
              <p>Inbox</p>
            </>
          ) : (
            <Badge badgeContent={0} color='error'>
              <Inbox className='sidebar__icon' />
            </Badge>
          )}
        </div>
        <div
          className={`sidebar__unread ${!drawerOpen && "sidebar__unreadClose"}
         
          `}
        >
          <p>{inboxUnreadNo}</p>
        </div>
      </div>

      <div
        onClick={sentActive}
        className={`sidebar__btn sidebar__topBtn  ${
          !drawerOpen && "sidebar__btnClose"
        }  ${active === "sent" && "sidebar__active"}`}
      >
        <div
          className={`sidebar__btnLeft ${
            !drawerOpen && "sidebar__btnLeftClose"
          }`}
        >
          {drawerOpen ? (
            <>
              <Inbox className='sidebar__icon' />
              <p>Sent</p>
            </>
          ) : (
            <Badge badgeContent={0} color='error'>
              <Inbox className='sidebar__icon' />
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarNavBtn;
