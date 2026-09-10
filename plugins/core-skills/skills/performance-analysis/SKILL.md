---
name: performance-analysis
description: Diagnose and improve performance when latency, throughput, memory, CPU, storage, or scaling behavior needs measurement-driven analysis.
---

# Performance Analysis

Define the workload, environment, baseline, and user-visible objective. Measure before
changing code. Use profiling, tracing, query plans, allocation data, and resource metrics
appropriate to the suspected bottleneck; avoid inferring a cause from a single aggregate
number.

Form a falsifiable hypothesis, change one meaningful variable, and compare under equivalent
conditions. Account for warm-up, caching, concurrency, variance, and measurement overhead.
Optimize the constrained resource or critical path rather than micro-benchmarking an
irrelevant function.

Use `$data-model` for query and index tradeoffs, `$improve-architecture` when the bottleneck
is a boundary or scaling design, and `$production-ready` for capacity limits and alerting.
Add a regression benchmark only when it is stable enough to maintain.

Report workload, method, before-and-after distributions, resource effects, tradeoffs, and
confidence limits. Preserve correctness and security; a faster result with weaker behavior
is not an improvement.
