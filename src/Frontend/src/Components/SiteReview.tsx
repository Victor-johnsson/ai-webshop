import React, { useEffect, useState } from 'react';
import { fetchReviews, submitReview, Review } from '../Services/service';

export default function SiteReview() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchReviews()
      .then((data) => setReviews(data))
      .catch((e) => setError(e.message || 'Failed to fetch'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await submitReview({ name, rating, comment });
      setReviews((prev) => [res, ...prev]);
      setName('');
      setRating(5);
      setComment('');
    } catch (e: any) {
      setError(e.message || 'Failed to submit');
    }
  };

  return (
    <div>
      <div className="space-y-3 mb-4">
        <div className="font-semibold text-slate-100">Leave a review</div>
        <input className="input w-full" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <select className="input w-full" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5,4,3,2,1].map((r) => <option className="bg-slate-800 text-slate-100" key={r} value={r}>{r} stars</option>)}
        </select>
        <textarea className="input w-full" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-brand-600 text-white rounded" onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      <hr className="my-3 border-slate-700" />

      <div>
        <div className="font-semibold mb-2 text-slate-100">Recent reviews</div>
        {loading && <div className="text-slate-300">Loading...</div>}
        {error && <div className="text-rose-400">{error}</div>}
        {!loading && reviews.length === 0 && <div className="text-slate-300">No reviews yet.</div>}
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="p-3 rounded card">
              <div className="font-semibold text-slate-100">{r.name} <span className="text-slate-400 text-sm">{r.date ? new Date(r.date).toLocaleString() : ''}</span></div>
              <div className="text-yellow-400">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              <div className="text-slate-200">{r.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
