# Prompt–Response Variation Explorer  
[![Live Demo](https://img.shields.io/badge/Live%20Demo-000?style=for-the-badge)](https://rtfenter.github.io/Prompt-Response-Variation-Explorer/)

### A small interactive tool for comparing how a single prompt produces multiple outputs under different model settings.

This project is part of my **AI & ML UX Systems Series**, a recruiter-friendly set of prototypes that demonstrate clear AI reasoning, model behavior intuition, and practical product thinking for AI PM roles.

The goal of this explorer is to show how a single prompt can yield different responses when parameters such as temperature, length, and sampling behavior change — a core concept in evaluating model stability, sensitivity, and predictability.

---

## Purpose

AI PM interviews frequently ask candidates to explain why the **same prompt** can produce **different outputs**:

- “Why would a model answer this way here but differently there?”  
- “How do you test prompt sensitivity?”  
- “How do you compare stability vs creativity?”  

This explorer makes those questions simple to demonstrate:

- You enter one prompt.  
- You choose how many variations to generate.  
- You adjust parameter sets.  
- You visually compare how each variation differs in tone, structure, and detail.

This turns abstract model evaluation into a clear, legible UX artifact.

---

## Features (MVP)

- **Single prompt input**  
  A single user/system prompt that all variations are based on.

- **Variation count selector**  
  Choose 2–6 side-by-side responses.

- **Parameter presets**  
  Quick options like:
  - “High Creativity”
  - “Low Creativity”
  - “Balanced”
  - “Short Answer”
  - “Long Answer”

- **Side-by-side comparison layout**  
  Each variation appears in a distinct panel with:
  - response text  
  - mini parameter summary  
  - visual difference cues  

- **Difference highlights**  
  Simple heuristics to mark differences in:
  - length  
  - sentiment  
  - structure  
  - creativity vs stability  

This explorer is intentionally minimal — a clean visualization of how sensitive models are to prompt and parameter changes.

---

## Example Prompts

Useful prompts for generating meaningful variation:

1. “Explain vector embeddings as if I’m new to machine learning.”  
2. “Write a concise summary of this policy: users can request data deletion at any time.”  
3. “Draft a short message apologizing to a customer in a professional tone.”  
4. “Give me three ideas for onboarding improvements for a SaaS platform.”  
5. “Describe the difference between RAG and fine-tuning in one paragraph.”

These produce noticeable changes under different parameter sets.

---

## Variation Flow Diagram

Illustrating how one prompt branches into multiple outputs:

    [Single Prompt]
           |
           +----------------------+
           |        |       |     |
           v        v       v     v
    Params A   Params B   Params C   Params D
           |        |       |     |
           v        v       v     v
   Response 1  Response 2 Response 3 Response 4
           \__________ Compare __________/
                 Highlight differences

---

## Why Prompt Variation Matters

Variation is directly tied to:

- **model temperature & sampling settings**  
- **context window differences**  
- **prompt clarity and structure**  
- **model instability or sensitivity**  
- **safety policy interactions**  
- **UX predictability**  

AI PMs must be able to diagnose:

- when variation is good (creativity, ideation)  
- when variation is harmful (inconsistent instructions, changing tone)  
- how to design UX affordances to contain or expose variation intentionally  

This explorer demonstrates that understanding visually and interactively.

---

## How This Maps to Real Product Work

### Prompt Stability  
Consistent answers are crucial for support, policy, and enterprise settings.

### Prompt Flexibility  
Variation is desirable in creative, brainstorming, or generative UX flows.

### User Trust  
Users lose trust when the same question yields wildly different answers without explanation.

### Governance  
Understanding variation helps design controls for safety, moderation, and alignment.

This tool surfaces all of these considerations clearly.

---

## Part of the AI & ML UX Systems Series

Main repo:  
https://github.com/rtfenter/AI-ML-UX-Systems-Series

Other prototypes in the series:

- Minimal RAG Query Explorer  
- Chat Model Behavior Sandbox  
- **Prompt–Response Variation Explorer** ← this repo  
- Model Explainer Playground (XAI Lite)  
- Embeddings Visual Map (Mini Version)

---

## Status

MVP is implemented and active.  
Client-side only — no backend required.

---

## Local Use

1. Clone the repo  
2. Open `index.html` in your browser  

Everything runs client-side.
