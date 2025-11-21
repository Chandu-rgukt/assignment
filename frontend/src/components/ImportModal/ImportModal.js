import { useState } from "react";
import { importCSV } from "../../api/products";

export default function ImportModal({ open, onClose, reload }) {
  const [file, setFile] = useState(null);

  if (!open) return null;

  const upload = async () => {
    if (!file) return;
    const fd = new FormData();
    fd.append("csvFile", file);
    await importCSV(fd);
    onClose();
    reload();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-80 space-y-4">
        <h2 className="text-xl font-semibold">Import CSV</h2>

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-1 bg-gray-500 text-white rounded">
            Cancel
          </button>

          <button onClick={upload} className="px-4 py-1 bg-blue-600 text-white rounded">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
