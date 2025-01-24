"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const status_1 = require("../controllers/status");
const router = (0, express_1.Router)();
router.get('/status', status_1.statusController);
router.get('/metrics', status_1.metricsController);
exports.default = router;
