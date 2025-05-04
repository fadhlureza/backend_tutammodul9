const userRepository = require("../repositories/user.repository");
const baseResponse = require("../utils/baseResponse.util");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[\d])(?=.*[\W_]).{8,}$/;

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        return baseResponse(res, true, 200, "Users retrieved successfully", users);
    }
    catch (error) {
        return baseResponse(res, false, 500, "Error retrieving users", null);
    }
};
exports.getUserById = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return baseResponse(res, false, 400, "User ID is required", null);
    }
    try {
        const user = await userRepository.getUserById(id);
        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }
        return baseResponse(res, true, 200, "User retrieved successfully", user);
    }
    catch (error) {
        return baseResponse(res, false, 500, "Error retrieving user", null);
    }
};
exports.registerUser = async (req, res) => {
    if (!req.query.email || !req.query.name || !req.query.password) {
        return baseResponse(res, false, 400, "Email, name, and password are required", null);
    }
    if (!emailRegex.test(req.query.email)) {
        return baseResponse(res, false, 400, "Invalid email", null);
    }
    if (!passwordRegex.test(req.query.password)) {
        return baseResponse(res, false, 400, "Password must be at least 8 characters long and contain at least one number and special character", null);
    }
    try {
        const user = await userRepository.registerUser(req.query);
        if (user.error) {
            return baseResponse(res, false, 400, user.error, null);
        }
        return baseResponse(res, true, 201, "User created successfully", user);
    } catch (error) {
        baseResponse(res, false, 500, "Error creating user", null);
    }
};

exports.loginUser = async (req, res) => {
    if (!req.query.email || !req.query.password) {
        return baseResponse(res, false, 400, "Email and password are required", null);
    }
    try {
        const user = await userRepository.loginUser(req.query);
        if (user.error) {
            return baseResponse(res, false, 400, user.error, null);
        }
        return baseResponse(res, true, 200, "User logged in successfully", user);
    } catch (error) {
        baseResponse(res, false, 500, "Error logging in user", null);
    }
};
exports.getUserEmail = async (req, res) => {
    if (!req.params.email) {
        return baseResponse(res, false, 400, "Email is required", null);
    }
    try {
        const user = await userRepository.getUserEmail(req.params.email);
        if (user.error) {
            return baseResponse(res, false, 400, user.error, null);
        }
        return baseResponse(res, true, 200, "User retrieved successfully", user);
    } catch (error) {
        baseResponse(res, false, 500, "Error getting user", null);
    }
}
exports.updateUser = async (req, res) => {
    if (!req.body.id || !req.body.email || !req.body.name || !req.body.password) {
        return baseResponse(res, false, 400, "User ID, email, name, and password are required", null);
    }
    if (!emailRegex.test(req.body.email)) {
        return baseResponse(res, false, 400, "Invalid email", null);
    }
    if (!passwordRegex.test(req.body.password)) {
        return baseResponse(res, false, 400, "Password must be at least 8 characters long and contain at least one number and special character", null);
    }
    try {
        const user = await userRepository.updateUser(req.body);
        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }
        return baseResponse(res, true, 200, "User updated successfully", user);
    } catch (error) {
        baseResponse(res, false, 500, "Error updating user", null);
    }
}
exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return baseResponse(res, false, 400, "User ID is required", null);
    }
    try {
        const user = await userRepository.deleteUser(id);
        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }
        baseResponse(res, true, 200, "User deleted successfully", user);
    }
    catch (error) {
        baseResponse(res, false, 500, "Error deleting user", null);
    }
}
exports.updateUserScore = async (req, res) => {
    if (!req.query.id || !req.query.score) {
        return baseResponse(res, false, 400, "User ID and score are required", null);
    }
    if (req.query.score < 0) {
        return baseResponse(res, false, 400, "Score cannot be negative", null);
    }
    try {
        const user = await userRepository.updateUserScore(req.query);
        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }
        return baseResponse(res, true, 200, "User score updated successfully", user);
    } catch (error) {
        baseResponse(res, false, 500, "Error updating user score", null);
    }
}