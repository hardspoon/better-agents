![](/images/cover-image.png)

# Better Agents

Better Agents is a CLI tool and a set of standards for agent building.

It supercharges your coding assistant (Claude Code, Cursor, Kilocode, etc), making it an expert in any agent framework you choose (Agno, Mastra, etc) and all their best practices, being able to autodiscover MCP tools to augment your agent.

The Superagent Structure ensures industry best practices, making your agent ready for production with proper testing, observability, and prompt management.

## Installation

```bash
npm install -g @langwatch/better-agents
```

Or use with npx:

```bash
npx @langwatch/better-agents init my-agent-project
```

## Documentation

- **[Getting Started](docs/GETTING-STARTED.md)** - Quick start guide (2 minutes)
- **[Walkthrough](docs/WALKTHROUGH.md)** - Detailed step-by-step guide
- **[Project Structure](docs/STRUCTURE.md)** - Understanding the Superagent structure
- **[Features](docs/FEATURES.md)** - Key features and capabilities
- **[Usage](docs/USAGE.md)** - CLI usage and examples
- **[Philosophy](docs/PHILOSOPHY.md)** - Agent Testing Pyramid approach
- **[Contributing](docs/CONTRIBUTING.md)** - How to contribute to Better Agents
- **[Changelog](CHANGELOG.md)** - Version history

## Usage

### Initialize a new project

```bash
# In current directory
better-agents init .

# In a new directory
better-agents init my-awesome-agent
```

The CLI will guide you through selecting your programming language, agent framework, coding assistant, LLM provider, and API keys.

## Requirements

- Node.js 18+
- npm or pnpm
- A coding assistant (one of the following):
  - [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code-agent) (`claude` CLI)
  - [Cursor](https://www.cursor.com/)
  - [Kilocode CLI](https://www.kilocode.ai/) (`kilocode`)
- API Keys:
  - Your chosen LLM Provider API key
  - LangWatch API key (get one at https://app.langwatch.ai/authorize)
  - Smithery API key (optional - for MCP tool auto-discovery, get one at https://smithery.ai/account/api-keys)

## Resources

- [LangWatch](https://langwatch.ai)
- [Scenario Documentation](https://scenario.langwatch.ai/)
- [Agent Testing Pyramid](https://scenario.langwatch.ai/best-practices/the-agent-testing-pyramid)
- [Agno](https://agno.com)
- [Mastra](https://mastra.ai)

## License

MIT

---

Built with ❤️ by the LangWatch team
