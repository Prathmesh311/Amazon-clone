import { act } from "react-dom/test-utils";

export const initialState = {
    basket: [],
    totalItems: 0,
    totalPrice: 0, 
    user: null
}

export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0);


const reducer = (state, action) => {
    console.log(action);

    switch(action.type){
        case 'ADD_TO_BASKET':
            return{
                ...state,
                basket: [...state.basket, action.item],
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + action.item.price
            }

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(basket => basket.id === action.id);

            let newbasket = [...state.basket];
            if(index >= 0){
                newbasket.splice(index, 1);
                state.totalItems = state.totalItems - 1;
            }else{
                console.log(`Can't remove product ${action.id} as it's not in basket`);
            }

            return{
                ...state,
                basket: newbasket
            }
        case 'SET_USER':
            return{
                ...state,
                user: action.user
            }

        case 'EMPTY_BASKET':
            return{
                ...state,
                basket: [] 
            }
        
        default:
            return state;
    }
}

export default reducer;