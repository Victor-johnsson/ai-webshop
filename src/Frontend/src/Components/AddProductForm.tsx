import React, { useState } from 'react';
import Dialog from '../ui/Dialog';
import TextField from '../ui/TextField';
import Button from '../ui/Button';
import { ProductInputType } from '../Services/service';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (p: ProductInputType) => void;
};

export default function AddProductForm({ open, onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [stock, setStock] = useState('0');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = () => {
    onSubmit({ name, price: Number(price), stock: Number(stock), image });
    setName('');
    setDescription('');
    setPrice('0');
    setStock('0');
    setImage(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} title="Add Product">
      <div className="space-y-3">
        <TextField label="Name" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
        <TextField label="Description" value={description} onChange={(e) => setDescription((e.target as HTMLInputElement).value)} />
        <TextField label="Price" value={price} onChange={(e) => setPrice((e.target as HTMLInputElement).value)} />
        <TextField label="Stock" value={stock} onChange={(e) => setStock((e.target as HTMLInputElement).value)} />
        <div>
          <label className="block text-sm mb-1 text-slate-200">Image</label>
          <input className="input" type="file" accept="image/*" onChange={(e) => setImage(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </div>
    </Dialog>
  );
}
