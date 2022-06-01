const generatemsg = (user, message) => {
    return {
        user,
        message,
        createdAt: new Date().getTime()
    }
}

const generateLocation = (username, url) => {
    return {
        username,
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generatemsg,
    generateLocation
}