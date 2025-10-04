# Nyntax - Word Chain Game

<div align="center">

![Nyntax Logo](public/user.png)

**A thrilling two-player word game that challenges your vocabulary and speed!**

[![Live Demo](https://img.shields.io/badge/Live_Demo-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://nyntax-project.netlify.app/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

## Overview

Nyntax is an exciting word chain game where two players compete to create valid English words while following specific rules. Each player must think quickly, use their vocabulary wisely, and manage their points strategically to win!

## Game Rules

### Basic Gameplay

- **Two Players**: Take turns to submit valid English words
- **Word Chain**: Each word must start with the last letter of the previous word
- **Time Pressure**: You have **15 seconds** to submit your word
- **Minimum Length**: All words must be at least **4 characters** long
- **No Repeats**: Words cannot be reused by either player

### Scoring System

Points are deducted based on word length and timing:

| Word Length        | Timer > 5s | Timer ≤ 5s |
| ------------------ | ---------- | ---------- |
| **8+ characters**  | -13 points | -10 points |
| **< 8 characters** | -8 points  | -8 points  |

### Winning Conditions

- Game ends when any player reaches **0 points**
- The other player is declared the winner
- Both players start with **150 points**

### Timer Rules

- **15-second countdown** for each turn
- **Timer expires**: Automatic "Pass" added to history, turn switches
- **Text cleared**: Input field is cleared when timer runs out
- **Visual feedback**: Timer turns red when ≤ 3 seconds remain

### Invalid Submissions

The following will show an error and keep you on your turn:

- Words shorter than 4 characters
- Words already used by either player
- Words not found in the English dictionary
- Case-insensitive duplicate checking

## Getting Started

### Quick Start

**Want to play right now?**

[🎮 **Play Nyntax Online**](https://nyntax-project.netlify.app/) - No installation required!

### Local Development

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **pnpm** (pnpm recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shohanshovo11/Nyntax.git
   cd Nyntax
   ```

2. **Install dependencies**

   ```bash
   # Using pnpm (recommended)
   pnpm install

   # Or using npm
   npm install
   ```

3. **Start the development server**

   ```bash
   # Using pnpm
   pnpm dev

   # Or using npm
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start playing!

## Available Scripts

| Script          | Command        | Description                          |
| --------------- | -------------- | ------------------------------------ |
| **Development** | `pnpm dev`     | Starts the development server        |
| **Build**       | `pnpm build`   | Builds the app for production        |
| **Preview**     | `pnpm preview` | Preview the production build locally |
| **Lint**        | `pnpm lint`    | Run ESLint to check code quality     |

## How to Play

1. **Game Start**: Player 1 begins with a random starting letter
2. **Enter Word**: Type a valid English word starting with the placeholder letter
3. **Submit**: Press Enter or click submit before time runs out
4. **Word Chain**: Next player must use the last letter of your word
5. **Strategy**: Use longer words when you have time for better scoring
6. **Win**: Reduce your opponent's points to 0 to win!

### Pro Tips

- **Think Fast**: Plan your next word while opponent is playing
- **Long Words**: 8+ character words give better scores with time
- **Time Management**: Submit quickly if you can't think of long words
- **Memory**: Remember used words to avoid duplicates
- **Strategy**: Force difficult letters on your opponent

## Project Structure

```
Nyntax/
├── public/
│   └── user.png              # Game logo/icon
├── src/
│   ├── components/
│   │   ├── HistorySection.jsx    # Shows word history
│   │   ├── InputField.jsx        # Text input component
│   │   ├── Label.jsx             # Player name display
│   │   └── SinglePlayerSide.jsx  # Individual player UI
│   ├── App.jsx               # Main game logic
│   ├── index.css            # Global styles
│   └── main.jsx             # React entry point
├── package.json             # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── README.md               # This file
```

## Technical Features

### Frontend Technologies

- **React 19.1.1**: Modern React with latest features
- **Vite 7.1.7**: Lightning-fast build tool and dev server
- **TailwindCSS 4.1.14**: Utility-first CSS framework
- **Axios 1.12.2**: HTTP client for dictionary API calls

### Game Features

- **Real-time countdown timer** with visual feedback
- **Focus management** for seamless turn switching
- **Dictionary validation** using external API
- **Game state management** with React hooks
- **Responsive design** with TailwindCSS
- **Game restart functionality**

### API Integration

- **Dictionary API**: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- **Real-time validation**: Checks word validity in English dictionary
- **Error handling**: Graceful handling of API failures

## Contributing

I welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update README if needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Shohan Shovo**

- GitHub: [@shohanshovo11](https://github.com/shohanshovo11)
- Repository: [Nyntax](https://github.com/shohanshovo11/Nyntax)

## Acknowledgments

- **Dictionary API** for word validation
- **React Team** for the amazing framework
- **Vite Team** for the blazing-fast build tool
- **TailwindCSS** for beautiful styling
- **Open Source Community** for inspiration and support

---

<div align="center">

**Ready to challenge your vocabulary? Start playing Nyntax now!**

[🎮 **Play Now**](https://nyntax-project.netlify.app/) | [Star this repo](https://github.com/shohanshovo11/Nyntax) | [Report Bug](https://github.com/shohanshovo11/Nyntax/issues) | [Request Feature](https://github.com/shohanshovo11/Nyntax/issues)

</div>

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
