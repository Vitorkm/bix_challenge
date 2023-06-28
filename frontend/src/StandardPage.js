import React, { useRef } from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BixLogo from "./utils/images/bix_logo.png";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import LogoutIcon from "@mui/icons-material/Logout";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactsIcon from "@mui/icons-material/Contacts";
import Tooltip from "@mui/material/Tooltip";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function StandardPage({ children }) {
  const { logoutUser, user } = useContext(AuthContext);

  const MenuItens = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
      active: false,
    },
    
    {
      name: "Register",
      icon: <ContactsIcon />,
      path: "/register",
      active: !user.is_superuser,
    },
  ];

  const [tab, setTab] = useState("Dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);


  const navigate = useNavigate();

  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleRouter = (link) => {
    navigate(link);
  };

  const handleChangeTabs = (newValue) => {
    setTab(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ backgroundColor: "#121212", scrollBehavior: "smooth" }} onClick={() => console.log(user)}>
      <Toolbar
        sx={{
          height: "2rem",
          elevation: 1,
        }}
        onClick={open ? handleDrawerClose : null}
      >
        <Grid container direction={"row"} >
          <Grid item xs={4} >
        <IconButton
          aria-label="open drawer"
          onClick={() => handleDrawerOpen()}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        </Grid>
        <Grid item xs={4} justifyContent={"center"} display={"flex"}>
        <img
          src={BixLogo}
          alt="Bix logo"
          style={{ height: "3rem", width: "auto", cursor: "pointer" }}
          onClick={() => {navigate("/dashboard"); handleChangeTabs("Dashboard");}}
        />
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"flex-end"}>
        <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h6" noWrap sx={{ color : "gray", display: {xs : "none", md : "block"} }}>
            Welcome, {capitalizeString(user.username)}
          </Typography>
        <Tooltip title="Click to exit" placement="bottom-start">
        <Avatar
          id="avatar"
          onClick={handleClick}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {user.is_superuser ? "AD" : user.username.charAt(0).toUpperCase()}
        </Avatar>
        </Tooltip>
        </Stack>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "avatar",
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1, color: "primary" }} />
            Logout
          </MenuItem>
        </Menu>
        </Grid>
        </Grid>
      </Toolbar>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Stack
          direction={"row"}
          justifyContent={{sx : "space-between", md: "flex-end"}}
          sx={{ padding: "0.7rem" }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "#ffffff", fontSize: "1rem", fontWeight: "bold", display: {xs : "flex", md : "none"}, justifyContent: "center", alignItems: "center", width: "100%" }}
          >
            Welcome, {capitalizeString(user.username)}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ArrowBackIcon />
          </IconButton>
        </Stack>
        <List>
          {MenuItens.map((item, index) => (
            <>
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleRouter(item.path);
                    handleDrawerClose();
                    handleChangeTabs(item.name);
                  }}
                  disabled={item.active}
                  sx={{
                    paddingY: "1rem",
                    boxShadow:
                      item.name === tab ? "3px 3px 3px 3px #00000029" : "none",
                    backgroundColor: item.name === tab ? "#ffffff29" : "none",
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      fontWeight: item.name === tab ? "900" : "500",
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
        <List sx={{ position: "absolute", bottom: "0"  }}>
        <Tooltip title="Logout" placement="right">
        <IconButton onClick={handleLogout} sx={{
          margin: "1.3rem",
        }}>
          <LogoutIcon />
        </IconButton>
        </Tooltip>
        </List>
      </Drawer>
      <div
        style={{
          padding: "0.5rem 1rem 1rem 1rem",
          margin: "0.5rem 1rem 1rem 1rem",
        }}
        onClick={handleDrawerClose}
      >
        {children}
      </div>
    </div>
  );
}
