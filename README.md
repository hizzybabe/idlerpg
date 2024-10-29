# Roguelike RPG Idler

A simple browser-based idle RPG game with roguelike elements, built using vanilla HTML, CSS, and JavaScript.

## Features

- Character progression system with levels and experience
- Character customization:
  - Unique avatar emojis for each class
  - Dark/Light theme toggle with persistent settings
- Three distinct character classes to choose from at level 10:
  - Fighter: +2 EXP from training
  - Wizard: +10% quest EXP
  - Merchant: +2 inventory slots
- Combat and Progression:
  - Auto-equip inventory system with various items (Sword, Shield, Armor)
  - Combat system with random encounters and critical hits (10% chance)
  - Item drops from quests (20% chance)
  - Health and experience progress bars
  - Level-based scaling for damage and rewards
- Equipment System:
  - Sword: +3 ATK
  - Shield: +3 DEF
  - Armor: +5 DEF
- Game Features:
  - Shop system for buying and selling items
  - Health recovery system using experience points
  - Action log showing recent events (last 20 entries)
  - Idle training system that generates experience over time
  - Game over system with restart functionality
  - Persistent dark/light theme settings

## Getting Started

1. Clone this repository
2. Open `index.html` in your web browser
3. Start playing!

## How to Play

- Click "Train" to gain experience safely
- Go on "Quest" to gain more experience but risk taking damage
- Visit the "Shop" to buy or sell items
- Use "Recover Health" to heal by spending experience points
- Toggle "Idle Training" to gain experience automatically
- Reach level 10 to choose a character class
- Collect items to increase your attack and defense stats

## Game Mechanics

- Items are automatically equipped when obtained
- Critical hits have a 10% chance during quests, dealing 2-3x damage
- New items have a 20% chance to drop from quests
- The game ends if your health reaches 0
- Experience requirements increase by 50% with each level
- Maximum health increases by 20 with each level
- Idle training gives 1 EXP and costs 1 health every 10 seconds
- Idle training stops automatically when health drops below 10

## Installation

1. Make sure you have Node.js 18.x or higher installed
2. Clone the repository:
   ```bash
   git clone https://github.com/hizzybabe/idlerpg.git
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

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.