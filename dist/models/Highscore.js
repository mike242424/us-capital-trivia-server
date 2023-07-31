"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HighscoreSchema = new mongoose_1.Schema({
    initials: { type: String, required: true },
    score: { type: Number, required: true },
});
const Highscore = (0, mongoose_1.model)("Highscore", HighscoreSchema);
exports.default = Highscore;
