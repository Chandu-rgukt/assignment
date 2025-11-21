import { useState } from "react";
import axios from "axios";

export default function AddProductModal({ open, onClose, reload }) {
  const [form, setForm] = useState({
    name: "",
    unit: "",
    category: "",
    brand: "",
    stock: "",
    status: "In Stock",
    image: ""
  });

  if (!open) return null;

  const addProduct = async () => {
    await axios.post("http://localhost:5000/api/products", form);
    onClose();
    reload();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 space-y-4">
        <h2 className="text-xl font-semibold">Add New Product</h2>

        <input
          className="border w-full p-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border w-full p-2"
          placeholder="Unit"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
        />

        <input
          className="border w-full p-2"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          className="border w-full p-2"
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />

        <input
          className="border w-full p-2"
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <input
          className="border w-full p-2"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <select
          className="border w-full p-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>In Stock</option>
          <option>Out of Stock</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-1 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-1 bg-blue-600 text-white rounded"
            onClick={addProduct}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
