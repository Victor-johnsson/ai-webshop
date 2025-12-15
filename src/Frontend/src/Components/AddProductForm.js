import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField, Button, Box, Typography, IconButton, Paper, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../styles.css";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
export default function AddProductForm({ open, onClose, onSubmit }) {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                alert("File is too large. Please select an image smaller than 5 MB.");
                setImage(null);
                setImagePreview(null);
                return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleSubmit = () => {
        if (!productName || !productPrice || !stock || !image) {
            alert("Please fill in all fields!");
            return;
        }
        onSubmit({
            name: productName,
            price: Number(productPrice),
            stock: Number(stock),
            image,
        });
        setProductName("");
        setProductPrice("");
        setStock("");
        setImage(null);
        setImagePreview(null);
        onClose();
    };
    return (React.createElement(Dialog, { open: open, onClose: onClose, maxWidth: "sm", fullWidth: true, PaperProps: {
            sx: {
                borderRadius: "20px",
                padding: "20px",
                width: "600px",
            },
        } },
        React.createElement(DialogTitle, { sx: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            } },
            "Add New Product",
            React.createElement(IconButton, { onClick: onClose },
                React.createElement(CloseIcon, null))),
        React.createElement(DialogContent, null,
            React.createElement(TextField, { fullWidth: true, label: "Product Name", variant: "outlined", margin: "dense", value: productName, onChange: (e) => setProductName(e.target.value) }),
            React.createElement(TextField, { fullWidth: true, label: "Product Price", variant: "outlined", margin: "dense", type: "number", value: productPrice, onChange: (e) => setProductPrice(Number(e.target.value)) }),
            React.createElement(TextField, { fullWidth: true, label: "Stock", variant: "outlined", margin: "dense", type: "number", value: stock, onChange: (e) => setStock(Number(e.target.value)) }),
            React.createElement(Paper, { variant: "outlined", sx: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    marginTop: "10px",
                    cursor: "pointer",
                    border: "2px dashed #1976D2",
                    borderRadius: "10px",
                } },
                React.createElement("input", { type: "file", accept: "image/*", onChange: handleImageUpload, style: { display: "none" }, id: "image-upload" }),
                React.createElement("label", { htmlFor: "image-upload" },
                    React.createElement(CloudUploadIcon, { fontSize: "large", sx: { color: "#1976D2" } }),
                    React.createElement(Typography, { variant: "body1", sx: { color: "#1976D2", cursor: "pointer" } }, image ? "Change Image" : "Click to Upload")),
                imagePreview && (React.createElement(Box, { mt: 2, display: "flex", justifyContent: "center" },
                    React.createElement("img", { src: imagePreview, alt: "Preview", style: { maxWidth: "100%", maxHeight: "100px" } })))),
            React.createElement(Button, { fullWidth: true, variant: "contained", color: "primary", sx: { marginTop: "20px", borderRadius: "10px" }, onClick: handleSubmit }, "Add Product"))));
}
