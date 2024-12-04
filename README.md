# MCP Documentation Server

A smart documentation server that provides AI-assisted code improvement and documentation management through Claude Desktop integration.

## Features

- **AI Documentation Guide**: Maintains and updates documentation knowledge base
- **AI Code Assistant**: Analyzes and improves code quality
- **Framework Support**: 
  - React.js
  - Next.js (with App Router)
  - Python
  - Vue.js
  - Angular
  - Node.js
- **Brave Search Integration**: Smart documentation search and retrieval
- **Learning System**: Improves suggestions over time

## Installation

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
BRAVE_API_KEY=your_brave_api_key
```

4. Start the server:
```bash
npm run dev
```

## Claude Desktop Integration

### Prerequisites
- Claude Desktop App installed
- MCP Documentation Server running

### Setup Steps

1. Open Claude Desktop settings
2. Navigate to the Tools section
3. Add new MCP server with your local server URL:
   ```
   http://localhost:3000
   ```
4. Enable the following capabilities:
   - File System Access
   - Brave Search
   - Knowledge Base

### Usage with Claude

Once integrated, you can use commands like:

```
Claude, search documentation for Next.js App Router
```

or

```
Claude, analyze this Python code and suggest improvements...
```

## API Documentation

### Framework Documentation Search

```typescript
const docSystem = new DocumentationProcessor(BRAVE_API_KEY);

// Search Next.js documentation
const nextjsDocs = await docSystem.processNextjsDocumentation('app router');

// Search Python documentation
const pythonDocs = await docSystem.processPythonDocumentation('asyncio');
```

### Code Analysis

```typescript
const analyzer = new PythonAnalyzer();

// Analyze Python code
const analysis = analyzer.analyze(pythonCode);
console.log(analysis.typing.typeHints);
console.log(analysis.async.asyncFunctions);
```

## Testing

Run the test suite:

```bash
npm test
```

Run specific tests:

```bash
npm test -- tests/integration/BraveSearchIntegration.test.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details