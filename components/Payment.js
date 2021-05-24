import React, { useState, useEffect } from 'react';
//import Header from './Header';
import './Payment.css';
import { useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import CheckoutProduct  from './CheckoutProduct';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from '../axios';
import { db } from '../firebase';

function Payment() {
    const [{basket, user}, dispatch]  = useStateValue();
    const history = useHistory();
    const [totalAmount, setTotalAmount] = useState(0);

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        
        const getClientSecret = async () => {
            const response = await axios({
                method: 'POST',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`

            })
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
        //console.log("secret ", clientSecret);
        const price = getBasketTotal(basket);
        setTotalAmount(price);
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)

    const submitHandler = async (event) => {

        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    //amount: totalAmount,
                    created: paymentIntent.created
                })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            });

            history.replace('/orders')
        })

        

    }

    const changeHandler = (event) => {

        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
    }

    return (
        <div className='payment'>
            <h1>Checkout ({basket.length} items)</h1>
            <div className='payment__container'>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>256 Lane south</p>
                        <p>Los Angles, CA</p>
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivary</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct 
                                id = {item.id}
                                title ={item.title}
                                price= {item.price}
                                rating = {item.rating}
                                image = {item.image}
                            />
                        ))}
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                            <form onSubmit={submitHandler}>
                                <CardElement onChange={changeHandler}/>

                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled={disabled || processing || succeeded}>
                                        <span>{processing ? <p>Processing..</p> : "buy Now"}</span>
                                    </button>
                                </div>
                                {error && <div>{error}</div>}
                            </form>
                            
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Payment
