export interface WalrusUploadResult {
  blobId: string;
  suiObjectId?: string;
  status: "Newly created" | "Already certified";
  blobUrl: string;
}

export interface WalrusUploadOptions {
  file: File;
  epochs?: number;
  publisherUrl: string;
  aggregatorUrl: string;
}

/**
 * Upload a file to Walrus and return blob information.
 */
export async function uploadToWalrus({
  file,
  epochs = 1,
  publisherUrl,
  aggregatorUrl,
}: WalrusUploadOptions): Promise<WalrusUploadResult> {
  if (!file) throw new Error("No file provided!");

  // Prepare query parameters
  const params = new URLSearchParams();
  params.append("epochs", epochs.toString());

  // Upload file to Walrus publisher
  const response = await fetch(`${publisherUrl}/v1/blobs?${params.toString()}`, {
    method: "PUT",
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const data = await response.json();

  console.log("DATA UPLOAD ON CHAIN", data)

  // Extract blob ID and Sui object ID
  const blobId =
    data.newlyCreated?.blobObject?.blobId || data.alreadyCertified?.blobId;
  const suiObjectId = data.newlyCreated?.blobObject?.id;

  if (!blobId) throw new Error("Blob ID not returned!");

  const blobUrl = `${aggregatorUrl}/v1/blobs/${blobId}`;

  console.log("blobUrl", blobUrl)

  return {
    blobId,
    suiObjectId,
    status: data.newlyCreated ? "Newly created" : "Already certified",
    blobUrl,
  };
}
