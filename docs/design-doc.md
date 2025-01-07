# Design Document: Admin Web Dashboard

## 1. Overview

We need to build an **admin web dashboard** that provides a single interface for managing and visualizing data aggregated from various sources. This document compares three architectural options:

1. **Vue SPA + Node Backend**
2. **Vue SPA + Go Backend**
3. **Nuxt** (with optional SSR or SPA mode)

Our goal is to identify the best approach considering maintainability, developer experience, performance, and overall complexity.

---

## 2. Requirements and Goals

- **Aggregated Data**: The backend will gather data from multiple sources or services.
- **Maintainability**: The solution should be straightforward to develop, deploy, and maintain over time.
- **Performance**: Requirements unclear for now, assuming moderate scale for now.
- **Developer Experience**: Generally a clear structure, minimal boilerplate, and an easy onboarding process for new developers can be beneficial.

---

## 3. Architecture Options

### 3.1 Vue SPA + Node Backend

**Front-End**: A traditional Vue Single Page Application (SPA).

- Client-side rendering only.
- Typically served as static assets (HTML, JS, CSS).

**Back-End**: Node.js server aggregating data from various sources.

- Commonly uses Express, Fastify, or similar frameworks.
- Single-language (JavaScript/TypeScript) across front-end and back-end.

**Pros**

- **Unified JS stack**: The same language for both front-end and server.
- **Large ecosystem**: Node has a vast package ecosystem.
- **Lower complexity**: No SSR overhead; development is straightforward for pure SPA teams.

**Cons**

- **Performance vs. Go**: Under high concurrency, Node may not match Go’s performance.
- **Memory usage**: Tends to be higher compared to a compiled language.

**Best For**

- Primarily JavaScript-oriented teams.
- Moderate concurrency where Node’s performance is sufficient.

---

### 3.2 Vue SPA + Go Backend

**Front-End**: A standard Vue Single Page Application (SPA) using client-side rendering (no SSR by default).

**Back-End**: A Go server responsible for data aggregation and business logic.

- Deployed as a single compiled binary.
- Known for high concurrency and efficient resource usage.

**Pros**

- **Excellent Performance & Concurrency**  
   Go handles large numbers of connections efficiently, making it ideal for high-traffic scenarios.
- **Simple Deployment**  
   A single compiled binary drastically reduces deployment complexity.
- **Team Familiarity**  
   If the team has Go experience, this approach leverages existing skill sets and maintains a cleaner codebase on the back end.

**Cons**

- **Split Skill Sets**  
   The front end uses JavaScript/TypeScript, while the back end requires Go, potentially increasing onboarding time for new developers.
- **Additional Maintenance Overhead**  
   Running a separate Go service can introduce extra complexity for microservices, deployments, and versioning.
- **Less “Full-Stack” Synergy**  
   Without a unified JS/TS codebase, sharing types, libraries, or tools between front end and back end is more cumbersome.

**Best For**

- Projects where **performance and concurrency** requirements are significant.
- Teams already **proficient in Go** and prepared to manage a split-stack environment.

---

### 3.3 Nuxt

**Nuxt** is a framework on top of Vue supporting both Server-Side Rendering (SSR) and SPA modes.

- **Opinionated structure**: Built-in file layouts (`pages/`, `layouts/`, `middleware/`).
- **Flexible rendering**: Can choose SSR for faster initial loads or run purely as an SPA.

**Pros**

- **Monorepo-friendly**: Encourages a single, unified codebase for front-end logic and potential server routes.
- **Developer experience**: Reduced boilerplate with features like auto-generated routes, `asyncData`, `useFetch`.
- **Hybrid**: Use SSR where beneficial or stay in SPA mode if SSR overhead isn’t needed.

**Cons**

- **Added complexity if SSR is not utilized**: Admin dashboards often don’t need SEO.
- **Requires Node.js environment** for SSR deployments, which may not be as performant as Go for heavy concurrency.

**Best For**

- Teams wanting a **structured Vue framework** with the option of SSR for certain pages or functionalities.
- Projects that benefit from a single codebase (monorepo) to manage both front-end and basic server operations in one place.

---

## 4. Comparison Table

| Aspect             | **Vue SPA + Node**                | **Vue SPA + Go**                       | **Nuxt** (SSR or SPA)                       |
| ------------------ | --------------------------------- | -------------------------------------- | ------------------------------------------- |
| **Language**       | JavaScript/TypeScript (both)      | Go (back end) + JS/TS (front)          | JS/TS (front), Node-based SSR               |
| **Performance**    | Good for moderate loads           | Excellent for high concurrency         | Good; depends on Node vs. Go                |
| **Deployment**     | Node server + static SPA assets   | Single Go binary + SPA files           | Node runtime (SSR) or static SPA            |
| **Dev Experience** | Simple, all JS/TS                 | Split stack (Go + JS/TS)               | Opinionated structure, less boilerplate     |
| **Learning Curve** | Straightforward for JS devs       | Go required for backend                | Must learn Nuxt conventions                 |
| **SSR Benefits**   | Custom setup if needed            | Not built-in                           | Built-in SSR if desired                     |
| **Use Cases**      | All-JS team, moderate concurrency | High concurrency, performance-critical | Monorepo, structured approach, optional SSR |

---

## 5. Recommendation: **Use Nuxt** for a Monorepo

### Rationale

1. **Single Codebase**

   - Using Nuxt lets us keep the entire UI codebase and simple server logic in one place, promoting consistency and reducing friction.
   - It’s easier to manage environment variables, deployment configurations, and shared tooling when the back-end portion (e.g., minimal Node server or server routes) and the front end live together.

2. **Opinionated Structure**

   - Nuxt’s folder conventions and built-in data-fetching patterns (`asyncData`, `useFetch`) reduce boilerplate and provide clear guidelines for new developers.

3. **SSR Option (If Needed Later)**

   - Even if we don’t need SSR now (admin dashboards typically don’t), we can enable SSR for specific pages that might benefit from faster initial render, or we can remain entirely in SPA mode to simplify deployment.

4. **Developer Familiarity**

   - If the team is already using Vue, adopting Nuxt is straightforward and provides additional productivity features out of the box.
