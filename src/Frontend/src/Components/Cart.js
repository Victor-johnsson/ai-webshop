import React, { useState } from "react";
import { Box, Typography, Paper, Button, Collapse, TextField, Dialog, DialogTitle, DialogContent, Drawer, InputAdornment, } from "@mui/material";
import { performPayment, placeOrder } from "../Services/service";
import CartItem from "./CartItem";
import "../styles.css";
export default function Cart({ cartItems, addToCart, removeFromCart, clearCart, cartOpen, onCartClose, }) {
    const [isCheckoutPressed, setIsCheckoutPressed] = useState(false);
    const [isCustomerInfoVisible, setIsCustomerInfoVisible] = useState(false);
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        cardName: "",
        cardNumber: "",
    });
    const calculateTotal = (items) => items.reduce((acc, item) => acc + item.amount * item.price, 0).toFixed(2);
    const handleCheckout = () => {
        setIsCheckoutPressed(true);
        setIsCustomerInfoVisible(true);
    };
    const handleProceedToPayment = () => {
        setIsCustomerInfoVisible(false);
        setIsPaymentVisible(true);
    };
    const order = {
        orderLines: cartItems.map((item) => ({
            productId: item.id,
            itemCount: item.amount,
        })),
        customer: {
            name: formData.name,
            address: formData.address,
            email: formData.email,
        },
    };
    const handlePay = async () => {
        setLoading(true);
        try {
            const paymentResponse = await performPayment();
            const paymentId = paymentResponse;
            try {
                await placeOrder(order, paymentId.toString());
                clearCart();
                setOrderConfirmed(true);
                setDialogMessage("Order received! Thank you for your purchase.");
            }
            catch (orderError) {
                console.error("Order placement failed", orderError);
                setOrderConfirmed(false);
                setDialogMessage("Order placement failed. Please try again.");
            }
        }
        catch (paymentError) {
            console.error("Payment failed", paymentError);
            setOrderConfirmed(false);
            setDialogMessage("Payment failed. Please try again.");
        }
        finally {
            setLoading(false);
            setIsCustomerInfoVisible(false);
            setIsPaymentVisible(false);
            setDialogOpen(true);
        }
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
        if (orderConfirmed) {
            onCartClose();
        }
    };
    const isCustomerInfoValid = formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.address.trim() !== "";
    const isPaymentInfoValid = formData.cardName.trim() !== "" && formData.cardNumber.trim().length === 19;
    return (React.createElement(Drawer, { anchor: "right", open: cartOpen, onClose: onCartClose },
        React.createElement(Paper, { elevation: 3, sx: { width: "500px", padding: "20px" } },
            React.createElement(Typography, { variant: "h5", gutterBottom: true }, "Your Cart"),
            cartItems.length > 0 && (React.createElement(Button, { onClick: () => setIsCheckoutPressed(!isCheckoutPressed), variant: "outlined", sx: { marginBottom: "10px" } }, isCheckoutPressed ? "Hide Checkout" : "Show Checkout")),
            React.createElement(Collapse, { in: !isCheckoutPressed },
                cartItems.length === 0 ? (React.createElement(Typography, { variant: "body1" }, "No items in cart.")) : (cartItems.map((item) => (React.createElement(CartItem, { key: item.id, item: item, addToCart: addToCart, removeFromCart: removeFromCart })))),
                React.createElement(Typography, { variant: "h5", sx: { marginTop: "20px" } },
                    "Total: $",
                    calculateTotal(cartItems))),
            !isCheckoutPressed && cartItems.length > 0 && (React.createElement(Button, { fullWidth: true, variant: "contained", color: "primary", onClick: handleCheckout, sx: { marginTop: "20px" } }, "Checkout")),
            React.createElement(Collapse, { in: isCustomerInfoVisible },
                React.createElement(Box, { sx: { marginTop: "20px" } },
                    React.createElement(Typography, { variant: "h6" }, "Customer Information"),
                    React.createElement(TextField, { fullWidth: true, label: "Full Name", variant: "outlined", margin: "normal", required: true, value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }) }),
                    React.createElement(TextField, { fullWidth: true, label: "Email Address", variant: "outlined", margin: "normal", required: true, type: "email", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }) }),
                    React.createElement(TextField, { fullWidth: true, label: "Address", variant: "outlined", margin: "normal", required: true, value: formData.address, onChange: (e) => setFormData({ ...formData, address: e.target.value }) }),
                    React.createElement(Button, { fullWidth: true, variant: "contained", color: "primary", sx: { marginTop: "10px" }, onClick: handleProceedToPayment, disabled: !isCustomerInfoValid }, "Proceed to Payment"))),
            React.createElement(Collapse, { in: isPaymentVisible },
                React.createElement(Box, { sx: { marginTop: "20px" } },
                    React.createElement(Typography, { variant: "h6" }, "Payment Information"),
                    React.createElement(TextField, { fullWidth: true, label: "Card Name", variant: "outlined", margin: "normal", required: true, value: formData.cardName, onChange: (e) => setFormData({ ...formData, cardName: e.target.value }) }),
                    React.createElement(TextField, { fullWidth: true, label: "Card Number", variant: "outlined", margin: "normal", required: true, value: formData.cardNumber, onChange: (e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            value = value.replace(/(.{4})/g, "$1 ").trim();
                            if (value.length > 19)
                                return;
                            setFormData({ ...formData, cardNumber: value });
                        }, inputProps: { maxLength: 19 }, placeholder: "1234 5678 9012 3456", InputProps: {
                            startAdornment: (React.createElement(InputAdornment, { position: "start" }, "\uD83D\uDCB3")),
                        } }),
                    React.createElement(Button, { fullWidth: true, variant: "contained", color: "success", sx: { marginTop: "10px" }, onClick: handlePay, disabled: !isPaymentInfoValid || loading }, loading ? "Processing..." : "Pay Now"))),
            React.createElement(Dialog, { open: dialogOpen, onClose: handleDialogClose },
                React.createElement(DialogTitle, null, orderConfirmed ? "Order Confirmation" : "Payment Error"),
                React.createElement(DialogContent, null,
                    React.createElement(Typography, { variant: "h6", sx: { textAlign: "center" } }, dialogMessage),
                    React.createElement(Button, { onClick: handleDialogClose, variant: "contained", color: "primary", sx: { display: "block", margin: "20px auto" } }, orderConfirmed ? "Close" : "Try Again"))))));
}
