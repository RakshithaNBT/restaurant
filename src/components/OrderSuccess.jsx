import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, MapPin, Phone, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrderSuccess() {
  const { isOrderSuccess, orderDetails, closeOrderSuccess } = useCart();

  return (
    <AnimatePresence>
      {isOrderSuccess && orderDetails && (
        <motion.div
          className="order-success-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="order-success-card glass-panel"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <button className="order-success-close" onClick={closeOrderSuccess}>
              <X size={22} />
            </button>

            <motion.div
              className="order-success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
            >
              <CheckCircle2 size={64} />
            </motion.div>

            <motion.h2
              className="order-success-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Order Placed Successfully!
            </motion.h2>

            <motion.p
              className="order-success-sub"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Thank you for ordering from The Gilded Fork
            </motion.p>

            <motion.div
              className="order-success-details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="order-success-detail-row">
                <span className="order-success-label">Order Number</span>
                <span className="order-success-value order-id">{orderDetails.orderNumber}</span>
              </div>
              <div className="order-success-detail-row">
                <span className="order-success-label"><Clock size={14} /> Estimated Delivery</span>
                <span className="order-success-value">{orderDetails.estimatedTime}</span>
              </div>
              <div className="order-success-detail-row">
                <span className="order-success-label"><MapPin size={14} /> Delivery Address</span>
                <span className="order-success-value">{orderDetails.address}</span>
              </div>
              <div className="order-success-detail-row">
                <span className="order-success-label"><Phone size={14} /> Contact</span>
                <span className="order-success-value">{orderDetails.phone}</span>
              </div>
              <div className="order-success-detail-row order-success-total-row">
                <span className="order-success-label">Total Paid</span>
                <span className="order-success-value">₹{orderDetails.grandTotal}</span>
              </div>
            </motion.div>

            <motion.button
              className="btn-gold"
              style={{ width: '100%', marginTop: '2rem' }}
              onClick={closeOrderSuccess}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Continue Browsing
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
