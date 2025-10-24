import { MODULE_NAME, PACKAGE_ID } from "@/constants/contract";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Signer } from "@mysten/sui/cryptography";
import { Transaction } from "@mysten/sui/transactions";

const client = new SuiClient({
  url: getFullnodeUrl("testnet"),
});

export async function sendSponsoredTransaction(
  senderAddress: string,
  senderSignTx: (tx: Transaction) => Promise<string>,
  sponsorSigner: Signer,
  data: {
    name: string;
    username: string;
    avatar: string;
    github: string;
    linkedin: string;
    website: string;
    bio: string;
  }
) {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::${MODULE_NAME}::create`,
    arguments: [
      tx.pure.string(`${data.name}`),
      tx.pure.string(`${data.username}`),
      tx.pure.string(`${data.avatar}`),
      tx.pure.string(`${data.github}`),
      tx.pure.string(`${data.linkedin}`),
      tx.pure.string(`${data.website}`),
      tx.pure.string(`${data.bio}`),
    ],
  });

  const balances = await client.getAllBalances({
    owner: sponsorSigner.getPublicKey().toSuiAddress(),
  });
  if (!balances) {
    console.log("Sponsor funded");
  }

  tx.setGasBudget(10_000_000);

  tx.setSender(senderAddress);
  tx.setGasOwner(sponsorSigner.getPublicKey().toSuiAddress());

  const txBytes = await tx.build({ client });

  const sponsorSig = await sponsorSigner.signTransaction(txBytes);
  const senderSigHex = await senderSignTx(tx);

  const result = await client.executeTransactionBlock({
    transactionBlock: txBytes,
    signature: [senderSigHex, sponsorSig.signature],
    options: { showEffects: true },
  });

  console.log(result);
}
