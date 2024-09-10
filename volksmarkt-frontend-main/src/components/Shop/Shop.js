import * as React from 'react' 
import Button from '@mui/material/Button' 
import Drawer from '@mui/material/Drawer' 
import CardActions from '@mui/material/CardActions' 
import CardContent from '@mui/material/CardContent' 
import CardMedia from '@mui/material/CardMedia' 
import CssBaseline from '@mui/material/CssBaseline' 
import Grid from '@mui/material/Grid' 
import Box from '@mui/material/Box' 
import Card from '@mui/material/Card' 
import Typography from '@mui/material/Typography' 
import Container from '@mui/material/Container' 
import { createTheme, ThemeProvider } from '@mui/material/styles' 
import GroupedButton from './GroupedButton' 
import { useState, useEffect } from "react" 
import { CardActionArea } from '@mui/material' 
import { useParams } from 'react-router-dom'
import axios from 'axios'

const theme = createTheme() 


const ProductCard = (props) => {

	const card = props.card
	const productName = card.name 
	const productDescription = card.description 
	const productPrice = card.price 
	const [productQuantity, setProductQuantity] = useState(card.quantity) 
	const productID = card.id 
	const [quantityToBuy, setQuantityToBuy] = useState(0)
	const user = localStorage.getItem('userID')

	const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    }) 

    const toggleDrawer = (anchor, open) => (event) => {
		console.log(anchor)
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return 
        }

        setState({ ...state, [anchor]: open }) 
    } 

	const anchor = 'right' 
	
	
	const resetQuantity = (e) => {
		const cartItem = {
			product: productID,
			buyer: user,
			quantity: quantityToBuy
		}
		axios.post(`http://127.0.0.1:8000/Shopping/Cart/${user}/`, cartItem)
		
		console.log(anchor)
		toggleDrawer(anchor, false)(e)
		if (!quantityToBuy) return 
		console.log(quantityToBuy + ' Items added') 
		setQuantityToBuy(0)
	}

	
    const sidedrawer = (anchor) => (
		<div>
			<Box
				sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
				role="presentation"
				onClick={toggleDrawer(anchor, false)}
				onKeyDown={toggleDrawer(anchor, false)}
			>
			</Box>

			<Grid sx={{
				display: 'flex',
				flexDirection: 'column'
			}}>
				<CardMedia
                    component="img"
                    image={card.image}
                    alt="random"
                    sx={{
						height: '400px',
						boxShadow: '6px 6px 5px rgba(0, 0, 0, 0.3)',
                        width: "400px",
                        display: 'flex',
						marginY: '50px',
						marginX: 'auto',
                    }}
                />
				<CardContent sx={{
					flexGrow: 1,
					marginTop: '20px',
					marginX: 'auto'
				}}>
					<Typography gutterBottom variant="h4" component="h2" sx={{
						marginX: 'auto',
					}}>
						{productName}
					</Typography>
				</CardContent>
				<CardContent sx={{
					flexGrow: 1,
					marginX: 'auto',
					marginY: '10px',
					paddingY: 0
				}}>
					<Typography>
						{productDescription}
					</Typography>
				</CardContent>
				<CardContent sx={{
					flexGrow: 1,
					marginX: 'auto',
					marginY: '10px',
					paddingY: 0
				}}>
					<Typography>
						Quantity Available: {productQuantity}
					</Typography>
				</CardContent>
				<CardContent sx={{
					flexGrow: 1,
					marginX: 'auto',
					marginY: '10px',
					paddingY: 0
				}}>
					<Typography>
						Price: &#8377; {productPrice}
					</Typography>
				</CardContent>

				<Card sx={{
					boxShadow: 0,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'spaceBetween',
					marginTop: '10px'
				}}>
					<GroupedButton
						sx={{
							marginLeft: '10px',
						}}
						quantity={productQuantity}
						setQuantity={setProductQuantity}
						quantityToBuy={quantityToBuy}
						setQuantityToBuy={setQuantityToBuy}
					/>
					<Button size="large" sx={{
						width: '200px',
						height: '40px',
						marginY: '10px'
					}} variant="contained" onClick={resetQuantity}>ADD TO CART</Button>
				</Card>
			</Grid>


		</div>
    ) 


	return (
		<Grid item id={productID} xs={12} sm={6} md={3}>
			<CardActionArea
				onClick = {toggleDrawer(anchor, true)}
				sx={{ 
					height: '400px', 
					display: 'flex',
					flexDirection: 'column', 
					boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
				}}
			>	
				<CardMedia component="img" image={card.image} alt="random" sx={{
					height: '300px',

				}}/>
				<CardContent sx={{
					flexGrow: 1,
					marginRight: 'auto',
				}}>
					<Typography gutterBottom variant="h5" component="h2">
						{productName}
					</Typography>
					<Typography>
						&#8377; {productPrice}
					</Typography>
				</CardContent>
				<CardActions sx={{
					display: 'none',
				}}>


					
				</CardActions>
			</CardActionArea>
			<Drawer
				anchor={anchor}
				open={state[anchor]}
				onClose={toggleDrawer(anchor, false)}
			>
				{sidedrawer(anchor)}
			</Drawer>
		</Grid>
	)
}


export default function Shop() {

	
	const [cards, setCards] = useState([]) 
	const shopId = useParams().id

	useEffect(() => {
		fetch('http://127.0.0.1:8000/Products/')
		.then(res => {
			return res.json() 
		})
		.then(data => {
			setCards(data) 
		})
	}, []) 

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				<Box
					sx={{
						bgcolor: 'background.paper',
						pt: 8,
						pb: 6,
					}}
				>
				</Box>
				<Container sx={{
					py: 3,
				}} maxWidth="lg">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{cards.map((card) => (
							(card.store.toString() === shopId) && 
							<ProductCard
								card = {card}
								key = {card.id}
							/>
						))}
					</Grid>
				</Container>
			</main>
		</ThemeProvider>
	) 
}