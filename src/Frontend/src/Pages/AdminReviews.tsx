import React, { useEffect, useState } from "react";
import { LinearProgress } from "../ui/Progress";

import "../styles.css";

const Container = (p: any) => (
  <div className={`container mx-auto px-4 ${p.className || ""}`}>
    {p.children}
  </div>
);
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
      <Container className="mt-20">
        <h2 className="text-2xl mb-4 text-slate-100">All Site Reviews</h2>
        {loading && <LinearProgress />}
        {error && <div className="text-rose-400">{error}</div>}
        {!loading && reviews.length === 0 && (
          <div className="text-slate-300">No reviews found.</div>
        )}
        <div className="mt-4">
          {reviews.map((r) => (
            <div key={r.id} className="mb-3 p-3 rounded card">
              <div className="font-semibold text-slate-100">
                {r.name}{" "}
                <span className="text-slate-400">
                  ({r.date ? new Date(r.date).toLocaleString() : ""})
                </span>
              </div>
              <div className="text-yellow-400">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </div>
              <div className="text-slate-200">{r.comment}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AdminReviewsPage;
