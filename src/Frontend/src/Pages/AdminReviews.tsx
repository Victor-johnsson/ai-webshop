import React, { useEffect, useState } from "react";
import { useMemo } from 'react';
import { LinearProgress } from '../ui/Progress';

import '../styles.css';

const Box = (p: any) => <div {...p} />;
const Container = (p: any) => <div className={`container mx-auto px-4 ${p.className || ''}`}>{p.children}</div>;
const Typography = (p: any) => <div {...p} />;
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
    <div>
      <AppBarComponent title="Site Reviews Admin" />
      <Container className="mt-20" >
        <h2 className="text-2xl mb-4">All Site Reviews</h2>
        {loading && <LinearProgress />}
        {error && <div className="text-red-600">{error}</div>}
        {(!loading && reviews.length === 0) && <div>No reviews found.</div>}
        <div className="mt-4">
          {reviews.map((r) => (
            <div key={r.id} className="mb-3 p-2 border rounded bg-gray-50">
              <div className="font-semibold">{r.name} <span className="text-gray-500">({r.date ? new Date(r.date).toLocaleString() : ''})</span></div>
              <div>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              <div>{r.comment}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AdminReviewsPage;
