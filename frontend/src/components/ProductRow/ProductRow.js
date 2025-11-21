import { useState } from "react";
import { updateProduct } from "../../api/products";

export default function ProductRow({ product, reload, onSelect }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ ...product });

  const save = async () => {
    await updateProduct(product.id, form);
    setEdit(false);
    reload();
  };

  return (
    <tr
      className="border hover:bg-gray-50 cursor-pointer"
      onClick={() => {
        if (!edit) onSelect(product.id);
      }}
    >
      <td className="p-2 border">
        {product.image ? (
          <img src={product.image} alt="" className="w-12 h-12 object-cover" />
        ) : (
          <div className="w-12 h-12 bg-gray-200" />
        )}
      </td>

      <td className="p-2 border">
        {edit ? (
          <input
            className="border p-1"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        ) : (
          product.name
        )}
      </td>

      <td className="p-2 border">
        {edit ? (
          <input
            className="border p-1"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          />
        ) : (
          product.unit
        )}
      </td>

      <td className="p-2 border">
        {edit ? (
          <input
            className="border p-1"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        ) : (
          product.category
        )}
      </td>

      <td className="p-2 border">
        {edit ? (
          <input
            className="border p-1"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
        ) : (
          product.brand
        )}
      </td>

      <td className="p-2 border">
        {edit ? (
          <input
            type="number"
            className="border p-1 w-20"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
        ) : (
          product.stock
        )}
      </td>

      <td className="p-2 border">
        <span
          className={`px-2 py-1 rounded ${
            product.stock > 0
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </td>

      <td className="p-2 border space-x-2">
        {edit ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                save();
              }}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setEdit(false);
                setForm({ ...product });
              }}
              className="px-3 py-1 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEdit(true);
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  );
}
