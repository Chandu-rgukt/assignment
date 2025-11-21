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
      className="border-b hover:bg-gray-50 cursor-pointer"
      onClick={() => {
        if (!edit) onSelect(product.id);
      }}
    >
      <td className="p-3 border-r w-24">
        {product.image ? (
          <img src={product.image} alt="" className="w-12 h-12 rounded object-cover" />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded" />
        )}
      </td>

      <td className="p-3 border-r w-40">
        {edit ? (
          <input
            className="border p-2 rounded w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        ) : (
          <span className="font-medium">{product.name}</span>
        )}
      </td>

      <td className="p-3 border-r w-24">
        {edit ? (
          <input
            className="border p-2 rounded w-full"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          />
        ) : (
          product.unit
        )}
      </td>

      <td className="p-3 border-r w-40">
        {edit ? (
          <input
            className="border p-2 rounded w-full"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        ) : (
          product.category
        )}
      </td>

      <td className="p-3 border-r w-40">
        {edit ? (
          <input
            className="border p-2 rounded w-full"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
        ) : (
          product.brand
        )}
      </td>

      <td className="p-3 border-r w-24">
        {edit ? (
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
        ) : (
          <span className="font-semibold">{product.stock}</span>
        )}
      </td>

      <td className="p-3 border-r whitespace-nowrap w-32">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            product.stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </td>

      <td className="p-3 flex gap-2 justify-center w-40 whitespace-nowrap">
        {edit ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                save();
              }}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setEdit(false);
                setForm({ ...product });
              }}
              className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded"
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
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  );
}
