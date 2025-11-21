import { useEffect, useState } from "react";
import { getHistory } from "../../api/products";

export default function SidebarHistory({ open, productId, onClose }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!open || !productId) return;
    getHistory(productId).then((res) => setLogs(res.data || []));
  }, [open, productId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-end bg-black/30">
      <div className="w-80 bg-white h-full p-4 shadow-xl overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Inventory History</h2>
          <button onClick={onClose} className="text-gray-600 text-lg">✕</button>
        </div>

        {logs.length === 0 ? (
          <p className="text-gray-500">No history found.</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="border p-3 rounded">
                <p><strong>Old:</strong> {log.old_quantity}</p>
                <p><strong>New:</strong> {log.new_quantity}</p>
                <p><strong>Date:</strong> {new Date(log.change_date).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
