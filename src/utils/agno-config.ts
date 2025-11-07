import * as fs from 'fs/promises';
import * as path from 'path';

const AGNO_CURSORRULES_URL = 'https://raw.githubusercontent.com/agno-agi/agno/main/.cursorrules';
const AGNO_LLMS_TXT_URL = 'https://docs.agno.com/llms.txt';

export const setupAgnoConfig = async (projectPath: string): Promise<void> => {
  // Fetch and save .cursorrules
  try {
    const cursorRulesResponse = await fetch(AGNO_CURSORRULES_URL);
    if (!cursorRulesResponse.ok) {
      throw new Error(`Failed to fetch .cursorrules: ${cursorRulesResponse.statusText}`);
    }
    const cursorRulesContent = await cursorRulesResponse.text();
    await fs.writeFile(
      path.join(projectPath, '.cursorrules'),
      cursorRulesContent
    );
  } catch (error) {
    console.warn('Warning: Could not fetch Agno .cursorrules file');
    // Create a placeholder
    await fs.writeFile(
      path.join(projectPath, '.cursorrules'),
      '# Agno cursor rules\n# Please manually download from: https://raw.githubusercontent.com/agno-agi/agno/main/.cursorrules\n'
    );
  }

  // Fetch and save llms.txt
  try {
    const llmsTxtResponse = await fetch(AGNO_LLMS_TXT_URL);
    if (!llmsTxtResponse.ok) {
      throw new Error(`Failed to fetch llms.txt: ${llmsTxtResponse.statusText}`);
    }
    const llmsTxtContent = await llmsTxtResponse.text();
    await fs.writeFile(
      path.join(projectPath, 'llms.txt'),
      llmsTxtContent
    );
  } catch (error) {
    console.warn('Warning: Could not fetch Agno llms.txt file');
    // Create a placeholder
    await fs.writeFile(
      path.join(projectPath, 'llms.txt'),
      '# Agno LLMs documentation\n# Please manually download from: https://docs.agno.com/llms.txt\n'
    );
  }
};

