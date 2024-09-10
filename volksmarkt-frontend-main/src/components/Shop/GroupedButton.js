import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function GroupedButton(props) {

    const {quantity, quantityToBuy, setQuantityToBuy} = props;

    const handleIncrement = () => {
        if(quantityToBuy+1 <= quantity){
            setQuantityToBuy(quantityToBuy+1);
        }
    };
    
    const handleDecrement = () => {
        if(quantityToBuy >= 1){
            setQuantityToBuy(quantityToBuy-1);
        }
    };

    return (
        <ButtonGroup size="medium" aria-label="outlined primary button group" variant="outlined" sx={{
            marginY: '10px',
            marginLeft: '80px',
            marginRight: '20px',
        }}>
            <Button onClick={handleDecrement} size="large" sx={{width: '50px', height: '40px'}}>-</Button>
            <Button size="large" sx={{width: '50px', height: '40px'}}>{quantityToBuy}</Button>
            <Button onClick={handleIncrement} size="large" sx={{width: '50px', height: '40px'}}>+</Button>
        </ButtonGroup>
    );
    
}
