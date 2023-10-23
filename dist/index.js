"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use("/", (0, routes_1.default)());
app.get("/", (req, res) => {
    res.send("successfully deployed to vercel");
});
const server = http_1.default.createServer(app);
server.listen(8080, () => {
    console.log("Server running at http://localhost:8080/");
});
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => {
    console.log({
        error: error,
        message: "There is an error connecting with the Mongo Database",
    });
});
//# sourceMappingURL=index.js.map