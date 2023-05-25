import React from "react";
import "./styles.css";
import {
  // Apps,
  CameraAltOutlined,
  // HelpOutline,
  // Menu,
  PersonAddOutlined,
  // Search,
  // Settings,
} from "@material-ui/icons";
import { Avatar, Badge, Button, makeStyles, Popover } from "@material-ui/core";
import { auth } from "../../lib/firebase";
import { useLocalContect } from "../../context/context";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Header = () => {
  const classes = useStyles();
  const { currentUser, setDrawerOpen, drawerOpen } = useLocalContect();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const signout = () => auth.signOut();
  return (
    <div className='home__header'>
      <div className='home__left'>
        <div class='avatar' onClick={() => setDrawerOpen(!drawerOpen)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='50'
            height='50'
            viewBox='0 0 50 50'
            fill='#ffffff'
          >
            <path d='M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z'></path>
          </svg>
        </div>
      </div>

      <div className='home__right'>
        <div>
          <div class='avatar' onClick={handleClick}>
            <img
              class='avatar__image'
              src='https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-avatar-icon-png-image_695765.jpg'
            />
          </div>

          <Popover
            open={open}
            id={id}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
            }}
          >
            <div className='home__popoverContainer'>
              <div className='home__popover__top'>
                <Badge
                  overlap='circle'
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <div className='home__badge'>
                      <CameraAltOutlined className='home__camera' />
                    </div>
                  }
                >
                  <Avatar className={classes.large} />
                </Badge>
                <div className='home__text'>
                  <div className='home__displayName'>
                    {currentUser.displayName}
                  </div>
                  <div className='home__mail'>{currentUser.email}</div>
                </div>
                <div className='home__btn'>Manage your google account</div>
              </div>

              <div className='home__popover__btm'>
                <div className='home__addBtn'>
                  <PersonAddOutlined className='home__addIcon' />
                  <p>Add another account</p>
                </div>

                <Button
                  variant='outlined'
                  className='home__signOut'
                  onClick={signout}
                >
                  Sign Out
                </Button>

                <div className='home__popover__footer'>
                  <p>Privacy Policy</p>
                  <span>•</span>
                  <p>Terms of service</p>
                </div>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
