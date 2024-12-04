# MCP Documentation Server Usage Guide

## Basic Usage

### Starting the Server

1. Start in development mode:
```bash
npm run dev
```

2. Start in production mode:
```bash
npm run build
npm start
```

## Claude Desktop Integration

### Setting Up the Integration

1. Open Claude Desktop
2. Go to Settings > Tools
3. Click 'Add MCP Server'
4. Enter server details:
   - Name: MCP Documentation Server
   - URL: http://localhost:3000
   - Capabilities: File System, Brave Search, Knowledge Base

### Using with Claude

#### Documentation Search
```
Claude, find documentation about Next.js server components
```

Claude will use the MCP server to:
1. Search documentation using Brave Search
2. Process and filter relevant results
3. Present organized information

#### Code Analysis
```
Claude, analyze this Python code:

async def process_data(items):
    results = []
    for item in items:
        result = await process_item(item)
        results.append(result)
    return results
```

Claude will:
1. Use the Python analyzer
2. Check for best practices
3. Suggest improvements

#### Framework-Specific Help
```
Claude, help me understand Next.js App Router structure
```

Claude will:
1. Search official Next.js documentation
2. Find relevant examples
3. Provide organized information

## API Examples

### Documentation Search

```typescript
import { DocumentationProcessor } from './utils/DocumentationProcessor';

const processor = new DocumentationProcessor(BRAVE_API_KEY);

// Search framework documentation
const reactDocs = await processor.processFrameworkDocumentation('react', {
    version: '18'
});

// Search for specific topic
const routerDocs = await processor.processNextjsDocumentation('app router');

// Search Python packages
const pythonDocs = await processor.processPythonDocumentation('asyncio');
```

### Code Analysis

```typescript
import { NextjsAnalyzer } from './analyzers/NextjsAnalyzer';
import { PythonAnalyzer } from './analyzers/PythonAnalyzer';

// Analyze Next.js code
const nextAnalyzer = new NextjsAnalyzer();
const nextAnalysis = nextAnalyzer.analyze(code);

// Analyze Python code
const pythonAnalyzer = new PythonAnalyzer();
const pythonAnalysis = pythonAnalyzer.analyze(code);
```

### Brave Search Integration

```typescript
import { BraveSearchIntegration } from './utils/BraveSearchIntegration';

const braveSearch = new BraveSearchIntegration(BRAVE_API_KEY);

// Search documentation
const results = await braveSearch.searchDocumentation('React hooks guide');

// Search with context
const contextResults = await braveSearch.searchWithContext('server components', {
    framework: 'nextjs',
    version: '13'
});

// Search for error solutions
const errorResults = await braveSearch.searchErrorSolutions(
    'TypeError: Cannot read property of undefined',
    { framework: 'react' }
);
```

## Best Practices

1. **API Key Security**:
   - Store BRAVE_API_KEY in .env file
   - Never commit API keys to version control

2. **Rate Limiting**:
   - Implement rate limiting for production use
   - Cache frequently requested documentation

3. **Error Handling**:
   - Always wrap API calls in try-catch blocks
   - Provide meaningful error messages

4. **Caching**:
   - Use the built-in caching system
   - Configure cache duration based on needs

## Troubleshooting

### Common Issues

1. **Connection Issues**:
```bash
# Check if server is running
curl http://localhost:3000/api/status
```

2. **API Key Issues**:
- Verify BRAVE_API_KEY in .env
- Check Brave Search API access

3. **Integration Issues**:
- Verify Claude Desktop settings
- Check server logs for errors

### Getting Help

1. Check the issues section on GitHub
2. Join our Discord community
3. Contact support with logs and reproduction steps