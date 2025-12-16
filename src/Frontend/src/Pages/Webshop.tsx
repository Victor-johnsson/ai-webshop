import React, { useState } from "react";
import { useMemo } from 'react';
import { useQuery } from "react-query";
import { CartItemType, getProducts } from "../Services/service";
import AppBarComponent from "../Components/AppBarComponent";
import ProductList from "../Components/ProductList";
import SiteReview from "../Components/SiteReview";
import Dialog from "../ui/Dialog";
import Button from "../ui/Button";
import Pagination from "../ui/Pagination";
import LinearProgress from "../ui/Progress";
import Cart from "../Components/Cart";
import "../styles.css";

export default function Webshop() {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    ["products"],
    getProducts,
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const [reviewOpen, setReviewOpen] = useState(false);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>;

  const paginatedData =
    data?.slice((page - 1) * itemsPerPage, page * itemsPerPage) || [];

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item,
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[]),
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      <AppBarComponent
        title="WebshopX"
        showCart
        cartItemCount={cartItems.reduce((acc, item) => acc + item.amount, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <Cart
        cartOpen={cartOpen}
        onCartClose={() => setCartOpen(false)}
        cartItems={cartItems}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
        clearCart={handleClearCart}
      />

      <div className="container mx-auto mt-20 px-4">
        <div className="grid grid-cols-1 gap-6">
          <ProductList
            products={paginatedData}
            onAction={handleAddToCart}
            actionLabel="Add to Cart"
          />
        </div>

        <div className="flex justify-center mt-5">
          <Pagination
            count={Math.ceil((data?.length || 0) / itemsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </div>
      </div>
      {/* Review Button + Modal Dialog */}
      <div className="flex justify-center my-8">
        <Button variant="outlined" onClick={() => setReviewOpen(true)}>
          Site Reviews
        </Button>
      </div>
      <Dialog open={reviewOpen} onClose={() => setReviewOpen(false)} title={"Site Reviews"}>
        <SiteReview />
        <div className="flex justify-center py-2">
          <Button onClick={() => setReviewOpen(false)} variant="outlined">Close</Button>
        </div>
      </Dialog>

    </div>
  );
}
