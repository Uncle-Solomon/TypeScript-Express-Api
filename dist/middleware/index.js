"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const lodash_1 = require("lodash");
const users_1 = require("../db/users");
const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies["My-Auth"];
        if (!sessionToken) {
            res.status(403);
        }
        const existingUser = await (0, users_1.getUserbySessionToken)(sessionToken);
        if (!existingUser) {
            res.status(403);
        }
        (0, lodash_1.merge)(req, { identity: existingUser });
    }
    catch (error) {
        console.log(error);
        res.status(400);
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map