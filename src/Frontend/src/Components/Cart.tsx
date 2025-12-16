import React, { useState } from 'react';
import Button from '../ui/Button';
import { CartItemType, placeOrder } from '../Services/service';

type Props = {
  cartOpen: boolean;
  onCartClose: () => void;
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export default function Cart({ cartOpen, onCartClose, cartItems, addToCart, removeFromCart, clearCart }: Props) {
  if (!cartOpen) return null;
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const total = cartItems.reduce((acc, it) => acc + it.price * it.amount, 0);

  const handlePlaceOrder = async () => {
    if (!name || !address || !email) {
      setError('Please fill in name, address and email');
      return;
    }

    const order = {
      orderLines: cartItems.map((it) => ({ productId: it.id, itemCount: it.amount })),
      customer: { name, address, email },
    };

    try {
      setLoading(true);
      setError(null);
      await placeOrder(order as any);
      setSuccess('Order placed successfully');
      clearCart();
      setCheckoutOpen(false);
      // keep success visible briefly
      setTimeout(() => setSuccess(null), 4000);
    } catch (e: any) {
      setError(e.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onCartClose} />
      <div className="w-96 bg-white p-4 shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <Button variant="ghost" onClick={onCartClose}>Close</Button>
        </div>
        <div className="space-y-3">
          {cartItems.length === 0 && <div>No items in cart.</div>}
          {cartItems.map((it) => (
            <div key={it.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-600">{it.amount} × ${it.price}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outlined" onClick={() => removeFromCart(it.id)}>-</Button>
                <Button onClick={() => addToCart(it)}>+</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">Total</div>
            <div className="font-bold">${total.toFixed(2)}</div>
          </div>
        </div>

        {success && <div className="text-green-600 mb-2">{success}</div>}
        {error && <div className="text-red-600 mb-2">{error}</div>}

        {!checkoutOpen ? (
          <div className="mt-4 flex justify-between">
            <Button variant="outlined" onClick={clearCart}>Clear</Button>
            <div className="flex gap-2">
              <Button onClick={() => setCheckoutOpen(true)}>Checkout</Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            <input className="w-full border rounded px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="w-full border rounded px-3 py-2" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="flex justify-end gap-2">
              <Button variant="outlined" onClick={() => setCheckoutOpen(false)}>Cancel</Button>
              <Button onClick={handlePlaceOrder} disabled={loading}>{loading ? 'Placing...' : 'Place Order'}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
