import React, { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext();

const DELIVERY_CHARGE = 49;
const TAX_RATE = 0.05; // 5% GST
const FREE_DELIVERY_MIN = 500;
const MAX_DELIVERY_KM = 10;

// Pincodes within delivery range (simulated)
const DELIVERABLE_PINCODES = [
  '570001', '570002', '570003', '570004', '570005',
  '570006', '570007', '570008', '570009', '570010',
  '570011', '570012', '570014', '570015', '570016',
  '570017', '570018', '570019', '570020', '570023',
  '570024', '570025', '570026', '570027', '570028',
  '570029', '570030', '570031'
];

const initialState = {
  items: [],
  isCartOpen: false,
  isCheckoutOpen: false,
  isOrderSuccess: false,
  deliveryAvailable: null, // null = not checked, true/false
  deliveryPincode: '',
  orderDetails: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(i => i.id === action.payload.id);
      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1
        };
        return { ...state, items: updatedItems };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        )
      };
    }
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'OPEN_CART':
      return { ...state, isCartOpen: true };
    case 'CLOSE_CART':
      return { ...state, isCartOpen: false };
    case 'OPEN_CHECKOUT':
      return { ...state, isCheckoutOpen: true, isCartOpen: false };
    case 'CLOSE_CHECKOUT':
      return { ...state, isCheckoutOpen: false };
    case 'SET_DELIVERY_STATUS':
      return { ...state, deliveryAvailable: action.payload.available, deliveryPincode: action.payload.pincode };
    case 'ORDER_SUCCESS':
      return { ...state, isOrderSuccess: true, isCheckoutOpen: false, items: [], orderDetails: action.payload };
    case 'CLOSE_ORDER_SUCCESS':
      return { ...state, isOrderSuccess: false, orderDetails: null };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), []);
  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), []);
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);
  const openCheckout = useCallback(() => dispatch({ type: 'OPEN_CHECKOUT' }), []);
  const closeCheckout = useCallback(() => dispatch({ type: 'CLOSE_CHECKOUT' }), []);
  const closeOrderSuccess = useCallback(() => dispatch({ type: 'CLOSE_ORDER_SUCCESS' }), []);

  const checkDelivery = useCallback((pincode) => {
    const available = DELIVERABLE_PINCODES.includes(pincode.trim());
    dispatch({ type: 'SET_DELIVERY_STATUS', payload: { available, pincode: pincode.trim() } });
    return available;
  }, []);

  const placeOrder = useCallback((formData) => {
    const orderNumber = 'GF' + Date.now().toString(36).toUpperCase();
    dispatch({
      type: 'ORDER_SUCCESS',
      payload: { ...formData, orderNumber, estimatedTime: '35-45 min' }
    });
  }, []);

  // Computed values
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const deliveryCharge = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_CHARGE;
  const grandTotal = subtotal + tax + deliveryCharge;

  const getItemQuantity = useCallback((id) => {
    const item = state.items.find(i => i.id === id);
    return item ? item.quantity : 0;
  }, [state.items]);

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    toggleCart,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
    closeOrderSuccess,
    checkDelivery,
    placeOrder,
    itemCount,
    subtotal,
    tax,
    deliveryCharge,
    grandTotal,
    getItemQuantity,
    FREE_DELIVERY_MIN,
    MAX_DELIVERY_KM,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
