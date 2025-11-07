export type ProgrammingLanguage = 'python' | 'typescript';
export type AgentFramework = 'agno' | 'mastra';
export type CodingAssistant = 'claude-code';
export type LLMProvider = 'openai';

export type ProjectConfig = {
  language: ProgrammingLanguage;
  framework: AgentFramework;
  codingAssistant: CodingAssistant;
  llmProvider: LLMProvider;
  openaiApiKey: string;
  langwatchApiKey: string;
  projectGoal: string;
};

