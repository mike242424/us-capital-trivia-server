"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Highscore_1 = __importDefault(require("./models/Highscore"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;
mongoose_1.default
    // .connect(mongoURI)
    .connect(mongoURI)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/highscores", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const highscores = yield Highscore_1.default.find().sort({
            score: -1,
        });
        res.status(200).json(highscores);
    }
    catch (err) {
        console.error("Error fetching highscores:", err);
        res.status(500).json({ error: "Failed to fetch highscores" });
    }
}));
app.post("/highscores", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { initials, score } = req.body;
    try {
        const newHighscore = new Highscore_1.default({
            initials,
            score,
        });
        yield newHighscore.save();
        res.status(201).json({ message: "Highscore added successfully" });
    }
    catch (err) {
        console.error("Error adding highscore:", err);
        res.status(500).json({ error: "Failed to add highscore" });
    }
}));
app.listen(port, () => {
    console.log(` Server is running at http://localhost:${port}`);
});
