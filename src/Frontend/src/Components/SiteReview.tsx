import React, { useEffect, useState } from 'react';
import { fetchReviews, submitReview, Review } from '../Services/service';
import { Box, Stack, TextField, Button, Typography, DialogContent, Divider } from "@mui/material";
import Rating from "@mui/material/Rating";

const SiteReview: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate average rating if any reviews exist
  const averageRating =
    reviews.length > 0 ? reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length : 0;

  return (
    <DialogContent sx={{ maxWidth: 540, px: { xs: 1, sm: 3 }, py: 2 }}>
      <Stack spacing={3}>
        <Box textAlign="center">
          <Typography variant="h6">Leave a Review</Typography>
          {reviews.length > 0 && (
            <Stack spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Rating name="average-rating" value={averageRating} precision={0.1} readOnly size="small" />
              <Typography variant="body2" color="text.secondary">
                {averageRating.toFixed(1)} / 5.0 ({reviews.length} review{reviews.length > 1 ? "s" : ""})
              </Typography>
            </Stack>
          )}
        </Box>
        <Box component="form" onSubmit={handleSubmit} gap={2} display="flex" flexDirection="column" alignItems="stretch">
          <TextField
            size="small"
            label="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            disabled={submitting}
            required
            fullWidth
          />
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>Rating:</Typography>
            <Rating
              value={rating}
              onChange={(_, newVal) => newVal && setRating(newVal)}
              disabled={submitting}
              size="medium"
              name="user-rating"
              precision={1}
            />
            <Typography color="text.secondary">{rating} Star{rating > 1 ? "s" : ""}</Typography>
          </Stack>
          <TextField
            size="small"
            label="Your review"
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={submitting}
            multiline
            minRows={3}
            required
            fullWidth
          />
          {error && (
            <Typography color="error" variant="body2">{error}</Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Typography variant="subtitle1">Recent Reviews</Typography>
        {loading ? (
          <Typography color="text.secondary">Loading...</Typography>
        ) : reviews.length === 0 ? (
          <Typography color="text.secondary">No reviews yet. Be the first!</Typography>
        ) : (
          <Stack spacing={2}>
            {reviews.map((r, idx) => (
              <Box key={r.id ?? idx} sx={{ p: 2, bgcolor: "background.default", borderRadius: 2, boxShadow: 1 }}>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} spacing={{ xs: 1, sm: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography fontWeight="bold">{r.name}</Typography>
                    <Rating value={r.rating} readOnly size="small" sx={{ ml: 1 }} />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {r.date ? new Date(r.date).toLocaleString() : ""}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ mt: 0.5 }}>{r.comment}</Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </DialogContent>
  );
};

export default SiteReview;
