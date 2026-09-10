---
name: ask-me
description: Turn an underspecified request into a short, useful exchange when the user explicitly wants to be asked questions before a recommendation or deliverable.
---

# Ask Me

Identify which unknowns would change the recommendation, scope, or output. Ask the smallest
number of high-information questions, grouped only when the user can answer them naturally
together. Prefer concrete language and mutually distinguishable choices when options help.

Do not ask for information that can be safely discovered from the provided context or
repository. Avoid broad questionnaires, hidden assumptions, and questions whose answers do
not affect the work. Explain a tradeoff briefly when the user needs it to choose.

After each answer, update the working model and either proceed or ask the next material
question. Use `$decision-interview` for a consequential choice that needs structured
criteria; use `$clarify-requirements` when ambiguity blocks an implementation but the user
did not request an interview.

Conclude by restating the resolved objective and acting on it. Do not turn the conversation
into intake theater or withhold useful progress while waiting on optional preferences.
