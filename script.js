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
printToTerminal("Booting Illusion-of-Security™ core (IOS)...");
printToTerminal("Loading Zero-Knowledge Fog Compression modules...");
printToTerminal("Attaching Multi-Layer Opacity Consensus engine...");
printToTerminal("Routing traffic through Solana privacy relays...");
printToTerminal("Status: ONLINE | Visibility: REDACTED");
printToTerminal("Hint: type PVC, SAFU, IOS, WTF or CA.\n");

// ====== WHITEPAPER MODAL ======

const wpModal = document.getElementById("whitepaper-modal");
const wpClose = document.getElementById("wp-close");

function openWhitepaperModal() {
  if (wpModal) wpModal.style.display = "block";
}

function closeWhitepaperModal() {
  if (wpModal) wpModal.style.display = "none";
}

if (wpClose) {
  wpClose.addEventListener("click", closeWhitepaperModal);
}

window.addEventListener("click", (e) => {
  if (e.target === wpModal) {
    closeWhitepaperModal();
  }
});

// ====== CA POPUP ======

const caPopup = document.getElementById("ca-popup");
const caPopupClose = document.getElementById("ca-popup-close");
const caPopupAddress = document.getElementById("ca-popup-address");

function showCAPopup() {
  if (!caPopup || !caPopupAddress) return;
  const contractEl = document.querySelector(".addr");
  const text = contractEl ? contractEl.textContent.trim() : "Contract not set yet.";
  caPopupAddress.textContent = text;
  caPopup.style.display = "flex";
}

if (caPopupClose && caPopup) {
  caPopupClose.addEventListener("click", () => {
    caPopup.style.display = "none";
  });

  caPopup.addEventListener("click", (e) => {
    if (e.target === caPopup) {
      caPopup.style.display = "none";
    }
  });
}

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
    printToTerminal("PRIVACY MODE ENABLED. IOS shields calibrated to maximum opacity.\n");
    seq = "";
  } else if (seq.endsWith("SAFU")) {
    printToTerminal("> Command: SAFU");
    printToTerminal("STATUS: USER FUNDS FLAGGED AS SAFU.");
    printToTerminal("Note: Illusion-of-Security™ may be involved in this assessment.\n");
    seq = "";
  } else if (seq.endsWith("IOS")) {
    printToTerminal("> Command: IOS");
    printToTerminal("Deploying Illusion-of-Security™ framework...");
    printToTerminal("All signals obfuscated. Observability reduced to near-zero.\n");
    seq = "";
  } else if (seq.endsWith("WTF")) {
    printToTerminal("> Command: WTF");
    printToTerminal("ACCESS DENIED.");
    printToTerminal("You are not cleared for this privacy layer.\n");
    seq = "";
  } else if (seq.endsWith("CA")) {
    printToTerminal("> Command: CA");
    printToTerminal("Fetching PVC contract address from local illusion cache...\n");
    showCAPopup();
    seq = "";
  }
});
