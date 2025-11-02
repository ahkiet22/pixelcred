"use client";

import {
  WALRUS_AGGREGATOR_TESTNET,
  WALRUS_PUBLISHER_TESTNET,
} from "@/constants/walrus";
import { uploadToWalrus, WalrusUploadResult } from "@/helpers/upload-image";
import React, { useState } from "react";

export default function WalrusUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [epochs, setEpochs] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<WalrusUploadResult[]>([]);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const result = await uploadToWalrus({
        file,
        epochs,
        publisherUrl: WALRUS_PUBLISHER_TESTNET,
        aggregatorUrl: WALRUS_AGGREGATOR_TESTNET,
      });

      setResults((prev) => [result, ...prev]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload File to Walrus</h1>

      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2"
        />
      </div>

      <div className="mb-4">
        <label>
          Epochs:{" "}
          <input
            type="number"
            min={1}
            value={epochs}
            onChange={(e) => setEpochs(parseInt(e.target.value))}
            className="border p-1 w-20"
          />
        </label>
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Uploaded Blobs</h2>
          <ul className="space-y-2">
            {results.map((r) => (
              <li key={r.blobId} className="border p-2 rounded">
                <p>
                  <strong>Status:</strong> {r.status}
                </p>
                <p>
                  <strong>Blob ID:</strong>{" "}
                  <a
                    href={r.blobUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {r.blobId}
                  </a>
                </p>
                {r.suiObjectId && (
                  <p>
                    <strong>Sui Object ID:</strong> {r.suiObjectId}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
