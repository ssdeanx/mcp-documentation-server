# MCP Documentation Server

A smart documentation server that provides AI-assisted code improvement and documentation management.

## Features

- **AI Documentation Guide**: Maintains and updates documentation knowledge base
- **AI Code Assistant**: Analyzes and improves code quality
- **Framework Support**: Specialized analysis for React, Vue, Angular, and Node.js
- **Learning System**: Improves suggestions over time based on feedback
- **Auto-Updates**: Automatically fetches and processes new documentation

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/mahawi1992/mcp-documentation-server.git
cd mcp-documentation-server
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file:
```env
PORT=3000
UPDATE_INTERVAL=3600000
CACHE_DURATION=86400000
```

4. Start the server:
```bash
npm run dev
```