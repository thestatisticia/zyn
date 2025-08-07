# Zyn - Prediction Markets Platform

A modern, decentralized prediction markets platform built with React, TypeScript, and Stellar blockchain integration. Zyn allows users to create, participate in, and trade on prediction markets with a beautiful, intuitive interface.

## 🚀 Features

### Core Functionality
- **Prediction Markets**: Create and participate in prediction markets
- **Real-time Trading**: Buy and sell shares in market outcomes
- **Wallet Integration**: Connect with Stellar wallets for seamless transactions
- **Portfolio Management**: Track your positions and performance
- **Search & Filtering**: Find markets by category, tags, or search terms

### User Interface
- **Modern Design**: Clean, responsive interface with Tailwind CSS
- **Navigation**: Intuitive navigation with category tabs and search
- **Profile System**: User profiles with wallet management and settings
- **Dropdown Menus**: Interactive dropdown for user actions and settings
- **Modal Dialogs**: Smooth modal interactions for predictions and market creation

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **React Router**: Client-side routing for seamless navigation
- **Stellar Integration**: Blockchain integration for secure transactions
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Live market data and position updates

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Blockchain**: Stellar SDK, Stellar Base
- **Development**: ESLint, TypeScript ESLint

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-4
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header with dropdown
│   ├── CategoryTabs.tsx # Market category navigation
│   ├── MarketCard.tsx  # Individual market display
│   ├── PredictModal.tsx # Prediction modal
│   ├── CreateMarketModal.tsx # Market creation modal
│   ├── UserPortfolio.tsx # User portfolio display
│   └── Profile.tsx     # User profile page
├── hooks/              # Custom React hooks
│   └── useStellar.ts   # Stellar wallet integration
├── data/               # Mock data and constants
│   └── mockMarkets.ts  # Sample market data
├── types/              # TypeScript type definitions
│   └── market.ts       # Market and user types
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎯 Usage

### Connecting Your Wallet
1. Click the profile icon in the top-right corner
2. If not connected, click "Connect Wallet" to link your Stellar wallet
3. Your wallet ID will be displayed in the dropdown menu

### Browsing Markets
1. Use the category tabs to filter markets by type
2. Use the search bar to find specific markets
3. Click on any market card to view details and make predictions

### Making Predictions
1. Click on a market card to open the prediction modal
2. Choose "Yes" or "No" for your prediction
3. Enter the amount you want to invest
4. Confirm your prediction to place your bet

### Creating Markets
1. Click the "Create Market" button (when implemented)
2. Fill in the market details: question, description, category, tags
3. Set the end date and initial parameters
4. Submit to create your prediction market

### Managing Your Portfolio
1. Click on your profile icon to access the dropdown menu
2. View your active positions and performance
3. Access account settings and wallet management

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Components**: Create in `src/components/`
2. **Custom Hooks**: Add to `src/hooks/`
3. **Types**: Define in `src/types/`
4. **Mock Data**: Add to `src/data/`

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Follow the existing color scheme (teal, blue, gray)
- Maintain responsive design principles
- Use Lucide React icons for consistency

## 🌐 Blockchain Integration

### Stellar Network
- Currently configured for Stellar Testnet
- Supports Stellar wallet connections
- Handles XLM transactions and balances
- Mock implementation for development

### Wallet Features
- Public key display and copying
- Balance tracking
- Transaction history
- Testnet mode toggle

## 🎨 UI Components

### Header
- Logo and navigation links
- Search functionality
- Financial displays ($100,000, medals)
- User profile dropdown with wallet info

### Market Cards
- Market question and description
- Current prices and volume
- Category and tags
- Prediction buttons

### Modals
- Prediction modal for placing bets
- Market creation modal
- Responsive design with backdrop blur

### Dropdown Menus
- User profile dropdown
- Wallet ID display and copy functionality
- Testnet mode toggle
- Navigation links and logout

## 🔒 Security Considerations

- Wallet connections are handled securely
- Public keys are truncated for display
- Copy functionality uses secure clipboard API
- No sensitive data is stored locally

## 🚧 Future Enhancements

- [ ] Real Stellar network integration
- [ ] Advanced market types
- [ ] Social features and comments
- [ ] Mobile app development
- [ ] Advanced analytics and charts
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Push notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Built with ❤️ using React, TypeScript, and Stellar** 