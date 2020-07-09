const fs = require('file-system'),
      usersList = './users.json';

function getUsersFromDB() {
    return JSON.parse(fs.readFileSync(usersList, 'utf8'));
}

function setUsersToDB(data) {
    fs.writeFileSync(usersList, JSON.stringify(data));
}

module.exports = (req, res) => {
    setTimeout(() => {
        if (!req.headers['cookie']) {
            res.sendStatus(200);
        } else {
            const parsedUsersList = getUsersFromDB(),
                  receivedCookie = req.headers['cookie'];
            if (receivedCookie) {
                cookieUserID = receivedCookie.split('; ').find(item => item.startsWith('userID')).replace('userID=', '');
                cookieUserAuthKey = receivedCookie.split('; ').find(item => item.startsWith('userAuthKey')).replace('userAuthKey=', '');
                cookieUserType = receivedCookie.split('; ').find(item => item.startsWith('userType')).replace('userType=', '');
            }
            let currentUserID;
            // is it valid user?
            if (parsedUsersList.find(item => {
                currentUserID = item.userID;
                return item.userAuthKey && cookieUserAuthKey && item.userID === cookieUserID && item.userAuthKey === cookieUserAuthKey && Date.parse(item.userAuthKeyValidUntil) > Date.now() && cookieUserType === item.userType && (item.userType === 'admin' || item.userType === 'user');
            })) {
                // update user last online date
                let newUsersList = parsedUsersList.map(user => {
                    if (user.userID === currentUserID) {
                        user.userLastOnlineDate = new Date(Date.now());
                        return user;
                    }
                    return user;
                });
                setUsersToDB(newUsersList);
                res.sendStatus(200);
            } else {
                res.sendStatus(403);
            }
        }
    }, 2000);
}