"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const users_1 = require("../db/users");
const helpers_1 = require("../helpers");
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            res.status(400).json({ error: "An input field is empty" });
        }
        const existingUser = await (0, users_1.getUserbyEmail)(email);
        if (existingUser) {
            res.status(400).json({ error: "The user already exists" });
        }
        const salt = (0, helpers_1.random)();
        const user = await (0, users_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            },
        });
        res.status(200).json({ user }).end();
    }
    catch (error) {
        console.log(error);
        res.status(400);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "An input field is empty" });
        }
        const user = await (0, users_1.getUserbyEmail)(email).select("+authentication.salt +authentication.password");
        if (!user) {
            res.status(400).json({
                error: "The user doesn't exist, try registering the user again",
            });
        }
        const expectedHash = (0, helpers_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password != expectedHash) {
            res.status(400);
        }
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        res.cookie("My-Auth", user.authentication.sessionToken, {
            domain: "localhost",
            path: "/",
        });
        res.status(200).json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(400);
    }
};
exports.login = login;
//# sourceMappingURL=authentication.js.map