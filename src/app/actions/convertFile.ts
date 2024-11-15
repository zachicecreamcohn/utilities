"use server";
import { promises as fs } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import ffmpeg from "fluent-ffmpeg";

export async function convertFile(file: File, format: string) {
  const tempFile = join(tmpdir(), file.name);

  // Convert ArrayBuffer to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Write buffer to a temporary file
  await fs.writeFile(tempFile, buffer);

  const output = join(tmpdir(), `converted.${format}`);

  // Convert the file using ffmpeg
  await new Promise((resolve, reject) => {
    ffmpeg(tempFile)
      .output(output)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });

  // Read the converted file
  const convertedFile = await fs.readFile(output);

  // Clean up temporary files
  await fs.unlink(tempFile);
  await fs.unlink(output);

  // Return the converted file as a Blob
  return new Blob([convertedFile], { type: "application/octet-stream" });
}
