import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory, withRouter } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				VolksMarkt
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

function SellerSignIn() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const isInvalidEmail = () => {
		if (email.length === 0) return false;
		return !String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
	}
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData();
		data.append('username', email)
		data.append('password', password)
		axios.post("http://127.0.0.1:8000/seller/login/", data).then((res) => {
			console.log(res.data);
			if (res.data['isAuthenticated']) {
				localStorage.setItem('shopID', res.data['shop_id'])
				localStorage.setItem('seller_first_name', res.data['firstName'])
				localStorage.setItem('seller_last_name', res.data['lastName'])
				axios.get(`http://127.0.0.1:8000/seller/details/${res.data['id']}/`).then((res) => {
					console.log(res.data['wallet']);
					localStorage.setItem('sellerWallet', res.data['wallet'])
				})
				history.push('/Seller/')
			}
			else {
				alert('Authentication Failed')
			}
		})
	};
	const history = useHistory();
	const goToSignUp = () => {
		history.push('/seller/SignUp')
	}
	const goToforgot_password = () => {
		history.push('/Seller/SellerForgotPassword')
	}

	const returnHome = () => {
		history.push('/seller/')
	}
	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Seller Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={(e) => setEmail(e.target.value)}
							error={isInvalidEmail()}
							helperText={isInvalidEmail() ? "Invalid Email" : ""}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						// onClick={returnHome}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item >
								<Link variant="body2" onClick={goToforgot_password} href=''>
									{"Forgot Password?"}
								</Link>
							</Grid>
							<Grid item sx={{
								position: "relative",
								left: 80,
							}}>
								<Link variant="body2" onClick={goToSignUp} href=''>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}

export default withRouter(SellerSignIn);