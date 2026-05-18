"use client";

import { useState } from "react";
import QrScanner from "qr-scanner";

interface QrUploaderProps {
  onDecoded: (url: string) => void;
  onError: (msg: string) => void;
}

export function QrUploader({ onDecoded, onError }: QrUploaderProps) {
  const [decodedUrl, setDecodedUrl] = useState("");
  const [isReading, setIsReading] = useState(false);

  async function handleFileChange(file: File | undefined) {
    setDecodedUrl("");
    onError("");

    if (!file) {
      return;
    }

    setIsReading(true);

    try {
      const result = await QrScanner.scanImage(file);

      if (!result.startsWith("http")) {
        onError("QR code does not contain a URL");
        return;
      }

      setDecodedUrl(result);
      onDecoded(result);
    } catch {
      onError("Could not read QR code from this image");
    } finally {
      setIsReading(false);
    }
  }

  return (
    <div className="qr-uploader">
      <label className="qr-dropzone" htmlFor="qrFile">
        <span>{isReading ? "Reading QR code..." : "Upload a QR code image"}</span>
        <small>Upload any QR code from a suspicious payment page or marketplace listing.</small>
      </label>
      <input
        id="qrFile"
        className="file-input"
        type="file"
        accept="image/*"
        disabled={isReading}
        onChange={(event) => {
          void handleFileChange(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      {decodedUrl ? (
        <label className="decoded-url">
          Decoded URL
          <input readOnly value={decodedUrl} />
        </label>
      ) : null}
    </div>
  );
}
