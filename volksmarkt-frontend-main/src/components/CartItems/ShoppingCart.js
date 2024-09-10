import { Container } from "@mui/system"
import { Typography } from "@mui/material"
import CartCard from "./card"
import { Grid, Box, Button } from "@mui/material"
import { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import axios from "axios"


const TotalPrice = (props) => {
	return (
		<Typography component="div" variant="h5" sx={{
			textAlign: 'center',
		}}>
			Total Price: &#8377; {props.sum}
		</Typography>
	)
}


const ShoppingCart = () => {

	const history = useHistory()

	const [list, setList] = useState([])
	const [cart, setCart] = useState([])
	const [sum, setSum] = useState(0)

	var dict = {}
	var dict2 = {}
	var user = localStorage.getItem('userID')
	
	
	useEffect(() => {
		const foo = async () => {
			const data = await (await fetch(`http://127.0.0.1:8000/Shopping/Cart/${user}/`)).json()
			const tempList = await Promise.all(data.items.map(async (cartItem) => (await (await fetch(`http://127.0.0.1:8000/Products/${cartItem.product}/`)).json())))
			setCart(data.items)
			setList(tempList)
			setSum(data.cost)
		}
		foo()
	}, [])
	
	
	for (const cartItem of cart){
		dict[cartItem.product] = cartItem.quantity
		dict2[cartItem.product] = cartItem.id
	}
	
	const handleOrder = (e) =>{
		console.log(e)

		const newList = []
		console.log(list)
		for(const item of list){
			const obj = {
				product: item.id,
				buyer: user,
				quantity: dict[item.id],
			}
		}

		const z = {
			deliveryaddress: "Hall 3",
			total_cost: sum,
		}

		console.log(newList)

		axios.post(`http://127.0.0.1:8000/Shopping/PlaceOrder/${user}/`, z)

		alert('Order Placed')
		axios
          .get(
            `http://127.0.0.1:8000/buyer/details/${localStorage.getItem('userID')}/`
          )
          .then((res) => {
            console.log(res.data["wallet"]);
            localStorage.setItem("userWallet", res.data["wallet"]);
          });
		history.push('/')
	}

	return (
		<Container>
			<Typography
				component="h1"
				variant="h3"
				align="center"
				color="text.primary"
				gutterBottom
				marginY={5}
			>
				Shopping Cart
			</Typography>
			<Grid container direction="column">
				{list.map((card) => (
					<CartCard
						productName={card.name}
						description={card.description}
						quantity={dict[card.id]}
						totalq={card.quantity}
						price={card.price}
						id={card.id}
						list={list}
						cartItemId={dict2[card.id]}
						setList={setList}
						image={card.image}
						key={card.id}
						sum = {sum}
						setSum = {setSum}
						dict = {dict}
					/>
				))}
			</Grid>
			<Box sx={{
				width: '53%',
				height: '100px',
				marginX: 'auto',
				marginBottom: '40px',
				boxShadow: '6px 6px 5px rgba(0, 0, 0, 0.3)',
				padding: '40px'
			}}>
				<TotalPrice sum={sum}/>
				<Button size="large" variant="contained" onClick={handleOrder} sx={{
					marginLeft: '250px',
					marginTop: '30px'
				}}>PLACE ORDER</Button>
			</Box>
		</Container>
	)
}

export default withRouter(ShoppingCart)