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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import Input from '@mui/material/Input' 

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

function SellerSignUp() {
	const history = useHistory();
	const [category, setCategory] = React.useState('');
	const [number, setNumber] = useState('');
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [address, setAddress] = useState('')
	const [shopName, setShopName] = useState('')
	const [password, setPassword] = useState('')
	const [image, setImage] = useState(null) 

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData();
		data.append('first_name', firstName)
		data.append('last_name', lastName)
		data.append('shop_name', shopName)
		data.append('contact', number)
		data.append('category', category)
		data.append('email', email)
		data.append('password', password)
		data.append('address', address)
		data.append('image', image)
		axios.post('http://127.0.0.1:8000/seller/register/', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
			console.log(res.data)
			if (!res.data['isCreated']){
				alert('Registration failed')
			}
			else history.push('/Seller/SignIn/')
		});
	};

	const isInvalidNumber = () => {
		if (number.length === 0) return false;
		if (number.length !== 10) return true;
		for (var c of number) {
			if (c < '0' || c > '9') return true;
		}
		return false;
	}
	const isInvalidEmail = () => {
		if (email.length === 0) return false;
		return !String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
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
						Seller Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
									onChange={(e) => setLastName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="shopName"
									label="Shop Name"
									name="shopName"
									autoComplete="shopName"
									onChange={(e) => setShopName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="address"
									label="Address"
									name="address"
									autoComplete="address"
									onChange={(e) => setAddress(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									value={number}
									onChange={(e) => setNumber(e.target.value)}
									error={isInvalidNumber()}
									id="contact"
									label="Contact"
									name="contact"
									autoComplete="contact"
									helperText={isInvalidNumber() ? "Invalid Number" : ""}
								/>
							</Grid>
							<Grid>
								<FormControl sx={{ m: 2, minWidth: 360 }} required>
									<InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
									<Select
										required
										fullWidth
										labelId="demo-simple-select-autowidth-label"
										id="demo-simple-select-autowidth"
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										autoWidth
										label="Category"
									>
										<MenuItem value={'Electronics'}>Electronics</MenuItem>
										<MenuItem value={'Medical'}>Medical</MenuItem>
										<MenuItem value={'Stationary'}>Stationary</MenuItem>
										<MenuItem value={'Print'}>Print</MenuItem>
										<MenuItem value={'General Store'}>General Store</MenuItem>
										<MenuItem value={'Grocery'}>Grocery</MenuItem>
										<MenuItem value={'Books'}>Books</MenuItem>
										<MenuItem value={'Food'}>Food</MenuItem>
										<MenuItem value={'Others'}>Others</MenuItem>

									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={(e) => setEmail(e.target.value)}
									error={isInvalidEmail()}
									helperText={isInvalidEmail() ? "Invalid Email" : ""}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
							<InputLabel htmlFor="image" onClick={(e) => (e.preventDefault())} sx={{
								marginTop: '10px'
							}}>
								Upload Shop Image
							</InputLabel>
							<Input id="image" name="image" type="file" onChange={(e) => setImage(e.target.files[0])} sx={{
								marginTop: 0,
								height: '55px',
							}} fullWidth />
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={handleSubmit}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}

export default withRouter(SellerSignUp);