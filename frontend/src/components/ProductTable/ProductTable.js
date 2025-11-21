import ProductRow from "../ProductRow/ProductRow";

export default function ProductTable({ products, reload, onSelect }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Unit</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Brand</th>
            <th className="p-3 border">Stock</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border w-40 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <ProductRow
              key={p.id}
              product={p}
              reload={reload}
              onSelect={onSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
