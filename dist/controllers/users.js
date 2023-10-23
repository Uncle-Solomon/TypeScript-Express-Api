"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const users_1 = require("../db/users");
const getAllUsers = async (req, res) => {
    try {
        const user = await (0, users_1.getUsers)();
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=users.js.map