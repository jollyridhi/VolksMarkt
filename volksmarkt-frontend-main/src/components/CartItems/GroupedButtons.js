import React from "react"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import { useState } from "react"
import axios from "axios"

export default function GroupedButtons(props) {

    const {removeFromList, quantity, price, setTotalPrice, cartItemID, totalq, sum, setSum, dict, id} = props

    const [state, setState] = useState({'counter':quantity})

    const handleIncrement = () => {
        console.log(state.counter+1, totalq)
        if(state.counter+1>totalq){
            alert('Maximum quantity available is ' + totalq)
            return
        }
        dict[id] += 1
        setState(state => ({ counter: state.counter + 1 }))
        if(setTotalPrice){
            setTotalPrice(price * (state.counter+1))
            const random = {
                quantity: state.counter+1,
                id: cartItemID,
            }
            axios.patch(`http://127.0.0.1:8000/Shopping/CartItem/${cartItemID}/`, random)
            var z = sum + price
            setSum(z)
        }
    }
    
    const handleDecrement = () => {
        dict[id] -= 1
        if(state.counter >= 1){
            setState(state => ({ counter: state.counter - 1 }))
            const random = {
                "quantity": state.counter-1
            }
            axios.patch(`http://127.0.0.1:8000/Shopping/CartItem/${cartItemID}/`, random)
        }
        if(state.counter === 1){
            removeFromList()
            setSum(sum - price)
            setTotalPrice(price * (state.counter-1))
            return
        }
        setSum(sum - price)
        setTotalPrice(price * (state.counter-1))
    }

    return (
        <ButtonGroup size="small" aria-label="outlined primary button group" variant="outlined">
            <Button onClick={handleDecrement}>-</Button>
            <Button>{state.counter}</Button>
            <Button onClick={handleIncrement}>+</Button>
        </ButtonGroup>
    )
    
}
