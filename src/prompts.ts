import { select, input, password } from '@inquirer/prompts';
import chalk from 'chalk';
import type { ProjectConfig, ProgrammingLanguage, AgentFramework, CodingAssistant, LLMProvider } from './types.js';

export const collectProjectConfig = async (): Promise<ProjectConfig> => {
  console.log(chalk.bold.cyan('\n🚀 Welcome to Superagents by LangWatch!\n'));
  console.log(chalk.gray('Let\'s set up your production-ready agent project.\n'));

  // Programming Language
  const language = await select<ProgrammingLanguage>({
    message: 'What programming language do you want to use?',
    choices: [
      { name: 'Python', value: 'python' },
      { name: 'TypeScript', value: 'typescript' },
    ],
  });

  // Agent Framework
  const frameworkChoices = language === 'python'
    ? [{ name: 'Agno', value: 'agno' as const }]
    : [{ name: 'Mastra', value: 'mastra' as const }];

  const framework = await select<AgentFramework>({
    message: 'What agent framework do you want to use?',
    choices: frameworkChoices,
  });

  // Coding Assistant
  const codingAssistant = await select<CodingAssistant>({
    message: 'What coding assistant do you want to use?',
    choices: [
      { name: 'Claude Code', value: 'claude-code' },
    ],
  });

  // LLM Provider
  const llmProvider = await select<LLMProvider>({
    message: 'What LLM provider do you want to use?',
    choices: [
      { name: 'OpenAI', value: 'openai' },
    ],
  });

  // OpenAI API Key
  const openaiApiKey = await password({
    message: 'Enter your OpenAI API key:',
    mask: '*',
    validate: (value: string) => {
      if (!value || value.trim().length === 0) {
        return 'API key is required';
      }
      if (!value.startsWith('sk-')) {
        return 'OpenAI API key should start with "sk-"';
      }
      return true;
    },
  });

  // LangWatch API Key
  console.log(chalk.gray('\nTo get your LangWatch API key, visit:'));
  console.log(chalk.blue.underline('https://app.langwatch.ai/authorize\n'));

  const langwatchApiKey = await password({
    message: 'Enter your LangWatch API key:',
    mask: '*',
    validate: (value: string) => {
      if (!value || value.trim().length === 0) {
        return 'LangWatch API key is required';
      }
      if (!value.startsWith('sk-lw-')) {
        return 'LangWatch API key should start with "sk-lw-"';
      }
      return true;
    },
  });

  // Project Goal
  const projectGoal = await input({
    message: 'What do you want to build?',
    validate: (value: string) => {
      if (!value || value.trim().length === 0) {
        return 'Please describe what you want to build';
      }
      return true;
    },
  });

  return {
    language,
    framework,
    codingAssistant,
    llmProvider,
    openaiApiKey,
    langwatchApiKey,
    projectGoal,
  };
};

