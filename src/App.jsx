import React, { useState } from 'react';
import CyberChess from './CyberChess';
import { Shield, AlertTriangle, Bug } from 'lucide-react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-slate-900/80 border border-cyan-500/40 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Shield className="w-10 h-10 text-cyan-400" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center">
            Cybersecurity Chess
          </h1>
          <AlertTriangle className="w-10 h-10 text-yellow-400" />
        </div>

        <p className="text-cyan-100 text-center mb-6 text-sm md:text-base">
          Learn core cybersecurity vulnerabilities by playing a simple chess game
          against the computer. Every captured piece reveals a real-world attack!
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700">
            <h2 className="text-white font-semibold mb-2 text-lg flex items-center gap-2">
              <Bug className="w-5 h-5 text-red-400" />
              How to Play
            </h2>
            <ul className="list-disc list-inside text-gray-200 text-sm space-y-1">
              <li>You play as <span className="font-semibold text-cyan-300">White</span>.</li>
              <li>Click a white piece, then click a target square to move.</li>
              <li>The computer instantly plays as <span className="font-semibold text-red-300">Black</span>.</li>
              <li>Capture enemy pieces to reveal their vulnerability type.</li>
              <li>Capture the enemy King (Zero-Day Exploit) to win.</li>
            </ul>
          </div>

          <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700">
            <h2 className="text-white font-semibold mb-2 text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              Vulnerability Mapping
            </h2>
            <ul className="list-disc list-inside text-gray-200 text-sm space-y-1">
              <li><span className="font-semibold">King</span> → Zero-Day Exploit</li>
              <li><span className="font-semibold">Queen</span> → SQL Injection</li>
              <li><span className="font-semibold">Rook</span> → DDoS Attack</li>
              <li><span className="font-semibold">Bishop</span> → Man-in-the-Middle</li>
              <li><span className="font-semibold">Knight</span> → Phishing</li>
              <li><span className="font-semibold">Pawn</span> → Weak Password</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700 mb-6">
          <h2 className="text-white font-semibold mb-2 text-lg">
            Objective
          </h2>
          <p className="text-gray-200 text-sm">
            Play like normal chess, but think like a security engineer:
            every captured piece = one vulnerability identified. Your goal is to
            patch (capture) more vulnerabilities than the attacker exploits, and
            ultimately neutralize the Zero-Day (black King).
          </p>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={onStart}
            className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-sm md:text-base shadow-lg shadow-cyan-500/30 transition-transform transform hover:-translate-y-0.5"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <StartScreen onStart={() => setStarted(true)} />;
  }

  return <CyberChess onBackToMenu={() => setStarted(false)} />;
};

export default App;
