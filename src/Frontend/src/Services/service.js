// Get all products
export const getProducts = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(`/api/products`, {
        method: "GET",
    });
    if (!response.ok) {
        console.error("Fetch failed:", response.status, response.statusText);
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};
// Delete a product by id
export const deleteProduct = async (id, token) => {
    const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        console.error("Delete failed:", response.status, response.statusText);
        throw new Error(`Failed to delete product with ID: ${id}`);
    }
};
// Convert Image to Base64
const convertImageToBase64 = async (image) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
// Add a product
export const addProduct = async (product, token) => {
    try {
        let imageBase64 = "";
        // Convert image to Base64
        if (product.image) {
            imageBase64 = await convertImageToBase64(product.image);
        }
        const response = await fetch(`/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: product.name,
                price: product.price,
                stock: product.stock,
                imageBase64: imageBase64,
            }),
        });
        if (!response.ok) {
            console.error("Add product failed:", response.status, response.statusText);
            throw new Error("Failed to add product.");
        }
    }
    catch (error) {
        console.error("Error in addProduct:", error);
        throw error;
    }
};
export const validateToken = async (token) => {
    try {
        const response = await fetch(`/api/Auth/login`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Token validation failed. Status: ${response.status}`);
        }
        return true;
    }
    catch (error) {
        console.error("Error validating token:", error);
        return false;
    }
};
export const performPayment = async () => {
    const response = await fetch(`/api/payments`, {
        method: "POST",
    });
    if (!response.ok) {
        console.error("Fetch failed:", response.status, response.statusText);
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};
export const placeOrder = async (order, paymentId) => {
    try {
        const response = await fetch(`/api/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                orderLines: order.orderLines,
                customer: order.customer,
                paymentId: paymentId,
            }),
        });
        if (!response.ok) {
            console.error("Failed placing an order:", response.status, response.statusText);
            throw new Error("Failed to place the order.");
        }
    }
    catch (error) {
        console.error("Error in placeOrder:", error);
        throw error;
    }
};
export const fetchReviews = async () => {
    const response = await fetch('/api/reviews', {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch reviews');
    }
    return response.json();
};
export const submitReview = async (review) => {
    const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });
    if (!response.ok) {
        const message = await response.text();
        throw new Error('Failed to submit review: ' + response.status + ' ' + message);
    }
    return response.json();
};
