import React, { useState } from "react";
import { Box, Container, TextField, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import { getProducts, deleteProduct, addProduct, } from "../Services/service";
import AppBarComponent from "../Components/AppBarComponent";
import ProductList from "../Components/ProductList";
import AddProductForm from "../Components/AddProductForm";
import AuthContext from "../Authentication/AuthContext";
export default function AdminWebshop({ token }) {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery(["products"], getProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const { handleLogout } = React.useContext(AuthContext);
    if (isLoading)
        return React.createElement(LinearProgress, null);
    if (error)
        return React.createElement("div", null, "Something went wrong");
    const filteredData = data?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.includes(searchTerm)) || [];
    const openConfirmDialog = (clickedItem) => {
        setProductToDelete(clickedItem);
    };
    const handleConfirmDelete = async () => {
        if (productToDelete) {
            try {
                setActionLoading(true);
                await deleteProduct(productToDelete.id, token);
                // console.log("Product deleted:", productToDelete);
                // Wait 5 seconds, then refetch products
                await new Promise((resolve) => setTimeout(resolve, 5000));
                await queryClient.refetchQueries(["products"]);
            }
            catch (error) {
                console.error("Error deleting product:", error);
            }
            finally {
                setActionLoading(false);
                setProductToDelete(null);
            }
        }
    };
    // If user cancels deletion, close dialog
    const handleCancelDelete = () => {
        setProductToDelete(null);
    };
    // Handle adding product and refetch after 5 seconds
    const handleAddProduct = async (product) => {
        try {
            setActionLoading(true);
            await addProduct(product, token);
            // console.log("New Product Added:", product);
            await new Promise((resolve) => setTimeout(resolve, 5000));
            await queryClient.refetchQueries(["products"]);
        }
        catch (error) {
            console.error("Error adding product:", error);
        }
        finally {
            setActionLoading(false);
        }
    };
    return (React.createElement(Box, null,
        React.createElement(AppBarComponent, { title: "WebshopX Admin", logoutButton: true, onLogoutClick: () => handleLogout() }),
        React.createElement(Container, { sx: { marginTop: "80px" } },
            React.createElement(TextField, { fullWidth: true, label: "Search Products", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), sx: { marginBottom: "20px" } }),
            React.createElement(ProductList, { products: filteredData, onAction: openConfirmDialog, actionLabel: "Delete Product", isAdmin: true, onAddProduct: () => setFormOpen(true) })),
        React.createElement(AddProductForm, { open: formOpen, onClose: () => setFormOpen(false), onSubmit: handleAddProduct }),
        React.createElement(Dialog, { open: Boolean(productToDelete), onClose: handleCancelDelete },
            React.createElement(DialogTitle, null, "Confirm Deletion"),
            React.createElement(DialogContent, null, "Are you sure you want to delete this product?"),
            React.createElement(DialogActions, null,
                React.createElement(Button, { variant: "contained", onClick: handleCancelDelete, color: "primary" }, "No"),
                React.createElement(Button, { variant: "contained", onClick: handleConfirmDelete, color: "error", autoFocus: true }, "Yes"))),
        actionLoading && (React.createElement(Box, { sx: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            } },
            React.createElement(CircularProgress, null)))));
}
