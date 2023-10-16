import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {useLogout} from "../hooks/useLogout"

function SupplierNavbar(props) {
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { logout } = useLogout();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogoutClick = () => {
    logout()
}

 

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Link to="/supplierDashboard" style={{ textDecoration: "none", color: "black" }}>
          <ListItem disablePadding>
            <ListItemButton>
              Dashboard
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/invoice" style={{ textDecoration: "none", color: "black" }}>
          <ListItem disablePadding>
            <ListItemButton>
              Invoice
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/supplierOrders" style={{ textDecoration: "none", color: "black" }}>
          <ListItem disablePadding>
            <ListItemButton>
              Purchase Orders
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
     
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {/* Your title goes here */}
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogoutClick}
            sx={{ ml: 'auto' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default SupplierNavbar;
