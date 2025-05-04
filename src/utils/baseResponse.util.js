const baseResponse = (res, success, status, message, payload) => {
    return res.status(status).json({
        success: success,
        message: message,
        payload: payload
    });
}
module.exports = baseResponse;