import { getFullnodeUrl } from "@mysten/sui/client";
import { SuiJsonRpcClient } from "@mysten/sui/jsonRpc";
import { walrus, WalrusFile } from "@mysten/walrus";

// Khởi tạo client với Walrus extension
const client = new SuiJsonRpcClient({
  url: getFullnodeUrl("testnet"),
  network: "testnet",
}).$extend(
  walrus({
    packageConfig: {
      systemObjectId:
        "0x98ebc47370603fe81d9e15491b2f1443d619d1dab720d586e429ed233e1255c1",
      stakingPoolId:
        "0x20266a17b4f1a216727f3eef5772f8d486a9e3b5e319af80a5b75809c035561d",
    },
  })
);

export async function uploadMediaWithFlow(file: File, signer: any): Promise<string> {
  console.log("🚀 Bắt đầu upload Walrus:", file.name);

  // Chuyển file -> Uint8Array bắt buộc
  const arrayBuffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer);

  const walrusFile = WalrusFile.from({
    contents: uint8,
    identifier: file.name,
  });

  const file1 = WalrusFile.from({
	contents: new Uint8Array([1, 2, 3]),
	identifier: 'file1.bin',
});

  const flow = client.walrus.writeFilesFlow({ files: [file1] });

  // 1. Encode local
  await flow.encode();
  console.log("✅ Encode xong");

  // 2. Register on-chain
  const registerTx = flow.register({
    epochs: 3,
    owner: signer.address,
    deletable: true,
  });
  const result = await signer.signAndExecuteTransaction({ transaction: registerTx });
  const { digest } = result;
  console.log("✅ Register xong:", digest);

  // 3. Upload storage node
  await flow.upload({ digest });
  console.log("✅ Upload xong");

  // 4. Certify on-chain
  const certifyTx = flow.certify();
  await signer.signAndExecuteTransaction({ transaction: certifyTx });
  console.log("✅ Certify xong");

  // 5. Lấy blobId
  const [resultFile] = await flow.listFiles();
  const blobId = resultFile.blobId;
  console.log("🎉 Upload thành công! BlobID:", blobId);

  return blobId;
}
