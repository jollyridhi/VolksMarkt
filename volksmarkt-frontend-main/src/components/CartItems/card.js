import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import GroupedButtons from './GroupedButtons';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios'

export default function CartCard(props) {

    const {productName, description, quantity, price, cartItemId, totalq, id, list, setList, image, sum, setSum, dict} = props;
    
    const getTotalPrice = (quantity, price) => {
        return quantity*price;
    }

    const [totalPrice, setTotalPrice] = useState(getTotalPrice(quantity, price));

    const removeItemFromList = (e) => {

        setSum(sum - totalPrice)
        setTotalPrice(0)
        axios.delete(`http://127.0.0.1:8000/Shopping/CartItem/${cartItemId}/`)
        
        const newList = (list.filter((item) => {
            return item.id !== id;
        }))
        setList(newList);
    }

    return (
        <Card sx={{ 
            display: 'flex',
            height: '180px', 
            width: '60%',
            flexDirection: 'row',
            borderRadius: 0, 
            boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.25)',
            margin: '10px auto',
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ 
                    flex: '1 0 auto', 
                    marginX: '30px',
                }}>
                    <Typography component="div" variant="h5">
                        {productName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {description}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Price: {price}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Total Price: {totalPrice}
                    </Typography>
                    <div>
                        <GroupedButtons 
                            removeFromList={removeItemFromList} 
                            quantity={quantity} 
                            price={price} 
                            setTotalPrice={setTotalPrice}
                            totalq={totalq}
                            sum={sum}
                            setSum={setSum}
                            cartItemID = {cartItemId}
							dict = {dict}
							id = {id}
                        />
                        <Button variant="outlined" onClick={removeItemFromList} sx={{
                            marginLeft: '20px',
                            height: '30px'
                        }} startIcon={<DeleteIcon />}>
                            REMOVE ITEM
                        </Button>
                    </div>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ 
                    height: '100%',
                    width: '30%',
                    alignSelf: 'flex-end',
                    marginLeft: 'auto',
                }}
                image={image}
                alt="Live from space album cover"
            />
        </Card>
    );
}
