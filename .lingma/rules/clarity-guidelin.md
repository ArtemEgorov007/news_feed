---
trigger: always_on
tags: [ clarity, simplicity, reasoning, mcp, productivity ]
description: |
  Use sequential thinking — one clear step at a time.
  Prefer simplicity over abstraction: avoid inheritance, reflection or complex patterns that obscure logic.
  Prioritise clarity and readability — write code that any beginner can understand at a glance.
  **ALWAYS use MCP tools when applicable:**
  - Use Context7 MCP to study documentation and libraries before using them.
  - Use Playwright MCP as a browser-opening tool to study and familiarize yourself with projects.
  - Use Sequential Thinking MCP for complex problem-solving and architectural decisions.
  - Use Filesystem MCP for codebase navigation, refactoring, and file operations.
  - Use GitHub MCP for version control, PR reviews, issue tracking, and collaborative workflows.
  - Use OpenMemory to persist context across sessions and maintain project knowledge.
  Before integrating external tools or drivers, study their official documentation through Context7 MCP.
  If you are unsure, extend or refine the existing front-end logic, rather than rewriting it from scratch.
---

# Clarity Guide — Genius Helper Standard

## **Basic Principles**

* **Sequential-thinking MCP:** Approach problem solving step by step using the Sequential Thinking MCP tool. Break down complex problems into discrete, analyzable steps. No simplifications — every line should make sense on its own.
* **Context7 MCP as primary research tool:** Before using ANY library, framework, or external dependency, **MUST** use Context7 MCP to study official documentation. This ensures accurate, up-to-date implementation patterns.
* **Playwright MCP for project exploration:** Use Playwright MCP to open and interact with running applications. This provides real-world context for architectural decisions and refactoring.
* **Filesystem MCP for codebase operations:** Navigate, read, write, and refactor files efficiently. Essential for large-scale refactoring and architectural changes.
* **GitHub MCP for collaboration and version control:** Manage repositories, analyze commit history, review PRs, track issues, manage branches, and integrate CI/CD workflows.
* **OpenMemory for context persistence:** Store architectural decisions, project-specific patterns, and learning insights across sessions. OpenMemory creates a persistent knowledge graph of your project.
* **MCP-first workflow:** When facing uncertainty:
    1. Use Sequential Thinking MCP to break down the problem
    2. Use Context7 MCP to research solutions and patterns
    3. Use Filesystem MCP to explore existing code structure
    4. Use GitHub MCP to understand code history and manage workflow
    5. Use Playwright MCP to verify behavior in the actual application
    6. Use OpenMemory to document decisions and patterns
* **Simplicity above all else:** Elegant code is simple code, not clever code. Avoid magic, hidden states, or abstract inheritance.
* **Readability as a feature:** Code is written once but read hundreds times. Optimize it for human comprehension.
* **Evolution, not revolution:** Build on what already exists. Refine and improve; don't reinvent the wheel unless absolutely necessary.

---

## **MCP Tool Integration Requirements**

### **When to use Context7 MCP:**
- Before implementing any third-party library or framework
- When encountering unfamiliar APIs or design patterns
- Before making architectural decisions about integrations
- When debugging library-specific issues
- **Mandatory for:** React ecosystem tools, state management libraries, form libraries, API clients, testing frameworks
- **Query examples:**
    - "React Query best practices for data fetching"
    - "Zustand vs Redux Toolkit comparison"
    - "Next.js App Router migration guide"

### **When to use Sequential Thinking MCP:**
- Complex architectural decisions (state management strategy, component structure)
- Performance optimization analysis
- Refactoring large components or modules
- Debugging multi-layered issues
- Code review and pattern analysis
- **Use for:** Breaking down epic features, analyzing technical debt, planning migrations

### **When to use Playwright MCP:**
- Understanding existing project structure and user flows
- Verifying UI behavior before refactoring
- Testing accessibility features in real browsers
- Debugging layout and styling issues
- Capturing visual regression baseline
- **Use for:** E2E testing, screenshot comparisons, performance profiling

### **When to use Filesystem MCP:**
- **Navigation:** Exploring project structure, finding components/utilities
- **Reading:** Analyzing existing code before refactoring
- **Writing:** Creating new components, utilities, tests
- **Refactoring:** Renaming files, moving components, restructuring folders
- **Batch operations:** Updating imports across multiple files, applying code mods
- **Code search:** Finding all usages of a function/component
- **Use cases:**
    - "Find all components using deprecated API X"
    - "Restructure feature modules into domain-driven folders"
    - "Update all imports after moving shared utilities"
    - "Create component boilerplate with tests and styles"

### **When to use GitHub MCP:**
- **Repository management:** Clone, fork, create repositories
- **History analysis:** Understanding why code was written a certain way (git blame, commit history)
- **Commit operations:** Creating atomic, semantic commits with clear messages
- **Branch management:** Creating feature branches, managing hotfixes, merging
- **PR reviews:** Analyzing changes, leaving contextual comments, approving/requesting changes
- **Issue tracking:** Creating detailed bug reports with reproduction steps, managing labels
- **Project management:** Updating project boards, linking PRs to issues, milestones
- **CI/CD monitoring:** Checking build status, deployment pipelines, action workflows
- **Conflict resolution:** Understanding merge conflicts in context
- **Code archaeology:** Tracking feature evolution over time
- **Use cases:**
    - "Show me the commit that introduced this performance regression"
    - "Create a branch for feature X following git-flow"
    - "Review PR #123 for security vulnerabilities and performance issues"
    - "Create issue for missing TypeScript types in API layer"
    - "Generate changelog from commits between v1.0 and v2.0"
    - "Who changed this authentication logic and why?"
    - "Check if CI passed for the latest commit"
    - "Link this PR to epic issue #45"

### **When to use OpenMemory:**
- **Architecture decisions:** Store ADRs (Architecture Decision Records) in persistent knowledge graph
- **Project patterns:** Document team-specific conventions and standards that persist across sessions
- **Learning insights:** Save solutions to complex problems for future reference and retrieval
- **Onboarding knowledge:** Maintain searchable context for new team members
- **Tech debt tracking:** Keep a living, queryable document of known issues and workarounds
- **Cross-session continuity:** Retrieve decisions and patterns from previous sessions automatically
- **Knowledge graph benefits:** OpenMemory creates relationships between concepts, making retrieval contextual and intelligent
- **Use cases:**
    - "Remember: We use Zustand for global state, React Query for server state"
    - "Store: Custom hook pattern for form validation in this project"
    - "Recall: Why we chose Playwright over Cypress (decision from Q2 2024)"
    - "Document: Performance optimization strategies used in Dashboard component"
    - "What patterns did we establish for error handling in API calls?"
    - "Retrieve all architectural decisions related to authentication"
    - "What coding standards have we agreed upon for React components?"

---

## **Productivity Workflows with MCPs**

### **Feature Development Workflow:**
