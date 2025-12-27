import axios from "axios";
import React, { useRef, useState } from "react";

const ExcelUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFileSelected = (f: File | null) => {
    setMessage(null);
    setFile(f);
  };

  const handleSelectClick = () => inputRef.current?.click();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const dropped = e.dataTransfer.files?.[0] ?? null;
    if (dropped) onFileSelected(dropped);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const allowed = /\.xlsx?$|\.xls$|\.csv$/i;
    if (!allowed.test(file.name)) {
      setMessage("Unsupported file type. Use .xlsx, .xls or .csv");
      return;
    }

    try {
      setUploading(true);
      setMessage(null);
      const fd = new FormData();
      fd.append("file", file);
      console.log(fd);

      const res = await axios.post(
        `${process.env.path}/notes/file/upload/csv-bulk`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            sessionId: sessionStorage.getItem("token") || "",
          },
        }
      );
      const json = res.data;
      console.log("response", json);

      setMessage(json?.message ?? "Upload successful");
      setFile(null);
      setUploading(false);
    } catch (error) {
      setMessage(
        `Upload failed: ${error instanceof Error ? error.message : error}`
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: 680,
        margin: "24px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Bulk Excel Upload</h2>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #ccc",
          padding: 24,
          borderRadius: 8,
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={handleSelectClick}
      >
        <p style={{ margin: 0 }}>
          Drag & drop an Excel file here, or click to select.
        </p>
        <p style={{ marginTop: 8, color: "#666" }}>Accepted: .xlsx .xls .csv</p>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          style={{ display: "none" }}
          onChange={(e) => onFileSelected(e.target.files?.[0] ?? null)}
        />
      </div>

      <div
        style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}
      >
        <div style={{ flex: 1 }}>
          {file ? (
            <div>
              <strong>Selected:</strong> {file.name} —{" "}
              {(file.size / 1024).toFixed(1)} KB
            </div>
          ) : (
            <div style={{ color: "#666" }}>No file selected</div>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          style={{ padding: "8px 12px", borderRadius: 6 }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {message && (
        <div
          style={{
            marginTop: 12,
            color: message.includes("success") ? "green" : "#c00",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;
