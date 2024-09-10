import * as React from 'react' 
import Typography from '@mui/material/Typography' 
import Grid from '@mui/material/Grid' 
import { Container } from '@mui/system' 
import { Paper, ButtonBase, Button } from '@mui/material' 
import { styled } from "@mui/material/styles" 
import FormDialog from "./AddItemModal"
import FormDialog1 from "./EditItemModal"
import { useState, useEffect } from 'react' 
import axios from 'axios'


const Img = styled('img')({
	margin: 'auto',
	display: 'block',
	maxWidth: '100%',
	maxHeight: '100%',
}) 


function ComplexGrid(props) {

	const product = props.product 
	const flag = props.flag
	const setFlag = props.setFlag

	const deleteItem = () => {
		axios.delete(`http://127.0.0.1:8000/Products/${product.id}/`)
		props.setFlag(props.flag===true ? false : true) 
	}

	return (
		<Paper
			sx={{
				p: 2,
				margin: 'auto',
				maxWidth: 800,
				flexGrow: 1,
				marginBottom: 3,
				backgroundColor: (theme) =>
					theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
			}}

		>
			<Grid container spacing={2} width={800}>
				<Grid item>
					<ButtonBase sx={{ width: 128, height: 128 }}>
						<Img alt="complex" src={"http://127.0.0.1:8000" + product.image} />
					</ButtonBase>
				</Grid>
				<Grid item xs={12} sm container>
					<Grid item xs container direction="column" spacing={2}>
						<Grid item xs>
							<Typography gutterBottom variant="h6" component="div">
								{product.name}
							</Typography>
							<Typography variant="body2" gutterBottom>
								{product.description}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Quantity: {product.quantity}
							</Typography>
						</Grid>
						<Grid item sx={{
							display: 'flex',
							flexDirection: 'row',
							paddingTop: 0,
						}}>
							<FormDialog1 item={product} flag={flag} setFlag={setFlag} />
							<Button 
								variant="outlined"  
								sx={{
									marginLeft: '20px',
									height: '30px',
								}}
								onClick={deleteItem}
							>
								REMOVE ITEM
							</Button>
						</Grid>
					</Grid>
					<Grid item marginLeft={4}>
						<Typography variant="subtitle1" component="div">
						&#8377; {product.price}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	) 
}


function SellerDashboard() {

	const foo = [] 
	const [itemList, setItemList] = useState(foo) 
	const shop = localStorage.getItem('shopID')
	const [flag, setFlag] = useState(false) 

	useEffect(() => {
		fetch(`http://127.0.0.1:8000/Stores/${shop}/productlist/`)
		.then(res => {
			return res.json() 
		})
		.then(data => {
			setItemList(data) 
		})
	}, [flag]) 


	return (
		<Container>
			<Typography
				component="h1"
				variant="h3"
				align="center"
				color="text.primary"
				gutterBottom
				marginTop={5}
			>
				Seller's Dashboard
			</Typography>
			<Grid container direction="column">

				<FormDialog setFlag={setFlag} flag={flag} sx={{
					marginLeft: 50,
				}}/>
				{itemList.map((item) => (
					<ComplexGrid 
						key = {item.id}
						product = {item}
						flag = {flag}
						setFlag = {setFlag}
					/>
				))}

			</Grid>
		</Container>
	)
}

export default SellerDashboard 