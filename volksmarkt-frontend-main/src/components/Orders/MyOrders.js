import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer' 


const theme = createTheme();

const OrderItem = (props) => {

    const [card, setCard] = useState(({
        product: {
            name: " ",
            image: "https://source.unsplash.com/random"
        }
    }))

    useEffect(() => {
		fetch(`http://127.0.0.1:8000/Shopping/ViewOrderItem/${props.id}/`)
		.then(res => {
			return res.json() 
		})
		.then(data => {
			setCard(data) 
		})
	}, [])

    const product = card.product

    return (
        <Grid item id={props.id} xs={12} sx={{
            marginY: '20px',

        }}>
            <Card
                sx={{ height: '200px', display: 'flex', flexDirection: 'row' , borderRadius: '15px'}}
            >
                <Paper sx={{
                    marginRight: 'auto',
                    boxShadow: 'none',
                }}>
                    <Card sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        boxShadow: 'none',
                        width: '100%'
                    }}>
                        <CardContent sx={{
                            flexGrow: 1,
                            marginTop: '20px',
                            marginLeft: '30px',
                        }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {product.name}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Price: &#8377;{product.price}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Quantity: {card.quantity}
                            </Typography>
                        </CardContent>
                    </Card>
                </Paper>
                <CardMedia
                    component="img"
                    image={"http://127.0.0.1:8000" + product.image}
                    sx={{
                        height: "200px",
                        width: "200px",
                        display: 'flex',
                        alignSelf: 'flex-end'
                    }}
                />
            </Card>
        </Grid>
    )

}


const OrderCard = (props) => {

    const {cost, address, date, items} = props

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

	const anchor = 'right'
    const [rep, setRep] = useState({product:{image: "https://source.unsplash.com/random"}})
    useEffect(() => {
		fetch(`http://127.0.0.1:8000/Shopping/ViewOrderItem/${items[0]}/`)
		.then(res => {
			return res.json() 
		})
		.then(data => {
			setRep(data) 
		})
	}, [])
	
    const sidedrawer = (anchor) => (

		<Box sx={{
            width: '600px',
        }}>
			<Box
				sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
				role="presentation"
				onClick={toggleDrawer(anchor, false)}
				onKeyDown={toggleDrawer(anchor, false)}
			>
			</Box>
            <Box sx={{
				display: 'flex',
				flexDirection: 'column',
                marginX: '40px',
                marginY: '30px',
                padding: '20px',
                borderBottom: '3px solid black'
			}}>
                <Typography gutterBottom variant="h5" component="h2" sx={{marginX: 'auto'}}>
                    ORDER DETAILS
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" sx={{marginX: 'auto'}}>
                    Date Of Purchase: {props.date}
                </Typography>
            </Box>

			<Grid sx={{
                display: 'flex',
				flexDirection: 'column',
                marginX: '40px',
                marginY: '30px'
			}}>
                {
                    items.map((item) => (
                        <OrderItem id={item} key={item}/>
                    ))
                }
			</Grid>

            <Box sx={{
				display: 'flex',
				flexDirection: 'column',
                marginX: '40px',
                marginY: '30px',
                padding: '20px',
                borderTop: '3px solid black'
			}}>
                
                <Typography gutterBottom variant="h5" component="h2" sx={{
                    marginLeft: 'auto', 
                    marginRight: 0,
                }}>
                    Total:  &#8377;{props.cost}
                </Typography>
            </Box>


		</Box>
    ) 

    return (

        <>
            <Grid>
                <Card
                    sx={{
                        height: '200px',
                        display: 'flex', 
                        flexDirection: 'row', 
                        marginY: '20px',
                        marginLeft: 0,
                        border: '1px solid black',
                        borderRadius: '20px'
                    }}
                >
                    <Paper sx={{
                        marginX: 'auto',
                        boxShadow: 'none',
                    }}>
                        <Card sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            boxShadow: 'none',
                            width: '650px'
                        }}>
                            <CardContent sx={{
                                flexGrow: 1,
                                marginTop: '10px',
                                marginLeft: '30px',
                            }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Date of Purchase: {date}
                                </Typography>
                                <Typography>
                                    Total Cost: &#8377;{cost}
                                </Typography>
                                <Typography>
                                    Delivery Address: {address}
                                </Typography>
                            </CardContent>
                        </Card>
                        <CardActions sx={{
                            marginLeft: '40px',
                            paddingTop: 0
                        }}>
                            <Button size="medium" onClick = {toggleDrawer(anchor, true)} sx={{
                                height: '30px',
                            }} variant="contained">VIEW ORDER DETAILS</Button>
                            {/* <Button size="medium" sx={{
                                height: '30px'
                            }} variant="contained">BUY AGAIN</Button> */}
                        </CardActions>
                    </Paper>
                    <CardMedia
                        component="img"
                        image={"http://127.0.0.1:8000" + rep.product.image}
                        sx={{
                            height: "200px",
                            width: "200px",
                            display: 'flex',
                            alignSelf: 'flex-end'
                        }}
                    />
                </Card>
            </Grid>
            <Drawer
				anchor={anchor}
				open={state[anchor]}
				onClose={toggleDrawer(anchor, false)}
			>
				{sidedrawer(anchor)}
			</Drawer>
        </>
    )
}


export default function MyOrders() {

    const [cardss, setCardss] = useState([])
    const user = localStorage.getItem('userID')

    useEffect(() => {
		fetch(`http://127.0.0.1:8000/Shopping/MyOrders/${user}/`)
		.then(res => {
			return res.json() 
		})
		.then(data => {
			setCardss(data) 
		})
	}, [])

    const cards = []
    for(var i = cardss.length-1; i >= 0; i -= 1){
        cards.push(cardss[i])
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                        border: '2px solid rgba(0, 0, 0, 0.3)',
                        paddingTop: '15px',
                        paddingBottom: '1px',
                        width: '600px',
                        marginX: 'auto',
                        marginY: '40px',
                        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
                        borderRadius: '15px'
                    }}
                >
                    <Typography gutterBottom variant="h4" component="h1" sx={{
                        marginX: 'auto',
                        fontWeight: 'bold',
                        fontSize: '45px',
                    }}>
                        <Container sx={{
                            marginX: 'auto',
                            textAlign: 'center',
                        }}>MY PAST ORDERS</Container>
                    </Typography>
                </Box>
                <Container sx={{
                    py: 3,
                    width: '850px',
                }} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <OrderCard
                                cost = {card.total_cost}
                                address = {card.deliveryaddress}
                                date = {card.order_date}
                                items = {card.order_items}
                                key = {card.id}
                            />
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}