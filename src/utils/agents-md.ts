import * as fs from 'fs/promises';
import * as path from 'path';
import type { ProjectConfig } from '../types.js';

export const generateAgentsMd = async (
  projectPath: string,
  config: ProjectConfig
): Promise<void> => {
  const content = buildAgentsMdContent(config);
  await fs.writeFile(
    path.join(projectPath, 'AGENTS.md'),
    content
  );
};

const buildAgentsMdContent = (config: ProjectConfig): string => {
  const { language, framework, projectGoal } = config;

  const srcDir = framework === 'mastra' ? 'src' : 'app';

  return `# Agent Development Guidelines

## Project Overview

**Goal:** ${projectGoal}

**Framework:** ${framework === 'agno' ? 'Agno' : 'Mastra'}
**Language:** ${language === 'python' ? 'Python' : 'TypeScript'}

This project follows LangWatch best practices for building production-ready AI agents.

---

## Core Principles

### 1. Agent Testing Pyramid

Follow the **Agent Testing Pyramid** methodology (https://scenario.langwatch.ai/best-practices/the-agent-testing-pyramid):

- **Unit Tests (Foundation)**: Test deterministic components (API connections, data transformations, memory storage)
- **Evals & Optimization (Middle Layer)**: Evaluate and optimize probabilistic components (RAG retrieval, LLM responses, prompt quality)
- **Simulations (Peak)**: End-to-end validation of multi-turn conversations and real-world scenarios

### 2. Test Every Feature

**CRITICAL**: Every new agent feature MUST be tested with Scenario tests before considering it complete.

- Write simulation tests for multi-turn conversations
- Validate edge cases
- Ensure business value is delivered
- Test different conversation paths

### 3. Prompt Management

**ALWAYS** use LangWatch Prompt CLI for managing prompts:

- Store all prompts in the \`prompts/\` directory as YAML files
- Use versioning for prompt iterations
- Never hardcode prompts in your application code
- Use the LangWatch MCP to learn about prompt management: ask it "How do I use the prompt CLI?"

Example prompt structure:
\`\`\`yaml
# prompts/my_prompt.yaml
model: gpt-4o
temperature: 0.7
messages:
  - role: system
    content: |
      Your system prompt here
  - role: user
    content: |
      {{ user_input }}
\`\`\`

### 4. Evaluation-Driven Development

Create evaluations in Jupyter notebooks under \`tests/evaluations/\`:

- Use LangWatch Evaluations API to measure component performance
- Evaluate RAG retrieval accuracy
- Assess LLM response quality
- Track improvements over iterations
- Consult LangWatch MCP for evaluation best practices

---

## Framework-Specific Guidelines

${getFrameworkGuidelines(config)}

---

## Project Structure

This project follows a standardized structure for production-ready agents:

\`\`\`
|__ ${srcDir}/           # Main application code
|__ prompts/          # Versioned prompt files (YAML)
|_____ *.yaml
|__ tests/
|_____ evaluations/   # Jupyter notebooks for component evaluation
|________ *.ipynb
|_____ scenarios/     # End-to-end scenario tests
|________ *.test.${language === 'python' ? 'py' : 'ts'}
|__ prompts.json      # Prompt registry
|__ .env              # Environment variables (never commit!)
\`\`\`

---

## Development Workflow

### When Starting a New Feature:

1. **Understand Requirements**: Clarify what the agent should do
2. **Design the Approach**: Plan which components you'll need
3. **Implement with Prompts**: Use LangWatch Prompt CLI to create/manage prompts
4. **Write Unit Tests**: Test deterministic components
5. **Create Evaluations**: Build evaluation notebooks for probabilistic components
6. **Write Scenario Tests**: Create end-to-end tests using Scenario
7. **Run Tests**: Verify everything works before moving on

### Always:

- ✅ Version control your prompts
- ✅ Write tests for new features
- ✅ Use LangWatch MCP to learn best practices
- ✅ Follow the Agent Testing Pyramid
- ✅ Document your agent's capabilities

### Never:

- ❌ Hardcode prompts in application code
- ❌ Skip testing new features
- ❌ Commit API keys or sensitive data
- ❌ Optimize without measuring (use evaluations first)

---

## Using LangWatch MCP

The LangWatch MCP server provides expert guidance on:

- Prompt management with Prompt CLI
- Writing Scenario tests
- Creating evaluations
- Best practices for agent development

**How to use it:**
Simply ask your coding assistant questions like:
- "How do I use the LangWatch Prompt CLI?"
- "Show me how to write a Scenario test"
- "How do I create an evaluation for my RAG system?"

The MCP will provide up-to-date documentation and examples.

---

## Getting Started

1. **Set up your environment**: Copy \`.env.example\` to \`.env\` and fill in your API keys
2. **Learn the tools**: Ask the LangWatch MCP about prompt management and testing
3. **Start building**: Implement your agent in the \`${srcDir}/\` directory
4. **Write tests**: Create scenario tests for your agent's capabilities
5. **Iterate**: Use evaluations to improve your agent's performance

---

## Resources

- **Scenario Documentation**: https://scenario.langwatch.ai/
- **Agent Testing Pyramid**: https://scenario.langwatch.ai/best-practices/the-agent-testing-pyramid
- **LangWatch Dashboard**: https://app.langwatch.ai/
${framework === 'agno' ? '- **Agno Documentation**: https://docs.agno.com/' : '- **Mastra Documentation**: Use the Mastra MCP for up-to-date docs'}

---

Remember: Building production-ready agents means combining great AI capabilities with solid software engineering practices. Follow these guidelines to create agents that are reliable, testable, and maintainable.
`;
};

const getFrameworkGuidelines = (config: ProjectConfig): string => {
  if (config.framework === 'agno') {
    return `### Agno Framework

**Always follow Agno best practices:**

- Refer to the \`.cursorrules\` file for Agno-specific coding standards
- Consult \`llms.txt\` for comprehensive Agno documentation
- Use Agno's agent building patterns and conventions
- Follow Agno's recommended project structure

**Key Agno Resources:**
- Documentation: https://docs.agno.com/
- GitHub: https://github.com/agno-agi/agno
- Local files: \`.cursorrules\` and \`llms.txt\`

**When implementing agent features:**
1. Review Agno documentation for best practices
2. Use Agno's built-in tools and utilities
3. Follow Agno's patterns for agent state management
4. Leverage Agno's testing utilities`;
  } else {
    return `### Mastra Framework

**Always use the Mastra MCP for learning:**

- The Mastra MCP server provides real-time documentation
- Ask it questions about Mastra APIs and best practices
- Follow Mastra's recommended patterns for agent development

**When implementing agent features:**
1. Consult the Mastra MCP: "How do I [do X] in Mastra?"
2. Use Mastra's built-in agent capabilities
3. Follow Mastra's TypeScript patterns and conventions
4. Leverage Mastra's integration ecosystem

**Example questions for Mastra MCP:**
- "How do I create an agent in Mastra?"
- "What's the best way to handle tools in Mastra?"
- "How do I manage agent state in Mastra?"`;
  }
};

