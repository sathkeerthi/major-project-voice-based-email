import { Drawer, makeStyles } from "@material-ui/core"; // {Avatar, Badge}
import React from "react";
import { useLocalContect } from "../../context/context";
import "./styles.css";
import clsx from "clsx";
import SidebarNavBtn from "./SidebarNavBtn";
// import { Chat, Person } from "@material-ui/icons";

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: "70px",
    },
  },
}));

const Sidebar = ({ children }) => {
  const classes = useStyles();

  const { drawerOpen, setComposeOpen } = useLocalContect(); // {currentUser}
  return (
    <div className='sidebar'>
      <div className={classes.root}>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            }),
          }}
        >
          <div
            onClick={() => setComposeOpen(true)}
            className={`sidebar__compose ${
              !drawerOpen && "sidebar__composeClose"
            }`}
          >
            <img
              className='sidebar__addIMG'
              src='https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png'
              alt='add'
            />
            <p>Compose</p>
          </div>
          <SidebarNavBtn />

        </Drawer>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
