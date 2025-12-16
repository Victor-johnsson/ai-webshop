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
        <div className="font-semibold">Leave a review</div>
        <input className="w-full border rounded px-3 py-2" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <select className="w-full border rounded px-3 py-2" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} stars</option>)}
        </select>
        <textarea className="w-full border rounded px-3 py-2" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      <hr className="my-3" />

      <div>
        <div className="font-semibold mb-2">Recent reviews</div>
        {loading && <div className="text-gray-600">Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && reviews.length === 0 && <div className="text-gray-600">No reviews yet.</div>}
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="p-3 border rounded bg-gray-50">
              <div className="font-semibold">{r.name} <span className="text-gray-500 text-sm">{r.date ? new Date(r.date).toLocaleString() : ''}</span></div>
              <div className="text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              <div>{r.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
