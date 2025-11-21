import ProductRow from "../ProductRow/ProductRow";

export default function ProductTable({ products, reload, onSelect }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Unit</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Brand</th>
            <th className="p-3 border">Stock</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <ProductRow key={p.id} product={p} reload={reload} onSelect={onSelect} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
