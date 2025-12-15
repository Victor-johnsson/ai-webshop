import React from "react";
import { Button, Card, CardContent, CardMedia, Typography, Box, } from "@mui/material";
import "../styles.css";
export default function CartItem({ item, addToCart, removeFromCart }) {
    return (React.createElement(Card, { sx: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid lightblue",
            padding: "16px",
            transition: "0.3s",
            "&:hover": {
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            },
        } },
        React.createElement(CardContent, { sx: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            } },
            React.createElement(Typography, { variant: "h6", sx: { fontWeight: "bold" } }, item.name),
            React.createElement(Box, { sx: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                } },
                React.createElement(Typography, { variant: "body1" },
                    "Price: ",
                    React.createElement("strong", null,
                        "$",
                        item.price)),
                React.createElement(Typography, { variant: "body1" },
                    "Total: ",
                    React.createElement("strong", null,
                        "$",
                        (item.amount * item.price).toFixed(2)))),
            React.createElement(Box, { sx: { display: "flex", alignItems: "center", gap: "10px", mt: 2 } },
                React.createElement(Button, { size: "small", variant: "contained", color: "error", onClick: () => removeFromCart(item.id), sx: {
                        minWidth: "32px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                    } }, "-"),
                React.createElement(Typography, { variant: "body1", sx: { fontWeight: "bold" } }, item.amount),
                React.createElement(Button, { size: "small", variant: "contained", color: "primary", onClick: () => addToCart(item), sx: {
                        minWidth: "32px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                    } }, "+"))),
        React.createElement(CardMedia, { component: "img", image: item.imageUrl, alt: item.name, sx: {
                width: "90px",
                height: "90px",
                objectFit: "cover",
                borderRadius: "8px",
                marginLeft: "20px",
            } })));
}
