// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignInSignUp/SignIn';
import Signup from './components/SignInSignUp/SignUp';
import NavBar from './components/Navbar/navbar';
import Dashboard from './components/Dashboard/dashboard';
import SellerSignIn from './components/SellerSignInSignUp/SellerSignIn';
import SellerSignUp from './components/SellerSignInSignUp/SellerSignUp';
import SellerDashboard from './components/Dashboard/SellerDashboard';
import ShoppingCart from './components/CartItems/ShoppingCart';
import Shop from './components/Shop/Shop'
import ForgotPassword from './components/SignInSignUp/ForgotPassword';
import SellerForgotPassword from './components/SellerSignInSignUp/SellerForgotPassword';
import MyOrders from './components/Orders/MyOrders';
import UserDashboard from './components/Dashboard/UserDashboard';
import SellersOrders from './components/Orders/SellersOrders';

function App() {
	
	return (
		<>
			<Router>
				<NavBar />
				<Switch>
					<Route exact path='/'>
						<Dashboard />
					</Route>
					<Route exact path='/UserDashboard'>
						<UserDashboard />
					</Route>
					<Route exact path='/SignIn'>
						<SignIn />
					</Route>
					<Route exact path='/SignUp'>
						<Signup />
					</Route>
					<Route exact path='/forgotPassword'>
						<ForgotPassword />
					</Route>
					<Route exact path='/seller/'>
						<SellerDashboard />
					</Route>
					<Route exact path='/seller/SignIn'>
						<SellerSignIn />
					</Route>
					<Route exact path='/seller/SignUp'>
						<SellerSignUp />
					</Route>
					<Route exact path='/cart'>
						<ShoppingCart />
					</Route>
					<Route exact path='/seller/SellerForgotPassword'>
						<SellerForgotPassword />
					</Route>
					<Route path='/shop/:id'>
						<Shop />
					</Route>
					<Route exact path='/MyOrders/'>
						<MyOrders />
					</Route>
					<Route exact path='/SellersOrders/'>
						<SellersOrders />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
