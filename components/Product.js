import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';

function Product(props) {
    const [{basket}, dispatch] = useStateValue();

    const addItem = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                key: props.id,
                id: props.id,
                title: props.title,
                price: props.price,
                rating: props.rating,
                image: props.image
            }
        });
    }

    return (
        <div className='product'>
            <div className='product__info'>
                <p>{props.title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{props.price}</strong>
                </p>
                <div className='product__rating'>
                    {Array(props.rating).fill().map((_, i) => (
                        <p>⭐</p>
                    ))}
                </div>
                
            </div>
            <img src={props.image}
                alt="product img" />
            <button onClick={addItem}>Add to Basket</button>
        </div>
    )
}

export default Product
