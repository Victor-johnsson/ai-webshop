import React, { useEffect, useState } from "react";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { fetchReviews, Review } from "../Services/service";
import AppBarComponent from "../Components/AppBarComponent";

const AdminReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews()
      .then((data) => setReviews(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <AppBarComponent title="Site Reviews Admin" />
      <Container sx={{ marginTop: "80px", maxWidth: 700 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>All Site Reviews</Typography>
        {loading && <LinearProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {(!loading && reviews.length === 0) && <Typography>No reviews found.</Typography>}
        <Box sx={{ mt: 2 }}>
          {reviews.map((r) => (
            <Box key={r.id} sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2, background: '#fafafa' }}>
              <Typography fontWeight="bold">{r.name} <span style={{ color: '#888' }}>({r.date ? new Date(r.date).toLocaleString() : ''})</span></Typography>
              <Typography>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</Typography>
              <Typography>{r.comment}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default AdminReviewsPage;
