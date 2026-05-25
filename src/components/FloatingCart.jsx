import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingCart() {
  const { itemCount, toggleCart, isCartOpen, isCheckoutOpen } = useCart();

  if (isCheckoutOpen) return null;

  return (
    <AnimatePresence>
      {itemCount > 0 && !isCartOpen && (
        <motion.button
          className="floating-cart-btn"
          onClick={toggleCart}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ShoppingCart size={24} />
          <motion.span
            className="floating-cart-badge"
            key={itemCount}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {itemCount}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
