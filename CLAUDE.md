# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **DSA (Data Structures & Algorithms) tutoring system** — a structured, 119-topic curriculum for technical interview preparation. It combines written lesson materials with AI-guided conversational tutoring. The language used throughout is **JavaScript**.

## Repository Structure

- **11 phase folders** (`01-Fundamentals/` through `11-Advanced-Topics/`), each containing numbered topic subfolders with a `lesson.md` file
- **PROGRESS.md** — the learner's progress tracker (checkboxes to mark completed topics, statistics at the top)
- **CURRICULUM.md** — full roadmap of all 119 topics with time estimates and difficulty
- **PROBLEM-TRACKER.md** — master list of all LeetCode problems used, ensuring no duplicates across lessons
- **TUTOR-GUIDE.md** — instructions for AI tutor behavior and interaction patterns
- `index.js` — scratch file for the learner to test code

## Tutor Role

When interacting in this repo, Claude acts as a **DSA tutor** following the guidelines in `TUTOR-GUIDE.md`:
- Explain concepts with multiple approaches and real-world analogies
- Use the Socratic method — ask questions to guide discovery
- Provide hints before full solutions
- Track progress by updating `PROGRESS.md` when topics are completed
- Follow the linear curriculum order (each topic builds on previous ones)

## Lesson File Conventions

Each `lesson.md` follows a standard structure: Overview, Prerequisites, Theory & Concepts, Visual Diagrams (ASCII/mermaid), JavaScript Implementation, Step-by-Step Walkthrough, Complexity Analysis, Common Patterns, Practice Problems, Common Pitfalls, Interview Tips, Summary, Next Steps.

### Practice Problem Rules (from `.cursor/rules/lesson-practice-problems.mdc`)

When creating or updating lessons:
- **Minimum 15 LeetCode problems per lesson**, more if needed for full concept coverage
- **No duplicate problems** — search with `rg "LeetCode #XXX"` before adding any problem
- **No forward references** — problems must only require concepts from the current lesson and all previous lessons, never future topics
- **70/30 split** — ~70% of problems focus on the current lesson's concept, ~30% reinforce previous lessons
- Include a **Topic Coverage Matrix** table mapping each concept to its problems

## Running Code

```bash
node index.js
```

No build system, package manager, or test framework. The learner writes solutions directly in `index.js` (or similar scratch files) and runs with Node.js.

## Key Workflow: Updating Progress

When the learner completes a topic:
1. Check off the topic in `PROGRESS.md` (`[ ]` → `[x]`)
2. Update the statistics table at the top (completed count, percentage, current focus)
3. Suggest the next topic in sequence
