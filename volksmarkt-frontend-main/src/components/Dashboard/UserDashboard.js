import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import shopImage from "./shopImage.jpg";
import { useHistory, withRouter} from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../Navbar/navbar';
const getStores = () => {
	return [
		{
			"name": "E-shop",
			"description": "This is near GH",
			"id": 1
		},
		{
			"name": "C-shop",
			"description": "This is also near GH",
			"id": 2
		},
		{
			"name": "Old shop",
			"description": "Everything is near GH",
			"id": 3
		},
		{
			"name": "New shop",
			"description": "GH is at the centre of the universe",
			"id": 4
		},
	]
}



function StoreCard(props) {

	const history = useHistory();

	const linkToShop = () =>{
		history.push('/shop')
	}
	
	return (
		<Grid item xs={6}>
			<Card>
				<CardActionArea onClick={linkToShop}>
					<CardMedia
						component="img"
						height="140"
						image={shopImage}
						alt="green iguana"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{props.name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{props.desc}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>

	);
};

function UserDashboard() {
	const [stores, setStores] = useState(null);
	
	useEffect(() => {
		fetch('http://127.0.0.1:8000/Stores/').then(res => {
			return res.json();
		}).then(data => {
			// console.log(data);
			setStores(data);
		}
		)
	}, [])

	
	return (
		<>
		<Container>
			<Grid container spacing={5} marginTop={5}>

				{stores?stores.map((store) => (
					<StoreCard name={store.name} desc={store.address} key={store.id}/>
				)):getStores().map((store) => (
					<StoreCard name={store.name} desc={store.description} key={store.id}/>
		  		))}
			</Grid>
		</Container>
		</>
	)
	
}

export default withRouter(UserDashboard);