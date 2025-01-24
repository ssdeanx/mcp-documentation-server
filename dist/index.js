"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const logger_1 = __importDefault(require("./utils/logger"));
async function main() {
    const server = new server_1.DocumentationServer();
    // Handle graceful shutdown
    process.on('SIGTERM', async () => {
        logger_1.default.info('Received SIGTERM signal');
        await server.stop();
        process.exit(0);
    });
    process.on('SIGINT', async () => {
        logger_1.default.info('Received SIGINT signal');
        await server.stop();
        process.exit(0);
    });
    // Handle uncaught errors
    process.on('uncaughtException', (error) => {
        logger_1.default.error('Uncaught exception:', error);
        process.exit(1);
    });
    process.on('unhandledRejection', (reason) => {
        logger_1.default.error('Unhandled rejection:', reason);
        process.exit(1);
    });
    try {
        await server.start();
        logger_1.default.info('Server started successfully');
    }
    catch (error) {
        logger_1.default.error('Failed to start server:', error);
        process.exit(1);
    }
}
// Start the server
main();
