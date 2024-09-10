import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Container } from '@mui/system'
import shopImage from "./shopImage.jpg"
import { useHistory} from 'react-router-dom'
import { useState, useEffect } from 'react'

const getStores = () => {
	return [
		{
			"name": "E-shop",
			"address": "",
			"id": 1
		},
		{
			"name": "C-shop",
			"address": "",
			"id": 2
		},
		{
			"name": "Old shop",
			"address": "",
			"id": 3
		},
		{
			"name": "New shop",
			"address": "",
			"id": 4
		},
	]
}


function StoreCard(props) {
	
	const history = useHistory()
	const shopID = props.id

	const linkToShop = () =>{
		console.log(shopID)
		history.push(`/shop/${shopID}`)
	}
	
	return (
		<Grid item xs={6}>
			<Card>
				<CardActionArea onClick={linkToShop}>
					<CardMedia
						component="img"
						height="140"
						image={props.image}
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

	)
}

export default function Dashboard() {

	const [stores, setStores] = useState(null)
	
	useEffect(() => {
		fetch('http://127.0.0.1:8000/Stores/').then(res => {
			return res.json()
		}).then(data => {
			console.log(data)
			setStores(data)
		}
		)
	}, [])
	
	return ( 
		<Container>
			<Grid container spacing={5} marginTop={5}>

				{stores ? stores.map((store) => (
					<StoreCard name={store.name} desc={store.address} key={store.id} id={store.id} image={store.image}/>
				)) : getStores().map((store) => (
					<StoreCard name={store.name} desc={store.address} key={store.id} id={store.id} image={store.image}/>
		  		))}
			</Grid>
		</Container>
	)
}