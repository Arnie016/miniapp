# Flappy TON - Telegram Mini App Game

A blockchain-integrated Flappy Bird-style game that runs as a Telegram Mini App. Players can compete for high scores and win TON cryptocurrency prizes!

## Features

- 🎮 Classic Flappy Bird gameplay
- 💰 TON blockchain integration
- 👛 TON Connect wallet support
- 🏆 On-chain high scores
- 💎 Prize pool system
- 🎨 Telegram theme adaptation

## Prerequisites

- Node.js 16+
- TON Wallet (e.g., Tonkeeper, OpenMask)
- Telegram account

## Setup

1. Install dependencies:
```bash
npm install
```

2. Deploy the smart contract:
```bash
# First, update the mnemonic in scripts/deploy.ts
npm run deploy
```

3. Update configuration:
- Copy the deployed contract address to `CONTRACT_ADDRESS` in `index.html`
- Update the manifest URL in `tonconnect-manifest.json`

4. Run the development server:
```bash
npm start
```

## Smart Contract

The game uses a FunC smart contract (`contracts/FlappyTon.fc`) that handles:
- Score submission and verification
- Entry fee collection (0.1 TON per game)
- Prize pool management
- High score tracking

## Game Mechanics

1. Connect your TON wallet
2. Pay entry fee (0.1 TON)
3. Tap to make the bird fly
4. Avoid pipes and collect coins
5. Your high score is saved on the blockchain
6. Claim prizes based on your performance

## Development

### Project Structure
```
├── index.html          # Main game file
├── contracts/
│   └── FlappyTon.fc   # Game smart contract
├── scripts/
│   └── deploy.ts      # Deployment script
└── tonconnect-manifest.json
```

### Testing

1. Local testing:
```bash
npm test
```

2. Testnet deployment:
```bash
npm run deploy
```

## Security

- Smart contract is open source and verifiable
- Uses secure TON Connect for wallet integration
- Score submission is validated on-chain
- Entry fees and prizes handled by smart contract

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this code for your own projects!

## Resources

- [TON Documentation](https://ton.org/docs)
- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [TON Connect](https://github.com/ton-connect/sdk)
