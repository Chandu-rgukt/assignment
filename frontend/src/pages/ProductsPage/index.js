import { useEffect, useState } from "react";
import {
  getProducts,
  searchProducts,
  exportCSV,
} from "../../api/products";

import ProductTable from "../../components/ProductTable/ProductTable";
import ImportModal from "../../components/ImportModal/ImportModal";
import SidebarHistory from "../../components/SidebarHistory/SidebarHistory";

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");


  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  const [showImport, setShowImport] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data.products || []);
    const uniqueCats = [...new Set(res.data.products.map((p) => p.category))];
    setCategories([...new Set(res.data.products.map((p) => p.category))]);


  };

  const handleSearch = async (value) => {
    setQuery(value);
    if (value.trim() === "") return loadProducts();
    const res = await searchProducts(value);
    setProducts(res.data || []);
  };

  const handleExport = () => {
    exportCSV().then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "products.csv";
      a.click();
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Product Inventory</h2>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="border px-3 py-1"
        />

          <select value={category}
                  onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value === "") loadProducts();
                  else {
                  const filtered = products.filter(
                  (p) => p.category === e.target.value
                );
              setProducts(filtered);
              }
           }}
          className="border px-3 py-1"
        >
          <option value="">All Categories</option>
                 {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
                ))}
        </select>


        <button
          onClick={() => setShowImport(true)}
          className="px-4 py-1 bg-purple-600 text-white rounded"
        >
          Import CSV
        </button>

        <button
          onClick={handleExport}
          className="px-4 py-1 bg-green-600 text-white rounded"
        >
          Export CSV
        </button>
      </div>

      <ProductTable
        products={products}
        reload={loadProducts}
        onSelect={(id) => {
          setSelectedId(id);
          setShowHistory(true);
        }}
      />

      <ImportModal
        open={showImport}
        onClose={() => setShowImport(false)}
        reload={loadProducts}
      />

      <SidebarHistory
        open={showHistory}
        productId={selectedId}
        onClose={() => setShowHistory(false)}
      />
    </div>
  );
}
