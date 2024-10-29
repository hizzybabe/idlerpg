# Roguelike RPG Idler

A simple browser-based idle RPG game with roguelike elements, built using vanilla HTML, CSS, and JavaScript.

## Features

- Character progression system with levels and experience
- Three distinct character classes to choose from at level 10:
  - Fighter: +2 EXP from training
  - Wizard: +10% quest EXP
  - Merchant: +2 inventory slots
- Auto-equip inventory system with various items
- Combat system with random encounters and critical hits
- Dark/Light theme toggle with persistent settings
- Shop system for buying and selling items
- Health recovery system using experience points
- Action log showing recent events

## Getting Started

1. Clone this repository
2. Open `index.html` in your web browser
3. Start playing!

## How to Play

- Click "Train" to gain experience safely
- Go on "Quest" to gain more experience but risk taking damage
- Visit the "Shop" to buy or sell items
- Use "Recover Health" to heal by spending experience points
- Reach level 10 to choose a character class
- Collect items to increase your attack and defense stats

## Game Mechanics

- Items are automatically equipped when obtained
- Critical hits have a 10% chance during quests
- New items have a 20% chance to drop from quests
- The game ends if your health reaches 0
- Experience requirements increase with each level
- Maximum health increases with each level

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Installation

1. Make sure you have Node.js 18.x or higher installed
2. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/roguelike-rpg-idler.git
   ```
3. Navigate to the project directory:
   ```bash
   cd roguelike-rpg-idler
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. Open your browser and navigate to `http://localhost:3000`