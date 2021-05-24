import React from 'react';
import './Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Order({ order }) {
    return (
        <div className='order'>
            <div className="order__header">
                <h2>Order</h2>
                <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
                
                <p className='order__id'>
                    Order ID: <small>{order.id}</small>
                </p>
            </div>

            {order.data.basket?.map(item => (
                <CheckoutProduct 
                    id = {item.id}
                    title= {item.title}
                    price= {item.price}
                    rating = {item.rating}
                    image = {item.image}
                    hideButton
                />
            ))}

            <CurrencyFormat
                renderText={(value) => (
                <>
                    <h3 className='order__total'>Order total: <strong>{value}</strong></h3>
                </>
                )}
                decimalScale={2}
                value={order.data.amount / 100} // Part of the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    )
}

export default Order
