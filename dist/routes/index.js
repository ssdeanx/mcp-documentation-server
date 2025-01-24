"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_1 = __importDefault(require("./search"));
const analysis_1 = __importDefault(require("./analysis"));
const status_1 = __importDefault(require("./status"));
const router = (0, express_1.Router)();
router.use('/api/search', search_1.default);
router.use('/api/analyze', analysis_1.default);
router.use('/api', status_1.default);
exports.default = router;
