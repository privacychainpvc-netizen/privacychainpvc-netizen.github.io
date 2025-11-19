// ====== TERMINAL TYPING ANIMATION ======

const words = [
  "PRIVACY",
  "ILLUSION",
  "SOLANA",
  "ENCRYPT",
  "ZERO-KNOWLEDGE",
  "OPACITY",
  "FOG COMPRESSION",
  "REDACTED",
  "PVC"
];

let currentWordIndex = 0;
let currentCharIndex = 0;
let deleting = false;
let typingElement = document.getElementById("terminal-typed");

function typeLoop() {
  if (!typingElement) return;

  const word = words[currentWordIndex];

  if (!deleting) {
    // typing
    typingElement.textContent = word.slice(0, currentCharIndex + 1);
    currentCharIndex++;
    if (currentCharIndex === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1000); // pause before deleting
      return;
    }
  } else {
    // deleting
    typingElement.textContent = word.slice(0, currentCharIndex - 1);
    currentCharIndex--;
    if (currentCharIndex === 0) {
      deleting = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
    }
  }

  const delay = deleting ? 60 : 110;
  setTimeout(typeLoop, delay);
}

typeLoop();

// ====== TERMINAL OUTPUT HELPER ======

const outputEl = document.getElementById("terminal-output");
const terminalBody = document.getElementById("terminal-body");

function printToTerminal(line) {
  if (!outputEl) return;
  const existing = outputEl.textContent;
  outputEl.textContent = (existing ? existing + "\n" : "") + line;
  if (terminalBody) {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
}

// Initial boot text
printToTerminal("Initializing IOS (Illusion-of-Security™) layer...");
printToTerminal("Connecting to Solana privacy relay...");
printToTerminal("Status: ONLINE\n");

// ====== CTRL + KEYWORD SHORTCUTS ======

let ctrlSequence = "";

window.addEventListener("keydown", (e) => {
  if (!e.ctrlKey) return;

  const key = e.key.toUpperCase();

  // ignore control keys themselves
  if (key.length === 1 && /[A-Z0-9]/.test(key)) {
    ctrlSequence += key;
    if (ctrlSequence.length > 8) {
      ctrlSequence = ctrlSequence.slice(-8);
    }

    // Check sequences
    if (ctrlSequence.endsWith("PVC")) {
      printToTerminal("> Command received: PVC");
      printToTerminal("PRIVACY MODE ENABLED. IOS shields calibrated.\n");
      ctrlSequence = "";
    } else if (ctrlSequence.endsWith("SAFU")) {
      printToTerminal("> Command received: SAFU");
      printToTerminal("STATUS: USER FUNDS MARKED AS SAFU*");
      printToTerminal("*Illusion-of-Security™ may be involved.\n");
      ctrlSequence = "";
    } else if (ctrlSequence.endsWith("IOS")) {
      printToTerminal("> Command received: IOS");
      printToTerminal("Deploying Illusion-of-Security™ framework...");
      printToTerminal("All systems obfuscated. Nobody knows what's going on.\n");
      ctrlSequence = "";
    } else if (ctrlSequence.endsWith("WTF")) {
      printToTerminal("> Command received: WTF");
      printToTerminal("ACCESS DENIED. YOU ARE NOT CLEARED FOR THIS LAYER.\n");
      ctrlSequence = "";
    }
  }
});
