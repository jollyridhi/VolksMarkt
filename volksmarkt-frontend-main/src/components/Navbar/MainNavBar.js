import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useHistory, withRouter } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import {styled} from '@mui/material/styles'
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation } from 'react-router-dom';
import { CategoryRounded, Home, ListAltRounded, Logout, SettingsApplicationsRounded} from '@mui/icons-material';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));




function MainNavBar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  
    setState({ ...state, [anchor]: open });
  };
  
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
      <List>
        {['Home'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={movetoHome}>
              <ListItemIcon>
                {index % 2 === 0 ? <Home /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {['My Orders'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={movetoMyOrders}>
              <ListItemIcon>
                {index % 2 === 0 ? <ListAltRounded /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {['Catalogue'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <CategoryRounded /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {['Cart'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={movetoCart}>
              <ListItemIcon>
                {index % 2 === 0 ? <ShoppingCartIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <SettingsApplicationsRounded /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {['Log Out'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Logout /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  

  const history = useHistory();

  const handleLogin = () => {
    history.push("/SignIn");
  }
  const handleLoginSeller = () => {
    history.push('/seller/SignIn')
  }
  const movetoCart = () => {
    history.push('/cart');
  }
  const movetoHome = () => {
    history.push('/');
  }

  const movetoMyOrders = () => {
    history.push('/MyOrders/');
  }


  const CartButton = () => {
    return (
      <IconButton onClick={movetoCart}>
            <StyledBadge badgeContent={0} color="secondary">
              <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
    )
  }
  const anchor = 'left';
  let location = useLocation();
  const heading1 = location.pathname.substring(1);
  const heading = heading1.charAt(0).toUpperCase() + heading1.slice(1);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
            <Switch>
              <Route exact path="/">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Dashboard
                </Typography>
                <CartButton />
          <Button color="inherit" onClick={handleLogin} sx={{marginX: 2}}>Login</Button>
              </Route>
              <Route exact path="/SignIn">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Sign In
                </Typography>
              </Route>
              <Route exact path="/SignUp">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Sign Up
                </Typography>
                <CartButton />
          <Button color="inherit" onClick={handleLogin} sx={{marginX: 2}}>Login</Button>
              </Route>
              <Route exact path='/seller/SignIn'>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Seller Sign In
                </Typography>
              </Route>
              <Route exact path='/seller/SignUp'>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Seller Sign Up
                </Typography>
                
          <Button color="inherit" onClick={handleLoginSeller} sx={{marginX: 2}}>Login</Button>
              </Route>
              <Route exact path='/seller/'>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Seller Dashboard
                </Typography>
          <Button color="inherit" onClick={handleLoginSeller} sx={{marginX: 2}}>Login</Button>
              </Route>
              <Route path='/'>
                {heading}
              </Route>
            </Switch>
            
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default withRouter(MainNavBar)