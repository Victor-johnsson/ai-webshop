import React, { useEffect, useState } from 'react';
import { fetchReviews, submitReview } from '../Services/service';
import { Box, Stack, TextField, Button, Typography, DialogContent, Divider } from "@mui/material";
import Rating from "@mui/material/Rating";
const SiteReview = () => {
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetchReviews()
            .then((data) => setReviews(data))
            .catch((err) => setError('Could not load reviews: ' + err.message))
            .finally(() => setLoading(false));
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !comment.trim()) {
            setError('Name and comment are required.');
            return;
        }
        setError('');
        setSubmitting(true);
        try {
            const submitted = await submitReview({ name, rating, comment });
            setReviews([submitted, ...reviews]);
            setName('');
            setRating(5);
            setComment('');
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setSubmitting(false);
        }
    };
    // Calculate average rating if any reviews exist
    const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length : 0;
    return (React.createElement(DialogContent, { sx: { maxWidth: 540, px: { xs: 1, sm: 3 }, py: 2 } },
        React.createElement(Stack, { spacing: 3 },
            React.createElement(Box, { textAlign: "center" },
                React.createElement(Typography, { variant: "h6" }, "Leave a Review"),
                reviews.length > 0 && (React.createElement(Stack, { spacing: 1, alignItems: "center", sx: { mt: 1 } },
                    React.createElement(Rating, { name: "average-rating", value: averageRating, precision: 0.1, readOnly: true, size: "small" }),
                    React.createElement(Typography, { variant: "body2", color: "text.secondary" },
                        averageRating.toFixed(1),
                        " / 5.0 (",
                        reviews.length,
                        " review",
                        reviews.length > 1 ? "s" : "",
                        ")")))),
            React.createElement(Box, { component: "form", onSubmit: handleSubmit, gap: 2, display: "flex", flexDirection: "column", alignItems: "stretch" },
                React.createElement(TextField, { size: "small", label: "Your name", value: name, onChange: e => setName(e.target.value), autoComplete: "name", disabled: submitting, required: true, fullWidth: true }),
                React.createElement(Stack, { direction: "row", alignItems: "center", spacing: 1 },
                    React.createElement(Typography, null, "Rating:"),
                    React.createElement(Rating, { value: rating, onChange: (_, newVal) => newVal && setRating(newVal), disabled: submitting, size: "medium", name: "user-rating", precision: 1 }),
                    React.createElement(Typography, { color: "text.secondary" },
                        rating,
                        " Star",
                        rating > 1 ? "s" : "")),
                React.createElement(TextField, { size: "small", label: "Your review", value: comment, onChange: e => setComment(e.target.value), disabled: submitting, multiline: true, minRows: 3, required: true, fullWidth: true }),
                error && (React.createElement(Typography, { color: "error", variant: "body2" }, error)),
                React.createElement(Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, disabled: submitting }, submitting ? "Submitting..." : "Submit Review")),
            React.createElement(Divider, { sx: { my: 1 } }),
            React.createElement(Typography, { variant: "subtitle1" }, "Recent Reviews"),
            loading ? (React.createElement(Typography, { color: "text.secondary" }, "Loading...")) : reviews.length === 0 ? (React.createElement(Typography, { color: "text.secondary" }, "No reviews yet. Be the first!")) : (React.createElement(Stack, { spacing: 2 }, reviews.map((r, idx) => (React.createElement(Box, { key: r.id ?? idx, sx: { p: 2, bgcolor: "background.default", borderRadius: 2, boxShadow: 1 } },
                React.createElement(Stack, { direction: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { sm: "center" }, spacing: { xs: 1, sm: 2 } },
                    React.createElement(Stack, { direction: "row", spacing: 1, alignItems: "center" },
                        React.createElement(Typography, { fontWeight: "bold" }, r.name),
                        React.createElement(Rating, { value: r.rating, readOnly: true, size: "small", sx: { ml: 1 } })),
                    React.createElement(Typography, { variant: "caption", color: "text.secondary" }, r.date ? new Date(r.date).toLocaleString() : "")),
                React.createElement(Typography, { variant: "body2", sx: { mt: 0.5 } }, r.comment)))))))));
};
export default SiteReview;
