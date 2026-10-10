// Steven's resume, as plain text. This is the *entire knowledge base* for the
// Week 1 chatbot. The API route pastes this into the system prompt so the model
// answers from real facts instead of making things up.

export const RESUME_TEXT = `
Steven T. Lee — Los Angeles, CA | SLEEpy@alum.mit.edu | linkedin.com/in/steven-lee-344a6825

SUMMARY
Software developer, 10 years. Builds production web and mobile apps in React, Next.js,
TypeScript, and Node.js. Covers the full spread: AWS/Terraform/Docker, automated testing,
and heavy use of MCP servers and AI dev tools to ship faster.

EXPERIENCE

NELSON — Toronto, Canada (Remote) | 2019 – Present | Software Developer
- Drove feature development from planning through production across remote teams for
  high-revenue SaaS applications.
- Migrated legacy React front-ends to Next.js using server-side rendering (SSR) and
  static site generation (SSG) to improve page performance.
- Integrated React and Node.js front-ends with Go backend services via REST APIs and gRPC.
- Used MCP (Model Context Protocol) servers extensively, including Figma MCP to analyze
  design files and convert SVGs into production-ready components incorporated directly
  into the codebase.
- Optimized front-end build pipelines using Webpack, applying code-splitting and asset
  compression to reduce initial page load times.
- Configured Dockerized web hosting and server-side routing with custom API proxy rules
  to manage CORS security, SSL termination, and request forwarding.
- Built accessible, responsive UI components using React and modular CSS compliant with
  USWDS patterns and WCAG 2.1 standards.
- Built and maintained CI/CD pipelines using GitLab CI, Terraform, and Octopus Deploy
  for automated production deployments.
- Wrote automated unit and E2E test suites using Jest and Playwright to maintain code
  quality and prevent regression issues.
- Engineered SQL queries and database indexes to resolve performance bottlenecks on
  high-frequency tables.
- Managed production incident response and root-cause analysis, deploying hotfixes to
  maintain uptime across core platform services.
- Integrated AI developer tools (Cursor, Claude Code) into team workflows to accelerate
  unit test creation and feature prototyping.

CITRUSBITS — Los Angeles, CA | 2016 – 2019 | Web & Mobile Developer
- Developed web applications for startup and enterprise clients, building user-facing
  systems scaled to over 10 million monthly active users.
- Built Single Page Applications (SPAs) using React, Redux, and TypeScript, designing
  and consuming RESTful backend APIs.
- Reduced API payload sizes by 51%, cutting average response times by 73% and minimizing
  latency for low-bandwidth users through payload optimization and targeted CDN
  configuration.
- Implemented client-side protections against CSRF attacks and untrusted uploads while
  managing cross-origin resource sharing (CORS) rules.
- Maintained software quality using Jest testing frameworks, Git version control, and
  standard Agile sprint cycles.

EDUCATION
Massachusetts Institute of Technology — Cambridge, MA
B.S. in Materials Engineering

TECHNICAL SKILLS
Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL, Java, Python, Kotlin, Go
Front-End: React, Node.js, Redux, Next.js, Storybook, Tailwind, Material UI, USWDS, WCAG Accessibility
Build: Webpack, Babel, npm/yarn, code-splitting, static web hosting, reverse proxies & API routing
Backend: Microservices, REST APIs, Express.js, gRPC, Protobuf, SaaS, high-volume systems
Cloud & DevOps: AWS (Lambda, S3, API Gateway), Docker, Terraform, GitLab CI/CD, Linux
Data: PostgreSQL, MongoDB, Agile/Scrum, Git, Jest, Playwright
AI tooling: MCP (Model Context Protocol), Figma MCP, Cursor, Claude Code
`;
