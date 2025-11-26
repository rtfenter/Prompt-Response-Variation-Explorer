// Simple hash to create repeatable variation from a string
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickFrom(arr, seed) {
  if (!arr.length) return "";
  const idx = seed % arr.length;
  return arr[idx];
}

// Presets in display order
const PRESETS = [
  {
    id: "balanced",
    label: "Balanced",
    style: "Balanced explanation",
    length: "medium",
    desc: "Medium length, neutral tone, moderate structure."
  },
  {
    id: "high_creativity",
    label: "High Creativity",
    style: "Exploratory, analogy-heavy",
    length: "long",
    desc: "Longer, more exploratory, uses analogies and softer structure."
  },
  {
    id: "low_creativity",
    label: "Low Creativity",
    style: "Structured, literal",
    length: "long",
    desc: "Highly structured, list-heavy, focused on clarity and control."
  },
  {
    id: "short_answer",
    label: "Short Answer",
    style: "Compressed summary",
    length: "short",
    desc: "Compressed summary optimized for short, high-signal answers."
  }
];

const promptInput = document.getElementById("prompt-input");
const promptStatus = document.getElementById("prompt-status");
const generateButton = document.getElementById("generate-button");
const countButtons = document.querySelectorAll(".variation-count-btn");
const summaryEl = document.getElementById("summary");
const comparisonNotesEl = document.getElementById("comparison-notes-text");

const promptPresetButtons = document.querySelectorAll(".btn-prompt-preset");

const responseEls = [
  document.getElementById("response-0"),
  document.getElementById("response-1"),
  document.getElementById("response-2"),
  document.getElementById("response-3")
];

const metaEls = [
  document.getElementById("meta-0"),
  document.getElementById("meta-1"),
  document.getElementById("meta-2"),
  document.getElementById("meta-3")
];

const presetLabelEls = [
  document.getElementById("preset-label-0"),
  document.getElementById("preset-label-1"),
  document.getElementById("preset-label-2"),
  document.getElementById("preset-label-3")
];

const cardEls = document.querySelectorAll(".variation-card");

// Default variation count
let variationCount = 2;

// Prompt presets for quick testing
const PROMPT_PRESETS = {
  explain:
    "Explain vector embeddings as if I’m new to machine learning.",
  summary:
    "Summarize this policy: users can request deletion of their account data at any time.",
  customer:
    "Respond to this customer complaint in a professional tone: “Your tool deleted a week of my work.”"
};

promptPresetButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-preset");
    const text = PROMPT_PRESETS[key] || "";
    promptInput.value = text;
    promptStatus.textContent = "Loaded example prompt.";
  });
});

// Handle variation count selection
countButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const count = parseInt(btn.getAttribute("data-count"), 10);
    variationCount = count;

    countButtons.forEach((b) =>
      b.classList.remove("variation-count-btn-active")
    );
    btn.classList.add("variation-count-btn-active");

    // Show/hide cards based on count
    cardEls.forEach((card, idx) => {
      if (idx < variationCount) {
        card.removeAttribute("data-hidden");
      } else {
        card.setAttribute("data-hidden", "true");
      }
    });

    summaryIdle(`Configured to show ${variationCount} variations.`);
  });
});

// Set initial labels/meta from presets
PRESETS.forEach((preset, idx) => {
  const labelEl = presetLabelEls[idx];
  const metaEl = metaEls[idx];
  if (!labelEl || !metaEl) return;
  labelEl.textContent = preset.label;
  metaEl.textContent = preset.desc;
});

// Summary helpers
function summaryIdle(text) {
  summaryEl.innerHTML = `
    <div class="summary-badge summary-badge-idle">
      ${text}
    </div>
  `;
}

function summaryOk(text) {
  summaryEl.innerHTML = `
    <div class="summary-badge summary-badge-ok">
      ${text}
    </div>
  `;
}

function summaryWarn(text) {
  summaryEl.innerHTML = `
    <div class="summary-badge summary-badge-warn">
      ${text}
    </div>
  `;
}

