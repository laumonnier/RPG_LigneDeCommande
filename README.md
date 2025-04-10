RPG Terminal - Donjon Héroïque 🏰⚔️
B1 Cybersécurité / B1 Informatique
Projet par groupes de 2 à 3
Date limite : 06/04/2025 à 23h59

📌 Objectif du projet
Créer un RPG en ligne de commande avec :

6 classes de personnages uniques (Guerrier, Mage, Paladin...)
5 types d'ennemis + 1 boss final
Système de combat tour-par-tour avec IA
Gestion d'inventaire et objets spéciaux
Architecture orientée objet stricte (<10 lignes hors classes)
🎯 Compétences évaluées
Diagramme de classes UML
Maîtrise du TypeScript avancé
Héritage & Polymorphisme
Interfaces & Classes abstraites
Gestion d'états complexes
🧙 Énoncé technique
1. Déroulement d'une partie
Diagramme de déroulement d'une partie

🧙 Classes de personnages
Classe	PV	PM	Attaque	Défense	Vitesse	Capacités Spéciales
Guerrier	150	N/A	20	15	10	Aucune capacité spéciale
Mage	100	100	5	5	15	Attaque magique personnalisable 🔥
Paladin	150	N/A	15	20	8	Attaque sainte (40% attaque physique) ✝️
Voleur	120	N/A	15	10	30	Vol d'objets (40-95% succès) 🗡️
Barbare	150	N/A	25	15	10	Attaque rage (+30% dégâts) -20% PV ⚔️
Prêtre	100	N/A	10	5	15	Soin des alliés (+25% PV) 💫
Le Mage dispose d'un pool de mana personnalisable via le constructeur (non visible dans l'extrait)

Détails des capacités spéciales
Mage 🔥

castSpell(enemy: Character, magicPower: number): void
Mécanique : Attaque magique à puissance variable
Coût : Mana équivalent à la puissance choisie
Particularité : Ignore la défense physique
Paladin ✝️

holyAttack(enemy: Character): void
Dégâts : 40% de l'attaque physique
Avantage : Aucun coût supplémentaire
Voleur 🗡️

stealObject(): void
Probabilités :
40% : Échec
30% : Potion
15% : Morceau d'étoile
10% : Ether
5% : Demi-étoile
Barbare ⚔️

rageAttack(enemy: Character): void
Bonus : +30% de dégâts
Pénalité : Perte de 20% PV max
Prêtre 💫

allowCare(target: Character): void
Soin : +25% PV
Cible : Soi-même ou allié
Menu : Interface de sélection interactive
Guerrier

// Aucune méthode supplémentaire
Rôle : DPS équilibré
Avantage : Statistiques offensives élevées
3. Système de combat
Ordre d'attaque basé sur la vitesse
Choix par menu :
Attaque physique/magique
Utilisation d'objet
Défense spéciale
Dégâts magiques ignorent l'armure
4. Objets disponibles
Objet	Effet	Stock initial
Potion 🧪	Soigne 50% PV	2
Morceau d'étoile	Résurrection (20% PV) ou Soin (50% PV)	1
Demi-étoile 🌟	Résurrection (100% PV) ou soin (100% PV)	0
Ether 💊	Restaure 30% MP	1
Contraintes techniques
100% TypeScript avec typage strict
Patterns utilisés :
Strategy (pour les IA)
Factory (création d'objets)
Singleton (gestion du jeu)
Validation :
Tests unitaires sur les classes de base
Scénarios de combat prédéfinis
📂 Structure du projet
├── Main.ts
├── README.md
├── classes/
│ ├── Adventurer.ts
│ ├── Barbarian.ts
│ ├── Boss.ts
│ ├── BossRoom.ts
│ ├── Character.ts
│ ├── ChestRoom.ts
│ ├── Fight.ts
│ ├── Game.ts
│ ├── GameManager.ts
│ ├── GroupInventory.ts
│ ├── Inventory.ts
│ ├── Mage.ts
│ ├── Menu.ts
│ ├── Monster.ts
│ ├── MonsterFactory.ts
│ ├── MonsterRoom.ts
│ ├── Paladin.ts
│ ├── Priest.ts
│ ├── Room.ts
│ ├── RoomManager.ts
│ ├── Thief.ts
│ ├── Warrior.ts
│ ├── globalInventory.ts
│ └── index.ts
├── package-lock.json
└── package.json
Installer les outils nécessaires
Installer Deno :
Vous pouvez installer Deno sur Linux ou Windows :

// Pour Windows en utilisant Powershell ou en utilisant npm
irm https://deno.land/install.ps1 | iex
npm install -g deno

// Pour Linux en utilisant curl, ou en utilisant npm
curl -fsSL https://deno.land/install.sh | sh
npm install -g deno
🧩 Dépendances principales
TypeScript (v5.x+)
Node.js (v18.x+)
Deno (v2.x+)
