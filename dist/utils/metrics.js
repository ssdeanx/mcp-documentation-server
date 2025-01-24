"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metrics = void 0;
class MetricsCollector {
    constructor() {
        this.metrics = new Map();
        this.intervals = new Map();
    }
    increment(metric, value = 1) {
        const current = this.metrics.get(metric) || 0;
        this.metrics.set(metric, current + value);
    }
    recordTiming(metric, duration) {
        const timings = this.intervals.get(metric) || [];
        timings.push(duration);
        this.intervals.set(metric, timings);
    }
    getMetrics() {
        const result = {};
        // Add counters
        for (const [key, value] of this.metrics.entries()) {
            result[key] = value;
        }
        // Add timings
        for (const [key, timings] of this.intervals.entries()) {
            if (timings.length > 0) {
                result[`${key}_avg`] = this.average(timings);
                result[`${key}_p95`] = this.percentile(timings, 95);
                result[`${key}_max`] = Math.max(...timings);
            }
        }
        return result;
    }
    average(numbers) {
        return numbers.reduce((a, b) => a + b, 0) / numbers.length;
    }
    percentile(numbers, p) {
        const sorted = numbers.slice().sort((a, b) => a - b);
        const pos = ((sorted.length - 1) * p) / 100;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        }
        else {
            return sorted[base];
        }
    }
    reset() {
        this.metrics.clear();
        this.intervals.clear();
    }
}
exports.metrics = new MetricsCollector();
