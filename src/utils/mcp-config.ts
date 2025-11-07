import * as fs from 'fs/promises';
import * as path from 'path';
import type { ProjectConfig } from '../types.js';

type MCPServer = {
  command: string;
  args?: string[];
  type?: string;
};

type MCPConfig = {
  mcpServers: Record<string, MCPServer>;
};

export const setupMCPConfig = async (
  projectPath: string,
  config: ProjectConfig
): Promise<void> => {
  const mcpConfig: MCPConfig = {
    mcpServers: {},
  };

  // Always add LangWatch MCP
  mcpConfig.mcpServers.langwatch = {
    command: 'npx',
    args: ['-y', '@langwatch/mcp-server', `--apiKey=${config.langwatchApiKey}`],
  };

  // Add framework-specific MCP
  if (config.framework === 'mastra') {
    mcpConfig.mcpServers.mastra = {
      type: 'stdio',
      command: 'npx',
      args: ['-y', '@mastra/mcp-docs-server'],
    };
  }

  // For Claude Code, save as .mcp.json in the project root
  if (config.codingAssistant === 'claude-code') {
    const mcpConfigPath = path.join(projectPath, '.mcp.json');
    await fs.writeFile(
      mcpConfigPath,
      JSON.stringify(mcpConfig, null, 2)
    );
  }
};

