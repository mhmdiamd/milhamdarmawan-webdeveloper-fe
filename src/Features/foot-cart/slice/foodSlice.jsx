import { createSlice } from "@reduxjs/toolkit";


const foodCartSlice = createSlice({
  name: 'cart',
  initialState : {
    foods: localStorage.getItem('bill') ? 
      JSON.parse(localStorage.getItem('bill'))
    : []
  },
  reducers: {
    addToCart: (state, { payload }) => {
      // Check the food firts
      const foodFiltered = state.foods.filter(food => food.id == payload.id)
      if(foodFiltered.length != 0){

        const foodWithoutDataFilter = state.foods.filter(food => food.id != payload.id)
        // Update the quantity
        foodWithoutDataFilter.push({
          ...foodFiltered[0],
          quantity: foodFiltered[0].quantity + 1
        }) 

        state.foods = foodWithoutDataFilter
      }else{
        state.foods.push({...payload, quantity: 1})
      }
    },
    deleteFromCart: (state, { payload }) => {
      const newCart = state.foods.filter(food => food.id != payload.id)
      state.foods = newCart
    },

    clearCart: (state, {payload}) => {
      state.foods = []
    }
  }
})

export const { addToCart, deleteFromCart, clearCart } = foodCartSlice.actions
export default foodCartSlice.reducer