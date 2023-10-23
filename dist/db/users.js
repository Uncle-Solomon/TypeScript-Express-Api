"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserbyId = exports.deleteUserbyId = exports.createUser = exports.getUserbyId = exports.getUserbySessionToken = exports.getUserbyEmail = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUserbyEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserbyEmail = getUserbyEmail;
const getUserbySessionToken = (sessionToken) => exports.UserModel.findOne({
    "authentication.sessionToken": sessionToken,
});
exports.getUserbySessionToken = getUserbySessionToken;
const getUserbyId = (id) => exports.UserModel.findById(id);
exports.getUserbyId = getUserbyId;
const createUser = (values) => new exports.UserModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserbyId = (id) => exports.UserModel.findOneAndDelete({ _id: id });
exports.deleteUserbyId = deleteUserbyId;
const updateUserbyId = (id, values) => exports.UserModel.findByIdAndUpdate(id, values);
exports.updateUserbyId = updateUserbyId;
//# sourceMappingURL=users.js.map