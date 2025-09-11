import { LogoutRounded, PersonAdd, Settings } from "@mui/icons-material";
import { Avatar, Backdrop, Box, CircularProgress, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";


const settings = ['Profile', 'Logout'];

const CircleProfile = () => {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);

  const [loading, setLoading] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    handleCloseUserMenu();
    if (e.target instanceof HTMLElement && e.target.textContent.toLowerCase() === "logout") {
      setLoading(true)
      const res = await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
      console.log(res.data)
      window.location.href = "/";
      setLoading(false)
    }

    
  }

  return (
    <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleOpenUserMenu}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 45, height: 45 }}>M</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElUser}
        id="account-menu"
        open={open}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <RouterLink to="/profile" style={{ textDecoration: "none" }} >
        <MenuItem onClick={handleSubmit} sx={{ color: 'text.primary' }}>
           <Avatar /> Profile
        </MenuItem>
        </RouterLink>
        <MenuItem onClick={handleSubmit}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSubmit}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleSubmit}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem sx={{ color: "error.main"}} onClick={handleSubmit} defaultValue={"Logout"}> 
          <ListItemIcon>
            <LogoutRounded color="error"  fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: (t) => t.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}

export default CircleProfile