import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Button, Box } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import "../styles.css";
import { useNavigate } from "react-router-dom";
export default function AppBarComponent({ title, logoutButton = false, showCart = false, cartItemCount = 0, onLogoutClick, onCartClick, }) {
    const navigate = useNavigate();
    return (React.createElement(AppBar, { position: "fixed", sx: { backgroundColor: "#1976D2" } },
        React.createElement(Toolbar, { sx: { display: "flex", justifyContent: "space-between" } },
            React.createElement(Typography, { variant: "h6", sx: { fontWeight: "bold", color: "white" } }, title),
            React.createElement(Box, { sx: { display: "flex", alignItems: "center", gap: 2 } },
                window.location.pathname.startsWith('/admin') && (React.createElement(Button, { color: "inherit", onClick: () => navigate("/admin/reviews") }, "Site Reviews")),
                showCart && (React.createElement(IconButton, { onClick: onCartClick, sx: { color: "white" } },
                    React.createElement(Badge, { badgeContent: cartItemCount, color: "error" },
                        React.createElement(AddShoppingCart, null)))),
                logoutButton && (React.createElement(IconButton, { onClick: onLogoutClick, sx: { color: "white" } },
                    React.createElement(LogoutIcon, null)))))));
}
