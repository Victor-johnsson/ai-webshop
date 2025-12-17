import React, { useState } from "react";
import Container from "../ui/Container";
import TextField from "../ui/TextField";
import { LinearProgress, CircularProgress } from "../ui/Progress";
import Dialog from "../ui/Dialog";
import Button from "../ui/Button";
import { useQuery, useQueryClient } from "react-query";
import {
  Product,
  getProducts,
  deleteProduct,
  ProductInputType,
  addProduct,
} from "../Services/service";
import { Link } from "react-router-dom";
import ProductList from "../Components/ProductList";
import AddProductForm from "../Components/AddProductForm";
import AuthContext from "../Authentication/AuthContext";
import AppBarComponent from "../Components/AppBarComponent";

export default function AdminWebshop({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<Product[]>(
    ["products"],
    getProducts,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const { handleLogout } = React.useContext(AuthContext);

  if (isLoading) return <LinearProgress />;
  if (error) return <div className="text-rose-400">Something went wrong</div>;

  const filteredData =
    data?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.includes(searchTerm),
    ) || [];

  const openConfirmDialog = (clickedItem: Product) => {
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
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
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
  const handleAddProduct = async (product: ProductInputType) => {
    try {
      setActionLoading(true);
      await addProduct(product, token);
      // console.log("New Product Added:", product);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await queryClient.refetchQueries(["products"]);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <AppBarComponent
        title="WebshopX Admin"
        adminLinks
        logoutButton
        onLogoutClick={() => handleLogout()}
      />
      <Container className="mt-20">
        <div className="mb-5">
          <TextField
            label="Search Products"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm((e.target as HTMLInputElement).value)
            }
            className="w-full"
          />
        </div>

        <ProductList
          products={filteredData}
          onAction={openConfirmDialog}
          actionLabel="Delete Product"
          isAdmin={true}
          onAddProduct={() => setFormOpen(true)}
        />
        <div className="mt-6">
          <Link to="/admin/reviews">
            <Button>View Reviews</Button>
          </Link>
        </div>
      </Container>

      {/* Add Product Form */}
      <AddProductForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAddProduct}
      />

      {/* Confirmation Dialog for Deletion */}
      <Dialog
        open={Boolean(productToDelete)}
        onClose={handleCancelDelete}
        title="Confirm Deletion"
      >
        <div>Are you sure you want to delete this product?</div>
        <div className="flex gap-3 justify-end mt-3">
          <Button onClick={handleCancelDelete} variant="outlined">
            No
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained">
            Yes
          </Button>
        </div>
      </Dialog>

      {/* Circular Progress Overlay */}
      {actionLoading && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
