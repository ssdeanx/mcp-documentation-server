import { DocumentationServer } from './server';

async function main() {
    const server = new DocumentationServer();
    
    // Handle graceful shutdown
    process.on('SIGTERM', async () => {
        console.log('Received SIGTERM signal');
        await server.stop();
        process.exit(0);
    });

    process.on('SIGINT', async () => {
        console.log('Received SIGINT signal');
        await server.stop();
        process.exit(0);
    });

    // Start server
    await server.start();
}

// Start the application
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});