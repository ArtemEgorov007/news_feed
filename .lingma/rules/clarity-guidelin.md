---
trigger: always_on
tags: [ clarity, simplicity, reasoning, mcp ]
description: |
  Use sequential thinking — one clear step at a time.
  Prefer simplicity over abstraction: avoid inheritance, reflection or complex patterns that obscure logic.
  Prioritise clarity and readability — write code that any beginner can understand at a glance.
  **ALWAYS use MCP tools when applicable:**
  - Use Context7 MCP to study documentation and libraries before using them.
  - Use Playwright MCP as a browser-opening tool to study and familiarize yourself with projects.
  - Use Sequential Thinking MCP for complex problem-solving and architectural decisions.
  Before integrating external tools or drivers, study their official documentation through Context7 MCP.
  If you are unsure, extend or refine the existing front-end logic, rather than rewriting it from scratch.
---

# Clarity Guide — Genius Helper Standard

## **Basic Principles**

* **Sequential-thinking MCP:** Approach problem solving step by step using the Sequential Thinking MCP tool. Break down
  complex problems into discrete, analyzable steps. No simplifications — every line should make sense on its own.
* **Context7 MCP as primary research tool:** Before using ANY library, framework, or external dependency, **MUST** use
  Context7 MCP to study official documentation. This ensures accurate, up-to-date implementation patterns.
* **Playwright MCP for project exploration:** Use Playwright MCP to open and interact with running applications. This
  provides real-world context for architectural decisions and refactoring.
* **MCP-first workflow:** When facing uncertainty:
    1. Use Sequential Thinking MCP to break down the problem
    2. Use Context7 MCP to research solutions and patterns
    3. Use Playwright MCP to verify behavior in the actual application
* **Simplicity above all else:** Elegant code is simple code, not clever code. Avoid magic, hidden states, or abstract
  inheritance.
* **Readability as a feature:** Code is written once but read hundreds times. Optimize it for human comprehension.
* **Evolution, not revolution:** Build on what already exists. Refine and improve; don't reinvent the wheel unless
  absolutely necessary.

## **MCP Tool Integration Requirements**

### **When to use Context7 MCP:**

- Before implementing any third-party library or framework
- When encountering unfamiliar APIs or design patterns
- Before making architectural decisions about integrations
- When debugging library-specific issues
- **Mandatory for:** React/Vue ecosystem tools, state management libraries, form libraries, API clients, testing
  frameworks

### **When to use Sequential Thinking MCP:**

- Complex architectural decisions (state management strategy, component structure)
- Performance optimization analysis
- Refactoring large components or modules
- Debugging multi-layered issues
- Code review and pattern analysis

### **When to use Playwright MCP:**

- Understanding existing project structure and user flows
- Verifying UI behavior before refactoring
- Testing accessibility features in real browsers
- Debugging layout and styling issues
- Capturing visual regression baseline

## **SCSS Guidelines**

- Nesting depth ≤ 2 levels.
- Semantic classes (`.card__title`, not `.text-blue`).
- Use mixins and variables to ensure consistency.
- No `!important` — prioritize structure and hierarchy.
- Animations and transitions should be smooth and performant (GPU-friendly: `transform`, `opacity`).
- Use CSS custom properties for theming and dynamic values.

## **JS/TS Guidelines**

- Use pure functions and explicit returns.
- Avoid hidden side effects; mutations should be obvious.
- Check inputs and state before performing actions.
- Prefer `const` and `readonly` over mutable state.
- Add comments for non-trivial logic:
    - *"Non-trivial logic"* is any logic that:
        - Includes conditional branches with multiple levels of nesting (>2 levels)
        - Uses non-standard algorithms or workarounds
        - Affects global state or the behavior of other components
        - Implements performance optimizations (memoization, virtualization, debouncing)
        - Contains complex business rules or domain logic
    - Example: custom sorting, rendering optimization, asynchronous threads with cancellation
- Each function should perform *only one task* (Single Responsibility Principle).
- Type everything explicitly in TypeScript — avoid `any` unless absolutely necessary.

## **Error Handling Principles**

- All functions should have an explicit error handling strategy.
- Use `try/catch` for asynchronous operations.
- Don't suppress errors — log them with context (include function name, input values, timestamp).
- Prefer centralized handling patterns (`handleError(error, context)`).
- In the UI, display clear messages, avoiding technical jargon.
- Use error boundaries in React for component-level error isolation.
- **Before implementing error handling:** Use Context7 MCP to research best practices for the specific
  library/framework.

## **Testing Considerations**

- Each component should have unit test coverage for key logic (aim for >80% coverage on business logic).
- Use Playwright MCP for end-to-end scenarios and user flow validation.
- Write tests before refactoring — they should confirm behavior (regression safety).
- Test edge cases, especially for validation, errors, and boundary conditions.
- Use Testing Library principles: test behavior, not implementation details.
- **Before writing tests:** Use Context7 MCP to verify current testing patterns in React Testing Library / Vitest /
  Jest.

## **Accessibility Standards (a11y)**

- All interactive elements should be accessible from the keyboard (`Tab`, `Enter`, `Space`).
- Use `aria-*` attributes to describe behavior (but prefer semantic HTML first).
- Text contrast must comply with WCAG AA (minimum 4.5:1 for normal text).
- Do not rely solely on color to convey information (use icons, labels, patterns).
- Check components using Lighthouse and axe-core.
- Test with screen readers (NVDA, JAWS, VoiceOver).
- **Before implementing a11y features:** Use Context7 MCP to research ARIA patterns and WCAG guidelines.

## **Performance Standards**

- Measure before optimizing — use Chrome DevTools, Lighthouse, and Web Vitals.
- Target metrics:
    - LCP (Largest Contentful Paint) < 2.5s
    - FID (First Input Delay) < 100ms
    - CLS (Cumulative Layout Shift) < 0.1
- Use React.memo, useMemo, useCallback strategically — not everywhere.
- Lazy load components and routes where appropriate.
- Optimize images (WebP, responsive images, lazy loading).
- **Before implementing performance optimizations:** Use Sequential Thinking MCP to analyze bottlenecks and Context7 MCP
  to research optimization patterns.

## **Architecture Principles**

- Follow SOLID principles, especially Single Responsibility and Dependency Inversion.
- Prefer composition over inheritance.
- Keep components small (<250 lines) and focused.
- Separate business logic from presentation (custom hooks, services, utilities).
- Use feature-based folder structure for scalability.
- Document architectural decisions (ADRs) for major changes.
- **Before making architectural changes:** Use Sequential Thinking MCP to evaluate trade-offs and Context7 MCP to
  research industry patterns.
