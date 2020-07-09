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
            console.log('asdasdasd')
            res.sendStatus(404);
        } else {
            const parsedUsersList = getUsersFromDB(),
                  receivedCookie = req.headers['cookie'];
            let cookieUserID, cookieUserAuthKey, cookieUserType;
            // parse cookie
            if (receivedCookie) {
                cookieUserID = receivedCookie.split('; ').find(item => item.startsWith('userID')).replace('userID=', '');
                cookieUserAuthKey = receivedCookie.split('; ').find(item => item.startsWith('userAuthKey')).replace('userAuthKey=', '');
                cookieUserType = receivedCookie.split('; ').find(item => item.startsWith('userType')).replace('userType=', '');
            } else {
                res.sendStatus(401);
            }
            let currentUserID, currentUserType;
            // is it valid user?
            if (parsedUsersList.find(item => {
                currentUserID = item.userID;
                currentUserType = item.userType;
                return item.userAuthKey && cookieUserAuthKey && item.userID === cookieUserID && item.userAuthKey === cookieUserAuthKey && Date.parse(item.userAuthKeyValidUntil) > Date.now() && cookieUserType === item.userType && (item.userType === 'admin' || item.userType === 'user');
            })) {
                res.cookie('userAuthKey', '', { expires: new Date(0) });
                res.cookie('userID', '', { expires: new Date(0) });
                res.cookie('userName', '', { expires: new Date(0) });
                res.cookie('userType', '', { expires: new Date(0) });
                res.cookie('isUserRemembered', '', { expires: new Date(0) });
                // update user last online date
                let newUsersList = parsedUsersList.map(user => {
                    if (user.userID === currentUserID) {
                        user.userLastOnlineDate = new Date(Date.now());
                        user.userAuthKey = null;
                        user.userAuthKeyValidUntil = new Date(0);
                        user.isUserRemembered = '';
                        return user;
                    }
                    return user;
                });
                setUsersToDB(newUsersList);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }
    }, 2000)
}