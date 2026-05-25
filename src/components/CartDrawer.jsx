import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    items, isCartOpen, closeCart, removeItem, updateQuantity,
    subtotal, tax, deliveryCharge, grandTotal, itemCount,
    openCheckout, FREE_DELIVERY_MIN, MAX_DELIVERY_KM,
    checkDelivery, deliveryAvailable, deliveryPincode
  } = useCart();

  const [pincode, setPincode] = useState(deliveryPincode || '');
  const [pincodeChecked, setPincodeChecked] = useState(false);

  const handleCheckDelivery = () => {
    if (pincode.trim().length === 6) {
      checkDelivery(pincode);
      setPincodeChecked(true);
    }
  };

  const handleProceedCheckout = () => {
    if (items.length > 0) {
      openCheckout();
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 250 }}
          >
            {/* Header */}
            <div className="cart-drawer-header">
              <div className="cart-drawer-title-row">
                <ShoppingBag size={22} style={{ color: 'var(--primary-gold)' }} />
                <h3 className="cart-drawer-title">Your Cart</h3>
                <span className="cart-drawer-count">{itemCount} items</span>
              </div>
              <button className="cart-drawer-close" onClick={closeCart}>
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="cart-drawer-items">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={48} style={{ color: 'var(--text-cream-muted)', opacity: 0.3 }} />
                  <p className="cart-empty-text">Your cart is empty</p>
                  <p className="cart-empty-sub">Browse our menu and add some delicious items!</p>
                  <button className="btn-outline" onClick={closeCart} style={{ marginTop: '1rem', fontSize: '0.75rem' }}>
                    Browse Menu
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="cart-item"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-details">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <span className="cart-item-price">₹{item.price}</span>
                        <div className="cart-item-qty-row">
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="cart-qty-value">{item.quantity}</span>
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="cart-item-right">
                        <span className="cart-item-total">₹{item.price * item.quantity}</span>
                        <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Delivery Check */}
            {items.length > 0 && (
              <div className="cart-delivery-check">
                <div className="cart-delivery-header">
                  <MapPin size={16} style={{ color: 'var(--primary-gold)' }} />
                  <span>Check Delivery Availability</span>
                </div>
                <div className="cart-pincode-row">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '')); setPincodeChecked(false); }}
                    className="cart-pincode-input"
                  />
                  <button className="cart-pincode-btn" onClick={handleCheckDelivery} disabled={pincode.length !== 6}>
                    Check
                  </button>
                </div>
                {pincodeChecked && deliveryAvailable !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`cart-delivery-status ${deliveryAvailable ? 'available' : 'unavailable'}`}
                  >
                    <Truck size={16} />
                    {deliveryAvailable
                      ? `Home Delivery Available — within ${MAX_DELIVERY_KM}km radius`
                      : 'Home Delivery Not Available in Your Area'}
                  </motion.div>
                )}
              </div>
            )}

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="cart-drawer-footer">
                {subtotal < FREE_DELIVERY_MIN && (
                  <div className="cart-free-delivery-msg">
                    Add ₹{FREE_DELIVERY_MIN - subtotal} more for free delivery
                  </div>
                )}
                <div className="cart-summary-rows">
                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>GST (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Delivery</span>
                    <span>{deliveryCharge === 0 ? <span style={{ color: '#4ade80' }}>FREE</span> : `₹${deliveryCharge}`}</span>
                  </div>
                  <div className="cart-summary-row cart-summary-total">
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
                <button className="btn-gold cart-checkout-btn" onClick={handleProceedCheckout}>
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
