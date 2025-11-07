import * as fs from 'fs/promises';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { collectProjectConfig } from '../prompts.js';
import { setupProjectStructure } from '../utils/project-structure.js';
import { setupMCPConfig } from '../utils/mcp-config.js';
import { generateAgentsMd } from '../utils/agents-md.js';
import { setupAgnoConfig } from '../utils/agno-config.js';
import { kickoffCodingAgent } from '../utils/kickoff-agent.js';
import type { ProjectConfig } from '../types.js';

export const initCommand = async (targetPath: string): Promise<void> => {
  try {
    // Collect user configuration
    const config: ProjectConfig = await collectProjectConfig();

    // Resolve and create target directory
    const absolutePath = path.resolve(process.cwd(), targetPath);

    const spinner = ora('Setting up your agent project...').start();

    try {
      await fs.mkdir(absolutePath, { recursive: true });

      // Setup project structure
      await setupProjectStructure(absolutePath, config);
      spinner.text = 'Project structure created';

      // Setup MCP configuration
      await setupMCPConfig(absolutePath, config);
      spinner.text = 'MCP configuration set up';

      // Setup Agno-specific config if needed
      if (config.framework === 'agno') {
        await setupAgnoConfig(absolutePath);
        spinner.text = 'Agno configuration set up';
      }

      // Generate AGENTS.md
      await generateAgentsMd(absolutePath, config);
      spinner.text = 'AGENTS.md generated';

      spinner.succeed(chalk.green('Project setup complete!'));

      console.log(chalk.bold.cyan('\n✨ Your agent project is ready!\n'));
      console.log(chalk.gray(`Project location: ${absolutePath}\n`));

      // Kickoff the coding agent
      await kickoffCodingAgent(absolutePath, config);

    } catch (error) {
      spinner.fail('Failed to set up project');
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red(`\n❌ Error: ${error.message}`));
    } else {
      console.error(chalk.red('\n❌ An unexpected error occurred'));
    }
    process.exit(1);
  }
};
