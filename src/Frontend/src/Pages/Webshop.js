import React, { useState } from "react";
import { Box, Container, Grid, Pagination, LinearProgress, } from "@mui/material";
import { useQuery } from "react-query";
import { getProducts } from "../Services/service";
import AppBarComponent from "../Components/AppBarComponent";
import ProductList from "../Components/ProductList";
import SiteReview from "../Components/SiteReview";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Cart from "../Components/Cart";
import "../styles.css";
export default function Webshop() {
    const { data, isLoading, error } = useQuery(["products"], getProducts);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const [reviewOpen, setReviewOpen] = useState(false);
    if (isLoading)
        return React.createElement(LinearProgress, null);
    if (error)
        return React.createElement("div", null, "Something went wrong");
    const paginatedData = data?.slice((page - 1) * itemsPerPage, page * itemsPerPage) || [];
    const handleAddToCart = (clickedItem) => {
        setCartItems((prev) => {
            const isItemInCart = prev.find((item) => item.id === clickedItem.id);
            if (isItemInCart) {
                return prev.map((item) => item.id === clickedItem.id
                    ? { ...item, amount: item.amount + 1 }
                    : item);
            }
            return [...prev, { ...clickedItem, amount: 1 }];
        });
    };
    const handleRemoveFromCart = (id) => {
        setCartItems((prev) => prev.reduce((acc, item) => {
            if (item.id === id) {
                if (item.amount === 1)
                    return acc;
                return [...acc, { ...item, amount: item.amount - 1 }];
            }
            else {
                return [...acc, item];
            }
        }, []));
    };
    const handleClearCart = () => {
        setCartItems([]);
    };
    return (React.createElement(Box, null,
        React.createElement(AppBarComponent, { title: "WebshopX", showCart: true, cartItemCount: cartItems.reduce((acc, item) => acc + item.amount, 0), onCartClick: () => setCartOpen(true) }),
        React.createElement(Cart, { cartOpen: cartOpen, onCartClose: () => setCartOpen(false), cartItems: cartItems, addToCart: handleAddToCart, removeFromCart: handleRemoveFromCart, clearCart: handleClearCart }),
        React.createElement(Container, { sx: { marginTop: "80px", padding: "20px" } },
            React.createElement(Grid, { container: true, spacing: 3 },
                React.createElement(ProductList, { products: paginatedData, onAction: handleAddToCart, actionLabel: "Add to Cart" })),
            React.createElement(Box, { sx: { display: "flex", justifyContent: "center", marginTop: "20px" } },
                React.createElement(Pagination, { count: Math.ceil((data?.length || 0) / itemsPerPage), page: page, onChange: (_, value) => setPage(value), color: "primary" }))),
        React.createElement(Box, { sx: { display: "flex", justifyContent: "center", margin: "2rem 0" } },
            React.createElement(Button, { variant: "outlined", color: "primary", onClick: () => setReviewOpen(true) }, "Site Reviews")),
        React.createElement(Dialog, { open: reviewOpen, onClose: () => setReviewOpen(false), maxWidth: "sm", fullWidth: true },
            React.createElement(DialogTitle, null, "Site Reviews"),
            React.createElement(SiteReview, null),
            React.createElement(Box, { sx: { display: "flex", justifyContent: "center", py: 2 } },
                React.createElement(Button, { onClick: () => setReviewOpen(false), variant: "outlined" }, "Close")))));
}
