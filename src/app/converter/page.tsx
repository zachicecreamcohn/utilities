"use client";

import { useState } from "react";
import { convertFile } from "@/app/actions/convertFile";

export default function Converter() {
  const [outputFormat, setOutputFormat] = useState("mp3");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
        setError("File size exceeds 50MB");
        setFile(null);
        return;
      }
      setError(null);
      setFile(selectedFile);
    }
  };

const outputFormats = [
  // Audio Formats
  "mp3", "wav", "aac", "flac", "ogg", "m4a", "wma", "opus", "alac", "amr",
  "aiff", "pcm", "au", "ac3", "caf", "dts", "eac3", "gsm", "ra", "voc",
  "mp2", "vorbis",

  // Video Formats
  "mp4", "mov", "avi", "mkv", "webm", "flv", "3gp", "wmv", "mxf", "ts",
  "m2ts", "mpeg", "mpg", "vob", "m2v", "asf", "divx", "dv", "rm", "rmvb",
  "hevc", "av1", "mts", "mjpg",

  // Image Formats
  "gif", "bmp", "jpg", "jpeg", "png", "tiff", "dpx", "tga", "yuv", "pam",
  "pbm", "pgm", "ppm", "pnm", "j2k", "jp2", "jpx", "sgi", "sun", "xbm",
  "xwd", "ico", "webp",

  // Subtitle Formats
  "srt", "ass", "ssa", "sub", "vtt", "ttml", "scc", "mcc", "stl", "dvbsub",

  // Container Formats (can contain multiple audio, video, or subtitle streams)
  "m4v", "f4v", "ogv", "nut", "m1v", "mpv",

  // Streaming and Raw Formats
  "rtp", "rtsp", "hls", "dash", "mjpeg", "swf", "heif", "ivf", "gxf",
  "mpsub", "psp", "pva"
];

  return (
    <form
      action={async (formData: FormData) => {
        setError(null);
        setIsLoading(true);
        try {
          const file = formData.get("file") as File;
          const format = formData.get("format") as string;
          if (!file || !format) throw new Error("File or format missing");

          const convertedBlob = await convertFile(file, format);
          const url = URL.createObjectURL(convertedBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `converted.${format}`;
          link.click();
          URL.revokeObjectURL(url);
        } catch (e) {
          setError((e as Error).message || "An unknown error occurred");
        } finally {
          setIsLoading(false);
        }
      }}
    >
    <div>
        <label htmlFor="file">Select File:</label>
        <input
          id="file"
          type="file"
          name="file"
          onChange={handleFileChange}
          required
        />
      </div>

      <div>
        <label htmlFor="format">Select Output Format:</label>
        <select
            id="format"
            name="format"
            value={outputFormat}
            onChange={(event) => setOutputFormat(event.target.value)}
            required
            >
            {outputFormats.map((format) => (
                <option key={format} value={format}>
                {format}
                </option>
            ))}
        </select>
        <input type="hidden" name="format" value={outputFormat} />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading && <p>Converting file, please wait...</p>}

      <button type="submit" disabled={isLoading} >
        Convert
      </button>
    </form>
  );
}
