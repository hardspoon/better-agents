import * as fs from 'fs/promises';
import * as path from 'path';
import type { ProjectConfig } from '../types.js';

export const setupProjectStructure = async (
  projectPath: string,
  config: ProjectConfig
): Promise<void> => {
  // Determine the source directory name based on language/framework
  const srcDir = config.framework === 'mastra' ? 'src' : 'app';

  // Create directory structure
  const directories = [
    srcDir,
    'prompts',
    'tests',
    'tests/evaluations',
    'tests/scenarios',
  ];

  for (const dir of directories) {
    await fs.mkdir(path.join(projectPath, dir), { recursive: true });
  }

  // Create placeholder files
  await createPlaceholderFiles(projectPath, config, srcDir);
};

const createPlaceholderFiles = async (
  projectPath: string,
  config: ProjectConfig,
  srcDir: string
): Promise<void> => {
  // Create a sample prompt file
  const samplePromptYaml = `# Sample prompt for your agent
model: gpt-4o
temperature: 0.7
messages:
  - role: system
    content: |
      You are a helpful AI assistant.
`;

  await fs.writeFile(
    path.join(projectPath, 'prompts', 'sample_prompt.yaml'),
    samplePromptYaml
  );

  // Create prompts.json (initially empty)
  await fs.writeFile(
    path.join(projectPath, 'prompts.json'),
    JSON.stringify({ prompts: [] }, null, 2)
  );

  // Create a sample evaluation notebook
  const sampleEvalNotebook = {
    cells: [
      {
        cell_type: 'markdown',
        metadata: {},
        source: [
          '# Sample Evaluation\n',
          '\n',
          'This notebook demonstrates how to evaluate your agent using LangWatch.'
        ]
      },
      {
        cell_type: 'code',
        execution_count: null,
        metadata: {},
        outputs: [],
        source: [
          '# TODO: Add your evaluation code here using LangWatch Evaluations API\n',
          '# Refer to LangWatch MCP for documentation on how to use evaluations'
        ]
      }
    ],
    metadata: {
      kernelspec: {
        display_name: config.language === 'python' ? 'Python 3' : 'TypeScript',
        language: config.language,
        name: config.language === 'python' ? 'python3' : 'tslab'
      }
    },
    nbformat: 4,
    nbformat_minor: 4
  };

  await fs.writeFile(
    path.join(projectPath, 'tests', 'evaluations', 'example_eval.ipynb'),
    JSON.stringify(sampleEvalNotebook, null, 2)
  );

  // Create a sample scenario test
  const ext = config.language === 'python' ? 'py' : 'ts';
  const sampleScenarioContent = config.language === 'python'
    ? `"""
Sample scenario test for your agent.
Follow the Agent Testing Pyramid: use Scenario for end-to-end agentic tests.
"""

# TODO: Add your scenario tests here
# Refer to https://scenario.langwatch.ai/ for documentation
`
    : `/**
 * Sample scenario test for your agent.
 * Follow the Agent Testing Pyramid: use Scenario for end-to-end agentic tests.
 */

// TODO: Add your scenario tests here
// Refer to https://scenario.langwatch.ai/ for documentation
`;

  await fs.writeFile(
    path.join(projectPath, 'tests', 'scenarios', `example_scenario.test.${ext}`),
    sampleScenarioContent
  );

  // Create main app file
  const mainFileContent = config.language === 'python'
    ? `"""
Main entry point for your agent.
"""

def main():
    print("Welcome to your agent!")
    # TODO: Implement your agent logic here

if __name__ == "__main__":
    main()
`
    : `/**
 * Main entry point for your agent.
 */

const main = () => {
  console.log("Welcome to your agent!");
  // TODO: Implement your agent logic here
};

main();
`;

  const mainFileName = config.language === 'python' ? 'main.py' : 'index.ts';
  await fs.writeFile(
    path.join(projectPath, srcDir, mainFileName),
    mainFileContent
  );

  // Create .env.example
  const envExample = `# LLM Provider API Keys
OPENAI_API_KEY=your_openai_api_key_here

# LangWatch
LANGWATCH_API_KEY=your_langwatch_api_key_here
`;

  await fs.writeFile(
    path.join(projectPath, '.env.example'),
    envExample
  );

  // Create .env with actual keys
  const envContent = `# LLM Provider API Keys
OPENAI_API_KEY=${config.openaiApiKey}

# LangWatch
LANGWATCH_API_KEY=${config.langwatchApiKey}
`;

  await fs.writeFile(
    path.join(projectPath, '.env'),
    envContent
  );

  // Add .env to .gitignore
  const gitignoreContent = `# Environment variables
.env

# Dependencies
node_modules/
__pycache__/
*.pyc
venv/
.venv/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build outputs
dist/
build/
*.egg-info/
`;

  await fs.writeFile(
    path.join(projectPath, '.gitignore'),
    gitignoreContent
  );
};

