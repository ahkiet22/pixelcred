export async function uploadToPinata(file: File): Promise<string> {
  if (!file) throw new Error("File is required");

  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/api/files", {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const returnedUrl = await res.json();

  // Extract CID
  const cid = returnedUrl.split("/ipfs/")[1];
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}
