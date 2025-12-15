import React, { useEffect, useState } from "react";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { fetchReviews } from "../Services/service";
import AppBarComponent from "../Components/AppBarComponent";
const AdminReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchReviews()
            .then((data) => setReviews(data))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);
    return (React.createElement(Box, null,
        React.createElement(AppBarComponent, { title: "Site Reviews Admin" }),
        React.createElement(Container, { sx: { marginTop: "80px", maxWidth: 700 } },
            React.createElement(Typography, { variant: "h4", sx: { mb: 2 } }, "All Site Reviews"),
            loading && React.createElement(LinearProgress, null),
            error && React.createElement(Typography, { color: "error" }, error),
            (!loading && reviews.length === 0) && React.createElement(Typography, null, "No reviews found."),
            React.createElement(Box, { sx: { mt: 2 } }, reviews.map((r) => (React.createElement(Box, { key: r.id, sx: { mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2, background: '#fafafa' } },
                React.createElement(Typography, { fontWeight: "bold" },
                    r.name,
                    " ",
                    React.createElement("span", { style: { color: '#888' } },
                        "(",
                        r.date ? new Date(r.date).toLocaleString() : '',
                        ")")),
                React.createElement(Typography, null,
                    '★'.repeat(r.rating),
                    '☆'.repeat(5 - r.rating)),
                React.createElement(Typography, null, r.comment))))))));
};
export default AdminReviewsPage;