// Generate a simulated response for a given preset
function generateSimulatedResponse(prompt, preset, index) {
  const baseHash = simpleHash(prompt + preset.id + index);
  const focusWords = [
    "clarity",
    "stability",
    "trust",
    "predictability",
    "explainability",
    "safety"
  ];
  const styleIntros = {
    balanced: [
      "Here’s a balanced explanation that stays close to your original intent.",
      "This version aims for a middle ground between detail and brevity."
    ],
    high_creativity: [
      "Imagine you’re explaining this over coffee with a curious friend.",
      "Think of this as a story that wraps your idea in a simple metaphor."
    ],
    low_creativity: [
      "Here is a straightforward, structured explanation.",
      "Below is a literal, stepwise breakdown of the idea."
    ],
    short_answer: [
      "Here’s the short version.",
      "In one quick answer:"
    ]
  };

  const pickedIntro = pickFrom(
    styleIntros[preset.id] || styleIntros.balanced,
    baseHash
  );
  const focusWord = pickFrom(focusWords, baseHash + 7);

  const core = [
    `1. What this response is trying to do`,
    `- Restate your prompt in simpler language.`,
    `- Emphasize ${focusWord} so a non-expert can follow.`,
    `- Call out the most important trade-off or decision point.`
  ].join("\n");

  const structureSection = [
    "",
    `2. How this variation is styled`,
    `- Preset: ${preset.label}.`,
    preset.id === "high_creativity"
      ? "- Uses softer edges, analogies, and narrative framing."
      : preset.id === "low_creativity"
      ? "- Uses tighter structure, headings, and clear bullets."
      : preset.id === "short_answer"
      ? "- Compresses the idea into a minimal but complete summary."
      : "- Balances narrative and structure for a general audience."
  ].join("\n");

  const interviewSection = [
    "",
    "3. How you might use this in an interview",
    "- Point to this variation when explaining how prompt and style presets change tone.",
    "- Contrast it against other variations to show stability vs creativity.",
    "- Tie the differences back to user expectations in your product context."
  ].join("\n");

  let text = `${pickedIntro}\n\n${core}${structureSection}${interviewSection}`;

  if (preset.length === "short") {
    // Trim down
    text =
      pickedIntro +
      "\n\n" +
      "Key idea: This version compresses your prompt into a short, high-signal answer that emphasizes " +
      focusWord +
      " without going deep into detail.";
  } else if (preset.length === "medium") {
    // Slightly shorter
    const paragraphs = text.split("\n\n");
    text = paragraphs.slice(0, 3).join("\n\n");
  }

  return text;
}

// Generate comparison notes based on active presets
function generateComparisonNotes(activePresets) {
  if (!activePresets.length) {
    return "No variations generated yet. Once you generate responses, this section will help you explain how each preset behaves.";
  }

  const labels = activePresets.map((p) => p.label);
  const hasHighCreativity = activePresets.some(
    (p) => p.id === "high_creativity"
  );
  const hasLowCreativity = activePresets.some(
    (p) => p.id === "low_creativity"
  );
  const hasShort = activePresets.some((p) => p.id === "short_answer");
  const hasBalanced = activePresets.some((p) => p.id === "balanced");

  const notes = [];

  if (hasBalanced) {
    notes.push(
      "The balanced variation acts as a reference point — it’s useful for comparing how much other responses deviate in tone and length."
    );
  }

  if (hasHighCreativity && hasLowCreativity) {
    notes.push(
      "The High Creativity vs Low Creativity pair highlights the trade-off between expressive, analogy-heavy answers and tightly structured, literal explanations."
    );
  } else if (hasHighCreativity) {
    notes.push(
      "The High Creativity variation leans into narrative and analogy, which is great for teaching and ideation but can feel less predictable."
    );
  } else if (hasLowCreativity) {
    notes.push(
      "The Low Creativity variation leans into structure and explicit bullet points, which is ideal for documentation or support contexts."
    );
  }

  if (hasShort) {
    notes.push(
      "The Short Answer variation is deliberately compressed — it shows how you might tune the system for constrained interfaces like chat widgets or mobile surfaces."
    );
  }

  notes.push(
    `Together, these presets (${labels.join(
      ", "
    )}) give you a concrete way to talk about prompt sensitivity, stability, and style choices in an AI PM interview.`
  );

  return notes.join(" ");
}

// Main generate handler
generateButton.addEventListener("click", () => {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    promptStatus.textContent = "Please enter a prompt first.";
    summaryWarn("No prompt provided — nothing to compare yet.");
    return;
  }

  promptStatus.textContent = "";

  const activePresets = [];

  for (let i = 0; i < PRESETS.length; i++) {
    const card = cardEls[i];
    const respEl = responseEls[i];
    const preset = PRESETS[i];

    if (i < variationCount) {
      card.removeAttribute("data-hidden");
      const text = generateSimulatedResponse(prompt, preset, i);
      respEl.textContent = text;
      activePresets.push(preset);
    } else {
      card.setAttribute("data-hidden", "true");
      respEl.textContent = "Waiting for generation.";
    }
  }

  const notes = generateComparisonNotes(activePresets);
  comparisonNotesEl.textContent = notes;

  summaryOk(
    `Generated ${variationCount} variations for this prompt. Use the differences to explain model behavior and prompt sensitivity.`
  );
});

// Initial idle summary
summaryIdle("No variations generated yet. Configure the count and add a prompt to begin.");
