import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const theme = createTheme();


const OrderItem = (props) => {

    const {prop} = props

    return (
        <Grid item id={prop.id} xs={12} sx={{
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
                                {prop.product.name}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Price: &#8377;{prop.product.price}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Quantity: {prop.quantity}
                            </Typography>
                        </CardContent>
                    </Card>
                </Paper>
                <CardMedia
                    component="img"
                    image={"http://127.0.0.1:8000" + prop.product.image}
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

    const {data} = props
    // console.log(props)


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
                    Date Of Purchase: {props.data.order_date}
                </Typography>
            </Box>

			<Grid sx={{
                display: 'flex',
				flexDirection: 'column',
                marginX: '40px',
                marginY: '30px'
			}}>
                {
                    props.data.order_items.map((item) => (
                        <OrderItem prop={item} key={item}/>
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
                    Total:  &#8377;{props.data.total_cost}
                </Typography>
            </Box>


		</Box>
    ) 

    return (

        <>
            <Grid item id={data.id} xs={12}>
                <Card
                    sx={{ height: '200px', display: 'flex', flexDirection: 'row', paddingBottom: '0'}}
                >
                    <Paper sx={{
                        marginRight: 'auto',
                        boxShadow: 'none',
                    }}>
                        <Card sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            boxShadow: 'none',
                            width: '650px',
                            paddingBottom: 0
                        }}>
                            <CardContent sx={{
                                flexGrow: 1,
                                marginTop: '20px',
                                marginLeft: '30px',
                                paddingBottom: '20px'
                            }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Date: {data.order_date}
                                </Typography>
                                <Typography>
                                    Cost: &#8377; {data.total_cost}
                                </Typography>
                                <Typography>
                                    Address: {data.deliveryaddress}
                                </Typography>
                            </CardContent>
                        </Card>
                        <CardActions sx={{
                            marginLeft: '40px',
                            marginTop: 0,
                            paddingTop: 0
                        }}>
                            <Button size="medium" onClick={toggleDrawer(anchor, true)} sx={{
                                height: '30px'
                            }} variant="contained">VIEW ORDER DETAILS</Button>
                        </CardActions>
                    </Paper>
                    <CardMedia
                        component="img"
                        image={"http://127.0.0.1:8000" + data.order_items[0].product.image}
                        alt="random"
                        sx={{
                            height: "200px",
                            width: "200px",
                            display: 'flex',
                            alignSelf: 'flex-end'
                        }}
                    />
                </Card>
                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    >
                        {sidedrawer(anchor)}
                </Drawer>
            </Grid>
        </>
    )
}


export default function SellersOrders() {

    const [cardss, setCards] = useState([])
    const shop = localStorage.getItem('shopID')

    useEffect(() => {
		fetch(`http://127.0.0.1:8000/Shopping/MyDeliveries/${shop}/`)
		.then(res => {
			return res.json() 
		})
		.then(data => {
			setCards(data) 
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
                        boxShadow: '6px 6px 5px rgba(0, 0, 0, 0.3)',
                        width: '55%',
                        marginX: 'auto',
                        fontWeight: 'bold',
                        fontSize: '45px',
                        marginTop: '20px'
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
                        }}>PAST ORDERS</Container>
                    </Typography>
                </Box>
                <Container sx={{
                    py: 3,
                }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <OrderCard
                                data = {card}
                                key = {card.id}
                            />
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}