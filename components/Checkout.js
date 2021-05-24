import React from 'react';
import './Checkout.css';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import Product from './Product';
import { ListItemAvatar } from '@material-ui/core';

function Checkout() {
    const [{basket, user}, dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img 
                    className="ckeckout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="ad Poster"
                />
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkout__title">Your Shopping Cart</h2>
                </div>
                <div>
                    {basket.map((item) => (
                        <CheckoutProduct 
                            id = {item.id}
                            title= {item.title}
                            price= {item.price}
                            rating = {item.rating}
                            image = {item.image}
                        />
                    ))}
                </div>

            </div>
            <div className='checkout__right'>
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
