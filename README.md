# 🛡️ Cyber Chess – Learn Cybersecurity Through Chess

A gamified learning experience where **each chess piece represents a real cybersecurity vulnerability**, and capturing pieces teaches you about attacks like SQL Injection, Zero-Day Exploits, MITM, DDoS, Phishing, and more.

Built with **React + Vite**, this project combines classic chess mechanics with cybersecurity awareness in a fun, interactive way.

---

## ♟️ Features

### 🎮 Game Mechanics

* Play as **White (Defender)** against a computer-controlled **Black (Attacker)**.
* Fully interactive chessboard with:

  * Piece selection
  * Movement rules
  * Captures
  * Turn-based logic
* Intelligent computer opponent with basic heuristics.

### 🔐 Cybersecurity Integration

Each chess piece maps to a cybersecurity vulnerability:

| Piece | Vulnerability         | Meaning                    |
| ----- | --------------------- | -------------------------- |
| ♔ / ♚ | **Zero-Day Exploit**  | Game-ending critical flaw  |
| ♕ / ♛ | **SQL Injection**     | Powerful DB manipulation   |
| ♖ / ♜ | **DDoS Attack**       | System/resource overload   |
| ♗ / ♝ | **Man-in-the-Middle** | Communication interception |
| ♘ / ♞ | **Phishing**          | Social engineering trick   |
| ♙ / ♟ | **Weak Password**     | Most common entry point    |

Capturing a piece reveals detailed information, icon, and explanation.

---

## 🌟 Why This Project?

This app is designed to:

* Teach cybersecurity principles **through gameplay**
* Make learning vulnerabilities more intuitive
* Build awareness of real-world exploit types
* Provide a unique educational tool for students & beginners

Perfect for tech workshops, hackathons, and cybersecurity clubs!

---

## 🚀 Tech Stack

* **React**
* **Vite**
* **TailwindCSS**
* **Lucide Icons**
* **JavaScript (ES6+)**

---

## 📂 Project Structure

```
cyber-chess-app/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── CyberChess.jsx
│   ├── main.jsx
│   └── assets/
│
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/siddhi0138/cyber-chess-app.git
cd cyber-chess-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run in development

```bash
npm run dev
```

Server will start at:

```
http://localhost:5173/
```

(or the next available port)

---

## 🏗️ Build for Production

```bash
npm run build
```

Output folder:

```
/dist
```

---

## 🌐 Deployment

This project can be deployed on:

### ✔ Vercel (recommended for Vite)

Steps:

1. Push code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import repository
4. Build settings:

   * Build command: `npm run build`
   * Output directory: `dist`
5. Deploy 🚀

### ✔ Netlify (drag & drop or Git)

Drop the `/dist` folder onto:
[https://app.netlify.com/drop](https://app.netlify.com/drop)

---

## 🖼️ Screenshots 

🏁 Start Screen – Rules & Mapping

<img width="1918" height="907" alt="image" src="https://github.com/user-attachments/assets/3128bbf6-99d9-48c9-a7dc-2be0101e143b" />

<img width="1895" height="438" alt="image" src="https://github.com/user-attachments/assets/1c936d57-a4e1-4dcc-8d07-72f611818890" />

The introductory screen showing game title, how-to-play instructions, and vulnerability mapping for each piece.

♟️ Gameplay – Board & Turns

<img width="1900" height="895" alt="image" src="https://github.com/user-attachments/assets/3ccadd57-02fe-4737-a787-9e9ce6e6fa4b" />

<img width="1891" height="903" alt="image" src="https://github.com/user-attachments/assets/0ae6011d-1c1e-4100-817c-aab7ff196b41" />

The main chessboard view with the defender (white) vs attacker (black), showing current turn and active selection.

🧩 Vulnerability Popup

<img width="1878" height="897" alt="image" src="https://github.com/user-attachments/assets/a4b34d53-f4ff-4eda-81e6-a2808e82fd3a" />

<img width="1885" height="621" alt="image" src="https://github.com/user-attachments/assets/168ccdfe-6a67-437d-94f6-211aa2a917d3" />

The vulnerability detail section that appears after a capture, explaining what that attack means in real life.

📊 Sidebar – Defenses vs Exploits

<img width="1888" height="809" alt="image" src="https://github.com/user-attachments/assets/b45f9fbe-4daf-4e93-a49d-13ca6531338e" />

Side panels tracking your patched vulnerabilities (white captures) and the attacker’s successful exploits (black captures).

---

## 🤖 Computer AI

The attacker (Black) uses:

* All legal moves generation
* Heuristic scoring:

  * Captures are valued
  * Center control
  * Random variation for unpredictability
* Automatically moves after each white move.

---

## 🏁 Game End Conditions

* Capture the **Black King** → **You Win!**
* Your **White King** gets captured → **Computer Wins**
* No valid moves → stalemate → Defender wins

---


## 🤝 Contributing

PRs, issues, and suggestions are welcome!
If you'd like advanced features such as:

* Move highlighting
* Sound effects
* Timers
* Online multiplayer
* More attack vectors

Just open an issue or request a feature.

---








