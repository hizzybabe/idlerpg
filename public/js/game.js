let level = 1;
        let experience = 0;
        let nextLevelExp = 10;
        let health = 100;
        let maxHealth = 100;
        let inventory = ["Empty", "Empty", "Empty"];
        const itemNames = ["⚔️ Sword", "🛡️ Shield", "🦺 Armor"];
        let baseAtk = 5;
        let baseDef = 5;
        let atk = baseAtk;
        let def = baseDef;
        const itemStats = {
            "⚔️ Sword": { atk: 3, def: 0 },
            "🛡️ Shield": { atk: 0, def: 3 },
            "🦺 Armor": { atk: 0, def: 5 }
        };

        let isDarkMode = localStorage.getItem('darkMode') === 'true';

        let characterClass = "Novice";
        let classSelected = false;

        function toggleTheme() {
            isDarkMode = !isDarkMode;
            localStorage.setItem('darkMode', isDarkMode);
            document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
            document.getElementById('theme-toggle').textContent = isDarkMode ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
        }

        function updateStats() {
            document.getElementById("level").innerText = level;
            document.getElementById("experience").innerText = experience;
            document.getElementById("next-level-exp").innerText = nextLevelExp;
            document.getElementById("health").innerText = health;
            document.getElementById("max-health").innerText = maxHealth;
            document.getElementById("attack").innerText = atk;
            document.getElementById("defense").innerText = def;
            
            // Update progress bars
            const healthPercent = (health / maxHealth) * 100;
            const expPercent = (experience / nextLevelExp) * 100;
            document.getElementById("health-bar").style.width = healthPercent + "%";
            document.getElementById("exp-bar").style.width = expPercent + "%";
            
            // Update all inventory slots
            for (let i = 0; i < inventory.length; i++) {
                const itemElement = document.getElementById("item" + (i + 1));
                if (itemElement) {
                    itemElement.innerText = inventory[i];
                }
            }
            document.getElementById("character-class").innerText = characterClass;
            
            // Show class selection at level 10
            const classSelection = document.getElementById("class-selection");
            if (level >= 10 && !classSelected) {
                classSelection.style.display = "block";
            } else {
                classSelection.style.display = "none";
            }
        }

        function train() {
            let expGain = 2;
            if (characterClass === "Fighter") {
                expGain += 2;
            }
            experience += expGain;
            logAction(`You gained ${expGain} experience from training.`);
            checkLevelUp();
            updateStats();
        }

        function quest() {
            let damage = Math.floor(Math.random() * 11) + 5;
            damage = Math.floor(damage * (1 + (level - 1) * 0.1));
            damage = Math.max(1, damage - Math.floor(def * 0.5));

            if (Math.random() < 0.1) {
                let criticalMultiplier = Math.random() + 2;
                damage = Math.floor(damage * criticalMultiplier);
                logAction(`CRITICAL HIT! You took ${damage} massive damage!`);
            }

            let expGain = Math.floor((Math.random() * 6) + 4);
            expGain = Math.floor(expGain * (1 + atk * 0.2));
            
            // Wizard bonus
            if (characterClass === "Wizard") {
                expGain = Math.floor(expGain * 1.1);
            }

            health -= damage;
            experience += expGain;
            logAction(`You went on a quest and lost ${damage} health but gained ${expGain} experience.`);

            if (Math.random() < 0.2) {
                addItemToInventory();
            }
            if (health <= 0) {
                gameOver();
                return;
            }
            checkLevelUp();
            updateStats();
        }

        function addItemToInventory() {
            for (let i = 0; i < inventory.length; i++) {
                if (inventory[i] === "Empty") {
                    let newItem = itemNames[Math.floor(Math.random() * itemNames.length)];
                    inventory[i] = newItem;
                    logAction(`You found a ${newItem}!`);
                    break;
                }
            }
            calculateStats();
            updateStats();
        }

        function shop() {
            let action = prompt("Do you want to 'buy' an item or 'sell' an item?");
            if (action === 'buy') {
                buyItem();
            } else if (action === 'sell') {
                sellItem();
            }
            updateStats();
        }

        function buyItem() {
            let newItem = itemNames[Math.floor(Math.random() * itemNames.length)];
            for (let i = 0; i < inventory.length; i++) {
                if (inventory[i] === "Empty") {
                    inventory[i] = newItem;
                    logAction(`You bought a ${newItem}.`);
                    break;
                }
            }
            calculateStats();
            updateStats();
        }

        function sellItem() {
            let itemIndex = prompt("Which item slot (1, 2, 3) would you like to sell?");
            itemIndex = parseInt(itemIndex) - 1;
            if (inventory[itemIndex] !== "Empty") {
                logAction(`You sold your ${inventory[itemIndex]}.`);
                inventory[itemIndex] = "Empty";
            } else {
                logAction("That slot is already empty.");
            }
            calculateStats();
            updateStats();
        }

        function recoverHealth() {
            let expCost = Math.min(10, experience);
            if (health < maxHealth) {
                health = Math.min(maxHealth, health + expCost * 2);
                experience -= expCost;
                logAction(`Recovered health using ${expCost} experience.`);
            } else {
                logAction("Health is already full.");
            }
            updateStats();
        }

        function checkLevelUp() {
            if (experience >= nextLevelExp) {
                level++;
                experience -= nextLevelExp;
                nextLevelExp = Math.floor(nextLevelExp * 1.5);
                maxHealth += 20;
                health = maxHealth;
                logAction(`You leveled up to level ${level}! Max health increased to ${maxHealth}.`);
            }
        }

        function logAction(message) {
            const log = document.getElementById("log");
            const newEntry = document.createElement("p");
            newEntry.textContent = message;
            
            // Insert the new message at the top
            log.insertBefore(newEntry, log.firstChild);
            
            // Keep only the last 20 entries
            const entries = log.getElementsByTagName("p");
            while (entries.length > 20) {
                log.removeChild(entries[entries.length - 1]);
            }
        }

        function calculateStats() {
            atk = baseAtk;
            def = baseDef;
            
            // Add stats from items
            inventory.forEach(item => {
                if (item !== "Empty" && itemStats[item]) {
                    atk += itemStats[item].atk;
                    def += itemStats[item].def;
                }
            });
        }

        function gameOver() {
            // Disable all buttons
            const buttons = document.getElementsByTagName('button');
            for (let button of buttons) {
                button.disabled = true;
            }
            
            // Display game over message
            logAction("GAME OVER! You have died!");
            
            // Add restart button
            const container = document.querySelector('.container');
            const restartButton = document.createElement('button');
            restartButton.textContent = 'Restart Game';
            restartButton.onclick = restartGame;
            container.appendChild(restartButton);
        }

        function restartGame() {
            // Reset all stats to initial values
            level = 1;
            experience = 0;
            nextLevelExp = 10;
            health = 100;
            maxHealth = 100;
            inventory = ["Empty", "Empty", "Empty"];
            atk = baseAtk;
            def = baseDef;
            
            // Re-enable all buttons
            const buttons = document.getElementsByTagName('button');
            for (let button of buttons) {
                button.disabled = false;
            }
            
            // Remove restart button
            const restartButton = document.querySelector('button[onclick="restartGame()"]');
            if (restartButton) {
                restartButton.remove();
            }
            
            // Clear log
            const log = document.getElementById('log');
            log.innerHTML = '';
            
            // Update display
            logAction("New game started!");
            updateStats();
            
            characterClass = "Novice";
            classSelected = false;
            
            // Remove extra merchant slots if they exist
            const inventoryDiv = document.getElementById("inventory");
            const item4 = document.getElementById("item4");
            const item5 = document.getElementById("item5");
            if (item4) item4.remove();
            if (item5) item5.remove();
        }

        // Initialize theme
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('theme-toggle').textContent = '☀️ Toggle Light Mode';
        }

        updateStats();

        function selectClass(className) {
            if (level >= 10 && !classSelected) {
                characterClass = className;
                classSelected = true;
                
                // Update avatar
                updateAvatar(className);
                
                // Apply class bonuses
                if (className === "Merchant") {
                    // Add 2 new inventory slots
                    inventory.push("Empty", "Empty");
                    
                    // Add new inventory slots to HTML
                    const inventoryDiv = document.getElementById("inventory");
                    for (let i = 4; i <= 5; i++) {
                        const newSlot = document.createElement("div");
                        newSlot.className = "inventory-item";
                        newSlot.id = "item" + i;
                        newSlot.innerText = "Empty";
                        inventoryDiv.appendChild(newSlot);
                    }
                }
                
                logAction(`You have become a ${className}!`);
                updateStats();
            }
        }

        function updateAvatar(className) {
            const avatarEmoji = {
                'Novice': '🧙',
                'Fighter': '⚔️',
                'Wizard': '🔮',
                'Merchant': '💰'
            };
            
            const avatar = document.querySelector('.avatar');
            avatar.innerHTML = avatarEmoji[className] || '🧙';
        }

        let idleTraining = false;
        let idleTrainingInterval;

        function toggleIdleTraining() {
            idleTraining = !idleTraining;
            document.getElementById('idle-training-toggle').textContent = idleTraining ? 'Stop Idle Training' : 'Start Idle Training';

            if (idleTraining) {
                idleTrainingInterval = setInterval(() => {
                    if (health > 10) {
                        experience += 1;
                        health -= 1;
                        logAction('Idle training: Gained 1 experience and lost 1 health.');
                        checkLevelUp();
                        updateStats();
                    } else {
                        // Automatically stop idle training
                        idleTraining = false;
                        clearInterval(idleTrainingInterval);
                        document.getElementById('idle-training-toggle').textContent = 'Start Idle Training';
                        logAction('Idle training stopped: Health is too low.');
                    }
                }, 10000);
            } else {
                clearInterval(idleTrainingInterval);
            }
        }