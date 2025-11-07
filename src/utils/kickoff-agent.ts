import { spawn } from 'child_process';
import chalk from 'chalk';
import type { ProjectConfig } from '../types.js';

export const kickoffCodingAgent = async (
  projectPath: string,
  config: ProjectConfig
): Promise<void> => {
  console.log(chalk.bold.cyan('\n🤖 Starting your coding assistant...\n'));

  const initialInstructions = buildInitialInstructions(config);
  const fullPrompt = `${initialInstructions}\n\nProject Goal: ${config.projectGoal}`;

  console.log(chalk.gray('Initial prompt:'));
  console.log(chalk.white(`"${fullPrompt}"\n`));

  if (config.codingAssistant === 'claude-code') {
    console.log(chalk.yellow('To start Claude Code with this prompt, run:\n'));
    console.log(chalk.cyan(`  cd ${projectPath}`));
    console.log(chalk.cyan(`  claude "${fullPrompt}"`));
    console.log();
    console.log(chalk.gray('Or, if you prefer to start Claude Code manually:'));
    console.log(chalk.cyan(`  cd ${projectPath}`));
    console.log(chalk.cyan(`  claude`));
    console.log();
    console.log(chalk.bold.green('Happy coding! 🚀\n'));
  }
};

const buildInitialInstructions = (config: ProjectConfig): string => {
  return `You are an expert AI agent developer. This project has been set up with LangWatch best practices.

First steps:
1. Read and understand the AGENTS.md file - it contains all the guidelines for this project
2. Update the AGENTS.md with specific details about what this project does
3. Create a comprehensive README.md explaining the project, setup, and usage
4. Set up the ${config.language === 'python' ? 'Python' : 'TypeScript'} environment (requirements.txt or package.json)
${config.framework === 'mastra' ? '5. Use the Mastra MCP to learn about Mastra and how to build agents' : '5. Review the .cursorrules and llms.txt files for Agno best practices'}
6. Use the LangWatch MCP to learn about prompt management and testing
7. Start implementing the core agent functionality

Remember:
- ALWAYS use LangWatch Prompt CLI for prompts (ask the MCP how)
- ALWAYS write Scenario tests for new features (ask the MCP how)
- Follow the Agent Testing Pyramid methodology
- Test everything before considering it done`;
};

