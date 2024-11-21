import { TonClient, WalletContractV4, internal } from "ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { getHttpEndpoint } from "@orbs-network/ton-access";

async function deploy() {
    // Initialize ton client
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    // Replace with your mnemonic
    const mnemonic = "YOUR_MNEMONIC_HERE";
    const key = await mnemonicToPrivateKey(mnemonic.split(" "));
    
    // Create wallet contract
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    const contract = client.open(wallet);
    
    // Check balance
    const balance = await contract.getBalance();
    console.log("Wallet balance:", balance.toString());
    
    if (balance.isZero()) {
        console.error("Error: Wallet has zero balance");
        process.exit(1);
    }
    
    // Deploy game contract
    const ENTRY_FEE = 0.1; // 0.1 TON
    const initData = {
        high_scores: {},
        entry_fee: ENTRY_FEE,
        prize_pool: 0
    };
    
    const deployResult = await contract.deploy({
        initData,
        initMessage: "init",
        value: "0.1", // Deploy with 0.1 TON
    });
    
    console.log("Game contract deployed at:", deployResult.address.toString());
}

deploy().catch(console.error);
