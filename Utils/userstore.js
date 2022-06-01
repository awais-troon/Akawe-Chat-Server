const users = []
const newuser = []
const addUser = ({ id,userid,profilepath, username, eventid }) => {
    //clean the data
console.log(username)
    
    //vlidate data
    if (!userid || !eventid) {
        return {
            error: 'userid and eventid are required!'
        }
    }

    //check for existing users
    const existingUser = users.find((user) => {
        return user.eventid == eventid && user.userid == userid
    })

    //va;idate username
    if (existingUser) {
        return {
            error: "userid iss already used"
        }
    }

    //store user
    const user = { id,userid,profilepath, username, eventid }
    users.push(user)
    return { user }
}


const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => {
        return user.id === id
    })
}

const getUserInEvent = (eventid) => {
    const u = []
    users.filter((user) => {

        user.eventid === eventid
    })
    console.log(users)
    return users

}

module.exports = {
    addUser, removeUser, getUser, getUserInEvent
}