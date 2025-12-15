import React from "react";
import { Grid, Card, CardContent, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Item from "./Item";
import "../styles.css";
export default function ProductList({ products, onAction, actionLabel, isAdmin = false, onAddProduct, }) {
    return (React.createElement(Grid, { container: true, spacing: 3 },
        isAdmin && (React.createElement(Grid, { item: true, xs: 12, sm: 4 },
            React.createElement(Card, { sx: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    borderRadius: "20px",
                    height: "100%",
                    transition: "0.3s",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                    },
                    cursor: "pointer",
                }, onClick: onAddProduct },
                React.createElement(CardContent, null,
                    React.createElement(Box, { display: "flex", justifyContent: "center", alignItems: "center" },
                        React.createElement(AddIcon, { fontSize: "large", sx: { color: "#1976D2", fontSize: "3rem" } })))))),
        products.map((item) => (React.createElement(Grid, { item: true, key: item.id, xs: 12, sm: 4 },
            React.createElement(Item, { key: item.id, item: item, onAction: onAction, actionLabel: actionLabel }))))));
}
