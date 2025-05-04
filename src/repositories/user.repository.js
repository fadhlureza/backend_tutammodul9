const db = require("../database/pg.database");

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getAllUsers = async () => {
    try {
        const res = await db.query("SELECT * FROM users");
        return res.rows;
    } catch (error) {
        console.log("Error getting users", error);
    }
}
exports.getUserById = async (id) => {
    try {
        const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        return res.rows[0];
    } catch (error) {
        console.error("Error getting user", error);
    }
}

exports.registerUser = async (user) => {
    try {
        const hashPassword = await bcrypt.hash(user.password, saltRounds);
        const res = await db.query("INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *", 
            [user.email, user.name, hashPassword]);
        return res.rows[0];
    }
    catch (error) {
        console.error("Error registering user", error);
    }
}
exports.loginUser = async (user) => {
    try {
        const res = await db.query("SELECT * FROM users WHERE email = $1", [user.email]);
        if (res.rows.length === 0) {
            return { error: "User not found" };
        }
        const match = await bcrypt.compare(user.password, res.rows[0].password);
        if (!match) {
            return { error: "Invalid password" };
        }
        return res.rows[0];
    }
    catch (error) {
        console.error("Error logging in user", error);
    }
}
exports.getUserEmail = async (email) => {
    try {
        const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (res.rows.length === 0) {
            return { error: "User not found" };
        }
        return res.rows[0];
    } catch (error) {
        console.log("Error getting user", error);
        return { error: "Error getting user" };  // Return error if any
    }
}
exports.updateUser = async (user) => {
    try {
        const hashPassword = await bcrypt.hash(user.password, saltRounds);
        const res = await db.query("UPDATE users SET name = $1, password = $2, email = $3 WHERE id = $4 RETURNING *",
            [user.name, hashPassword, user.email, user.id]);
        return res.rows[0];
    }
    catch (error) {
        console.error("Error updating user", error);
    }
}
exports.deleteUser = async (id) => {
    try {
        const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        return res.rows[0];
    } catch (error) {
        console.error("Error deleting user", error);
    }
}
exports.updateUserScore = async (user) => {
    try {
        const res = await db.query("UPDATE users SET score = $1 WHERE id = $2 RETURNING *",
            [user.score, user.id]);
        return res.rows[0];
    } catch (error) {
        console.error("Error updating user score", error);
    }
}