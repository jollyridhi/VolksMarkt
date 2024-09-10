import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/Menu'
import { BrowserRouter as Route, Switch } from 'react-router-dom'
import { useHistory, withRouter } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Badge } from '@mui/material'
import { styled } from '@mui/material/styles'
import MailIcon from '@mui/icons-material/Mail'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useLocation } from 'react-router-dom'
import { Rule } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WalletIcon from '@mui/icons-material/Wallet';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios'
const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}))



function NavBar() {
	const location = useLocation();
	const history = useHistory();
	const openSide = (text) => {
		console.log("openside")
		console.log(text);
		if (text === 'Cart') history.push('/cart/')
		else if (text === 'Log Out') {
			console.log("there")
			localStorage.removeItem('first_name')
			localStorage.removeItem('last_name')
			history.push('/')
		}
		else if (text === 'Home') {
			history.push('/')
		}
		else if (text === 'My Orders') {
			history.push('/MyOrders/')
		}
		else if(text === 'Order List'){
			history.push('/SellersOrders/')
		}
		else if(text === 'Seller Sign In'){
			history.push('/Seller/SignIn/')
		}
	}
	const [wallet, setWallet] = React.useState(0)
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})
	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}

		setState({ ...state, [anchor]: open })
	}
	const getIcon = (text) => {
		if(text === 'Log Out'){
			return (<LogoutIcon />)
		}
		else if(text === 'Cart'){
			return (<ShoppingCartIcon />)
		}
		else if(text === 'My Orders' || text === 'Order List'){
			return (<FormatListBulletedIcon />)
		}
		else if(text === 'Home'){
			return (<HomeIcon />)
		}
		else if(text === 'Wallet'){
			return (<AccountBalanceWalletIcon />)
		}
		else if(text === 'Seller Sign In'){
			return (<LoginIcon />)
		}
	}
	const list = (anchor) => {
		if (location.pathname.toLowerCase().includes('seller')) {
			return (
				<Box
					sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
					role="presentation"
					onClick={toggleDrawer(anchor, false)}
					onKeyDown={toggleDrawer(anchor, false)}
				>
					<List>
						{['Home', 'Order List', 'Log Out'].map((text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton onClick={() => openSide(text)}>
									<ListItemIcon>
										{getIcon(text)}
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Divider />
				</Box>
			)
		}
		return (
			<Box
				sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
				role="presentation"
				onClick={toggleDrawer(anchor, false)}
				onKeyDown={toggleDrawer(anchor, false)}
			>
				<List>
					{['Home', 'My Orders', 'Cart', 'Log Out', 'Seller Sign In'].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton onClick={() => openSide(text)}>
								<ListItemIcon>
									{getIcon(text)}
									{/* {userMoney()} */}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
				{/* <List>
				{['Log Out'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon onClick={() => {
								console.log("called")
								openSide(text)
							}}>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List> */}
			</Box>
		)
	}



	const handleLogin = () => {
		history.push("/SignIn")
	}
	const handleLoginSeller = () => {
		history.push('/seller/SignIn')
	}
	const movetoCart = () => {
		history.push('/cart/')
	}
	const moveToMyOrders = () => {
		history.push('/MyOrders');
	}
	const moveToSellersOrders = () => {
		history.push('/SellersOrders');
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
	const Wallet = () => {
		if(location.pathname.toLowerCase().includes('seller')){
			if(localStorage.getItem('seller_first_name') === null){
				return <Button color="inherit" sx={{ marginX: 2 }}><WalletIcon /></Button>
			}
			else{
				return <Button color="inherit" sx={{ marginX: 2 }}><WalletIcon /> {localStorage.getItem('sellerWallet')}</Button>
			}
		}
		else{
			if(localStorage.getItem('first_name') === null){
				return <Button color="inherit" sx={{ marginX: 2 }}><WalletIcon /></Button>
			}
			else{
				return <Button color="inherit" sx={{ marginX: 2 }}><WalletIcon /> {localStorage.getItem('userWallet')}</Button>
			}
		}	
	}

	const RightSide = (type) => {
		if (type.toLowerCase() === 'seller') {
			if (localStorage.getItem('seller_first_name') === null) {
				return (
					
					<Button color="inherit" onClick={handleLoginSeller} sx={{ marginX: 2 }}>Login</Button>
				)
			}
			else {
				return (
					<Button color="inherit" onClick={moveToSellersOrders} sx={{ marginX: 2 }}>{localStorage.getItem('seller_first_name') + ' ' + localStorage.getItem('seller_last_name')}</Button>
				)
			}
		}
		else {
			if (localStorage.getItem('first_name') === null) {
				return (
					<Button color="inherit" onClick={handleLogin} sx={{ marginX: 2 }}>Login</Button>
				)
			}
			else {
				return (
					<Button color="inherit" onClick={moveToMyOrders} sx={{ marginX: 2 }}>{localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name')}</Button>
				)
			}
		}
	}
	const anchor = 'left'
	const heading1 = location.pathname.substring(1)
	const heading = (heading1.substring(0, 4) === "shop" ? "Shop" : heading1.charAt(0).toUpperCase() + heading1.slice(1))
	const needCart = () => {
		if (heading1.toLowerCase().includes('seller')) return false;
		return true;
	}
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
							{Wallet()}
							<CartButton />
							{RightSide('Buyer')}
						</Route>
						<Route exact path="/SignIn">
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Sign In
							</Typography>
							{Wallet()}
							<CartButton />
						</Route>
						<Route exact path="/SignUp">
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Sign Up
							</Typography>
							{Wallet()}
							<CartButton />
							{RightSide('buyer')}
							{/* <Button color="inherit" onClick={handleLogin} sx={{ marginX: 2 }}>Login</Button> */}
						</Route>
						<Route exact path='/MyOrders/'>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								My Orders
							</Typography>
							{Wallet()}
							<CartButton />
							{RightSide('Buyer')}
						</Route>
						<Route exact path='/cart/'>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Cart
							</Typography>
							{Wallet()}
							<CartButton />
							{RightSide('buyer')}
						</Route>
						<Route exact path='/seller/SignIn'>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Seller Sign In
							</Typography>
							{Wallet()}
						</Route>
						<Route exact path='/seller/SignUp'>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Seller Sign Up
							</Typography>
							{Wallet()}
							{RightSide('Seller')}
							{/* <Button color="inherit" onClick={handleLoginSeller} sx={{ marginX: 2 }}>Login</Button> */}
						</Route>
						<Route exact path='/SellersOrders'>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Sellers Orders
							</Typography>
							{Wallet()}
							{RightSide('Seller')}
						</Route>
						<Route exact path='/seller/'>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Seller Dashboard
							</Typography>
							{Wallet()}
							{RightSide('Seller')}
							{/* <Button color="inherit" onClick={handleLoginSeller} sx={{ marginX: 2 }}>Login</Button> */}
						</Route>
						<Route path = '/Shop/'>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Shop
							</Typography>
							<CartButton />
							{Wallet()}
							{RightSide('Buyer')}
						</Route>
						<Route path='/'>
							{heading}
						</Route>
					</Switch>

				</Toolbar>
			</AppBar>
		</Box>
	)
}
export default withRouter(NavBar)