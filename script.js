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

const typingElement = document.getElementById("terminal-typed");
const outputEl = document.getElementById("terminal-output");
const terminalBody = document.getElementById("terminal-body");

function typeLoop() {
  if (!typingElement) return;

  const word = words[currentWordIndex];

  if (!deleting) {
    typingElement.textContent = word.slice(0, currentCharIndex + 1);
    currentCharIndex++;
    if (currentCharIndex === word.length) {
      deleting = true;
      setTimeout(typeLoop, 900);
      return;
    }
  } else {
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

function printToTerminal(line) {
  if (!outputEl) return;
  const existing = outputEl.textContent;
  outputEl.textContent = (existing ? existing + "\n" : "") + line;
  if (terminalBody) {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
}

// Initial boot logs
printToTerminal("Booting IOS (Illusion-of-Security™) layer...");
printToTerminal("Connecting to Solana privacy relay...");
printToTerminal("Status: ONLINE");
printToTerminal("Hint: type PVC, SAFU, IOS or WTF.\n");

// ====== KEYWORD TRIGGERS (NO CTRL) ======

let seq = "";

window.addEventListener("keydown", (e) => {
  const tag = document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;

  const key = e.key.toUpperCase();
  if (key.length !== 1 || !/[A-Z0-9]/.test(key)) return;

  seq += key;
  if (seq.length > 10) {
    seq = seq.slice(-10);
  }

  if (seq.endsWith("PVC")) {
    printToTerminal("> Command: PVC");
    printToTerminal("PRIVACY MODE ENABLED. IOS shields calibrated.\n");
    seq = "";
  } else if (seq.endsWith("SAFU")) {
    printToTerminal("> Command: SAFU");
    printToTerminal("STATUS: FUNDS MARKED AS SAFU*");
    printToTerminal("*Illusion-of-Security™ guarantees nothing, but it feels good.\n");
    seq = "";
  } else if (seq.endsWith("IOS")) {
    printToTerminal("> Command: IOS");
    printToTerminal("Deploying Illusion-of-Security™ framework...");
    printToTerminal("All systems obfuscated. Nobody knows what's going on.\n");
    seq = "";
  } else if (seq.endsWith("WTF")) {
    printToTerminal("> Command: WTF");
    printToTerminal("ACCESS DENIED. You are not cleared for this layer.\n");
    seq = "";
  }
});
function openWhitepaperModal() {
  document.getElementById('whitepaper-modal').style.display = 'block';
}

function closeWhitepaperModal() {
  document.getElementById('whitepaper-modal').style.display = 'none';
}

window.addEventListener('click', function(e) {
  const modal = document.getElementById('whitepaper-modal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
