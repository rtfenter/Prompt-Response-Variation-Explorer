# Prompt–Response Variation Explorer  
[![Live Demo](https://img.shields.io/badge/Live%20Demo-000?style=for-the-badge)](https://rtfenter.github.io/Prompt-Response-Variation-Explorer/)

### A small interactive tool for comparing how a single prompt produces multiple outputs under different model settings.

This project is part of my **AI & ML UX Systems Series**, a recruiter-friendly set of prototypes that demonstrate clear AI reasoning, model behavior intuition, and practical product thinking for AI PM roles.

The goal of this explorer is to show how one prompt can yield different responses when parameters such as temperature, length, and sampling behavior change — a core concept in evaluating model stability, sensitivity, and predictability.

---

## Purpose

AI PM interviews frequently ask candidates to explain why the **same prompt** can produce **different outputs**:

- “Why would a model answer this way here but differently there?”  
- “How do you test prompt sensitivity?”  
- “How do you compare stability vs creativity?”  

This explorer makes those questions easy to show and explain:

- Enter one prompt  
- Choose how many variations to generate  
- Adjust parameter presets  
- Compare outputs side-by-side  

It turns abstract model evaluation into a clean, legible UX artifact.

---

## Features (MVP)

This prototype includes:

- **Single prompt input**  
- **Variation count selector (2–6)**  
- **Parameter presets**:  
  - High Creativity  
  - Low Creativity  
  - Balanced  
  - Short Answer  
  - Long Answer  
- **Side-by-side comparison panels**  
- **Difference highlights (length, tone, structure, creativity)**  
- **Mini-parameter summary for each variation**

This explorer focuses on clarity, not infrastructure.

---

## Demo Screenshot

<img width="2806" height="2868" alt="Screenshot 2025-11-28 at 15-18-40 Prompt–Response Variation Explorer" src="https://github.com/user-attachments/assets/9dd90cee-668d-4195-98c2-474cb69065c6" />



---

## Prompt Variation Flow Diagram

```
A simple illustration of how one prompt branches into multiple outputs:

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
```

---

## Why Prompt Variation Matters

Variation reveals how models behave under different conditions:

- temperature changes  
- sampling methods  
- safety constraints  
- context sensitivity  
- prompt phrasing  

AI PMs must understand when variation is:

**Good**  
- creativity  
- ideation  
- brainstorming  
- multi-style generation  

**Bad**  
- inconsistency  
- unstable tone  
- poor instruction following  
- safety drift  

This explorer visualizes these dynamics clearly.

---

## How This Maps to Real Product Work

### Prompt Stability  
Crucial for support, compliance, and enterprise systems.

### Prompt Flexibility  
Important for creative or generative tools.

### User Trust  
Users lose trust when identical questions get inconsistent answers.

### Governance & Safety  
Understanding variation helps enforce predictable behavior.

This prototype ties model behavior directly into UX implications — a core AI PM competency.

---

## Part of the AI & ML UX Systems Series

Main repo:  
https://github.com/rtfenter/AI-ML-UX-Systems-Series


---

## Status

MVP is implemented and active.  
Runs entirely client-side — no backend needed.

---
## Local Use

1. Clone the repo  
2. Open `index.html` in your browser  

Everything runs client-side.
