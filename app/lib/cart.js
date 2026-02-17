// Cart utility functions using localStorage

export const getCart = () => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('abaya_cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item) => {
  if (typeof window === 'undefined') return;
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (cartItem) =>
      cartItem.id === item.id &&
      cartItem.size === item.size &&
      cartItem.color === item.color &&
      cartItem.collection === item.collection
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  localStorage.setItem('abaya_cart', JSON.stringify(cart));
  // Dispatch custom event to update cart count
  window.dispatchEvent(new Event('cartUpdated'));
  return cart;
};

export const removeFromCart = (index) => {
  if (typeof window === 'undefined') return;
  const cart = getCart();
  cart.splice(index, 1);
  localStorage.setItem('abaya_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
  return cart;
};

export const updateCartItemQuantity = (index, quantity) => {
  if (typeof window === 'undefined') return;
  const cart = getCart();
  if (quantity <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = quantity;
  }
  localStorage.setItem('abaya_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
  return cart;
};

export const clearCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('abaya_cart');
  window.dispatchEvent(new Event('cartUpdated'));
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};
