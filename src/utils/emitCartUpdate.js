import { NativeEventEmitter } from 'react-native';

const cartEventEmitter = new NativeEventEmitter();
export const emitCartUpdate = () => {
  cartEventEmitter.emit('cartUpdated');
};

/**
 * Registers a callback to be invoked whenever the cart is updated
 * @param {Function} callback - The function to call when cart updates
 * @returns {Function} A cleanup function to remove the listener
 */
export const listenToCartUpdates = (callback) => {
  const subscription = cartEventEmitter.addListener(
    'cartUpdated',
    () => {
      callback();
    }
  );

  return () => {
    subscription.remove();
  };
};


export default cartEventEmitter;