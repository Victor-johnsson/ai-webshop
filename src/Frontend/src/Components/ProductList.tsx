import React from "react";
import Button from "../ui/Button";

import { Product } from "../Services/service";

type Props = {
  products: Product[];
  onAction: (item: Product) => void;
  actionLabel?: string;
  isAdmin?: boolean;
  onAddProduct?: () => void;
};

export default function ProductList({
  products = [],
  onAction,
  actionLabel = "Action",
  isAdmin,
  onAddProduct,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {isAdmin && (
        <div className="col-span-full flex justify-end">
          <Button onClick={onAddProduct}>Add Product</Button>
        </div>
      )}
      {products.map((p) => (
        <div key={p.id} className="card p-4 flex flex-col">
          <div className="flex-1">
            {p.imageUrl && (
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-40 object-cover rounded mb-3 bg-slate-700"
              />
            )}
            <div className="font-semibold mb-2">{p.name}</div>
            {"description" in p && (
              <div className="text-sm text-slate-300 mb-2">
                {(p as any).description}
              </div>
            )}
            <div className="font-bold text-slate-100">${p.price}</div>
          </div>
          <div className="mt-3">
            <Button onClick={() => onAction(p)}>{actionLabel}</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
