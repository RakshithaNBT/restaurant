import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, MapPin, Phone, User, CreditCard, FileText, Truck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const {
    items, isCheckoutOpen, closeCheckout, openCart,
    subtotal, tax, deliveryCharge, grandTotal,
    checkDelivery, deliveryAvailable, placeOrder, FREE_DELIVERY_MIN, MAX_DELIVERY_KM
  } = useCart();

  const [form, setForm] = useState({
    name: '', phone: '', address: '', landmark: '',
    pincode: '', payment: 'cod', instructions: ''
  });
  const [errors, setErrors] = useState({});
  const [pincodeChecked, setPincodeChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));

    if (name === 'pincode' && value.replace(/\D/g, '').length === 6) {
      const cleaned = value.replace(/\D/g, '');
      setForm(prev => ({ ...prev, pincode: cleaned }));
      checkDelivery(cleaned);
      setPincodeChecked(true);
    } else if (name === 'pincode') {
      setPincodeChecked(false);
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim() || form.phone.length < 10) errs.phone = 'Valid phone number is required';
    if (!form.address.trim()) errs.address = 'Delivery address is required';
    if (!form.pincode.trim() || form.pincode.length !== 6) errs.pincode = 'Valid 6-digit pincode is required';
    if (pincodeChecked && !deliveryAvailable) errs.pincode = 'Delivery not available in this area';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!pincodeChecked) {
      checkDelivery(form.pincode);
      setPincodeChecked(true);
      return;
    }
    if (!deliveryAvailable) return;
    placeOrder({ ...form, items, grandTotal });
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          className="checkout-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="checkout-container"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className="checkout-header">
              <button className="checkout-back-btn" onClick={() => { closeCheckout(); openCart(); }}>
                <ArrowLeft size={20} />
                <span>Back to Cart</span>
              </button>
              <h2 className="checkout-title">Checkout</h2>
              <button className="checkout-close-btn" onClick={closeCheckout}>
                <X size={22} />
              </button>
            </div>

            <div className="checkout-body">
              {/* Form Section */}
              <form className="checkout-form" onSubmit={handleSubmit}>
                <h3 className="checkout-section-heading">
                  <User size={18} />
                  <span>Delivery Details</span>
                </h3>

                <div className="checkout-field">
                  <label>Customer Name *</label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} placeholder="Your full name"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="checkout-error">{errors.name}</span>}
                </div>

                <div className="checkout-field">
                  <label>Phone Number *</label>
                  <input
                    type="tel" name="phone" value={form.phone}
                    onChange={handleChange} placeholder="+91 98860 12345" maxLength={10}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="checkout-error">{errors.phone}</span>}
                </div>

                <div className="checkout-field">
                  <label>Delivery Address *</label>
                  <textarea
                    name="address" value={form.address}
                    onChange={handleChange} placeholder="House/Flat no, Street, Area"
                    className={errors.address ? 'error' : ''} rows={3}
                  />
                  {errors.address && <span className="checkout-error">{errors.address}</span>}
                </div>

                <div className="checkout-row-2col">
                  <div className="checkout-field">
                    <label>Landmark</label>
                    <input
                      type="text" name="landmark" value={form.landmark}
                      onChange={handleChange} placeholder="Near..."
                    />
                  </div>
                  <div className="checkout-field">
                    <label>Pincode *</label>
                    <input
                      type="text" name="pincode" value={form.pincode}
                      onChange={handleChange} placeholder="570011" maxLength={6}
                      className={errors.pincode ? 'error' : ''}
                    />
                    {errors.pincode && <span className="checkout-error">{errors.pincode}</span>}
                  </div>
                </div>

                {/* Delivery Status */}
                {pincodeChecked && deliveryAvailable !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`checkout-delivery-badge ${deliveryAvailable ? 'available' : 'unavailable'}`}
                  >
                    {deliveryAvailable ? <Truck size={18} /> : <AlertTriangle size={18} />}
                    <span>
                      {deliveryAvailable
                        ? `Home Delivery Available — within ${MAX_DELIVERY_KM}km radius`
                        : 'Home Delivery Not Available in Your Area. Please try a different pincode.'}
                    </span>
                  </motion.div>
                )}

                <h3 className="checkout-section-heading" style={{ marginTop: '2rem' }}>
                  <CreditCard size={18} />
                  <span>Payment Method</span>
                </h3>

                <div className="checkout-payment-options">
                  {[
                    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                    { id: 'upi', label: 'UPI Payment', icon: '📱' },
                    { id: 'card', label: 'Card Payment', icon: '💳' },
                  ].map(opt => (
                    <label
                      key={opt.id}
                      className={`checkout-payment-card ${form.payment === opt.id ? 'selected' : ''}`}
                    >
                      <input
                        type="radio" name="payment"
                        value={opt.id} checked={form.payment === opt.id}
                        onChange={handleChange}
                      />
                      <span className="checkout-payment-icon">{opt.icon}</span>
                      <span className="checkout-payment-label">{opt.label}</span>
                    </label>
                  ))}
                </div>

                <div className="checkout-field" style={{ marginTop: '1.5rem' }}>
                  <label><FileText size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />Special Instructions</label>
                  <textarea
                    name="instructions" value={form.instructions}
                    onChange={handleChange} placeholder="Any allergies, spice preferences, etc."
                    rows={2}
                  />
                </div>

                <button type="submit" className="btn-gold checkout-submit-btn">
                  Place Order — ₹{grandTotal}
                </button>
              </form>

              {/* Order Summary Sidebar */}
              <div className="checkout-summary-panel glass-panel">
                <h3 className="checkout-summary-title">Order Summary</h3>
                <div className="checkout-summary-items">
                  {items.map(item => (
                    <div key={item.id} className="checkout-summary-item">
                      <img src={item.image} alt={item.name} className="checkout-summary-item-img" />
                      <div className="checkout-summary-item-info">
                        <span className="checkout-summary-item-name">{item.name}</span>
                        <span className="checkout-summary-item-qty">x{item.quantity}</span>
                      </div>
                      <span className="checkout-summary-item-price">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="checkout-summary-divider"></div>
                <div className="checkout-summary-rows">
                  <div className="checkout-summary-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="checkout-summary-row">
                    <span>GST (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="checkout-summary-row">
                    <span>Delivery</span>
                    <span>{deliveryCharge === 0 ? <span style={{ color: '#4ade80' }}>FREE</span> : `₹${deliveryCharge}`}</span>
                  </div>
                  {subtotal < FREE_DELIVERY_MIN && (
                    <div className="checkout-free-del-hint">
                      Add ₹{FREE_DELIVERY_MIN - subtotal} more for free delivery
                    </div>
                  )}
                  <div className="checkout-summary-divider"></div>
                  <div className="checkout-summary-row checkout-summary-grand">
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
