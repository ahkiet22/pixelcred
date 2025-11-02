# Developer Profile dApp

## Project Description

This application allows users to create and manage personal developer profiles on the Sui blockchain (testnet). Profile data is stored in a decentralized manner and can be uploaded to Walrus or Pinata (IPFS). The smart contract manages profiles and supports verification of information, including certificates and profile images.

## Key Features

1. **Connect Wallet**

   * Enables users to connect their Sui wallet for authentication and on-chain operations.
   * Supports testnet for development and testing.

2. **Create & Upload Profile On-chain**

   * Users can create a personal profile and store data directly on the blockchain testnet.
   * Each profile is uniquely linked to the user's wallet address.

3. **Upload and Store Images**

   * Profile pictures or other media files can be uploaded to Walrus and Pinata (IPFS).
   * The system returns IPFS links to ensure decentralized and verifiable data storage.

4. **Retrieve Profile Data**

   * Allows reading a user's profile information from the blockchain.
   * Supports displaying public or detailed information by wallet address.

5. **Smart Contract Profile Management & Verification**

   * Smart contracts handle profile verification and management.
   * Currently addressing an edit permission issue; full integration is pending.
   * Supports updating profile information, adding certificates, and changing private images.

6. **Future Enhancements**

   * Integrate Seal Verification to increase security and on-chain data authenticity.

## How to Use

1. Connect your Sui wallet.
2. Create a new profile and upload it to the blockchain.
3. Upload profile images or related media to Walrus/Pinata.
4. View or update the profile.
5. (Optional) Add certificates or update private images.

## Technologies Used

* Sui Blockchain (Testnet)
* Move Smart Contract
* IPFS (Walrus, Pinata)
* React / Next.js / Tailwind CSS / Shadcn UI
