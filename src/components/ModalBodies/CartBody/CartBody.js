import helpers from "../../../helpers";
import CartItem from "../../CartItem/CartItem";
import {useState} from "react";

export default function CartBody(props){
    const [array, setArray] = useState(props.cartArray);



    const removeItem = (index) => {
        let cartArrayCopy = array;
        cartArrayCopy.splice(index, 1);
        props.setCartArrayCallback(cartArrayCopy);
        localStorage.setItem(helpers.localStorageKeys.cart, JSON.stringify(cartArrayCopy));
        setArray(cartArrayCopy);
    }

    return(
        <>
            {array.map((item, index) =>
                <CartItem
                    key={index}
                    item={item}
                    removeItemCallback={removeItem}
                    index={index}
                    setCartArrayCallback={props.setCartArrayCallback}
                />
            )}
        </>
    );
}
