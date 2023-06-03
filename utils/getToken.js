const getTokenFromHeader = (req) => {
    const objHeader = req.headers;
    return objHeader["authorization"].split(" ")[1];
}

module.exports = getTokenFromHeader;