const fs = require('file-system'),
      shortId = require('shortid'),
      usersList = './users.json';

function getUsersFromDB() {
    return JSON.parse(fs.readFileSync(usersList, 'utf8'));
}

function setUsersToDB(data) {
    fs.writeFileSync(usersList, JSON.stringify(data));
}

module.exports = (req, res) => {
    setTimeout(() => {
        const parsedUsersList = getUsersFromDB(),
              userData = req.body;

        let userIndex;

        if (parsedUsersList.find((item, index) => {
            if (item.userMail === userData.userMail && item.userPassword === userData.userPassword) {
                userIndex = index;
            }
            return item.userMail === userData.userMail && item.userPassword === userData.userPassword;
        })) {
            const currentUser = parsedUsersList[userIndex];
            currentUser.userAuthKey = `${shortId.generate()}${shortId.generate()}${shortId.generate()}`;
            currentUser.userLastOnlineDate = new Date();
            currentUser.userAuthKeyValidUntil = new Date(Date.now() + 365 * 24 * 3600000);
            currentUser.isUserRemembered = userData.isUserRemembered;
            currentUser.userLastOnlineDate = new Date(Date.now());
            setUsersToDB(parsedUsersList);

            res.cookie('userAuthKey', currentUser.userAuthKey, { expires: new Date(Date.now() + 24 * 3600000) });
            res.cookie('userID', currentUser.userID, { expires: new Date(Date.now() + 24 * 3600000) });
            res.cookie('userName', currentUser.userName, { expires: new Date(Date.now() + 24 * 3600000) });
            res.cookie('userType', currentUser.userType, { expires: new Date(Date.now() + 24 * 3600000) });
            res.cookie('isUserRemembered', currentUser.isUserRemembered, { expires: new Date(Date.now() + 24 * 3600000) });
            res.sendStatus(202);
        } else {
            res.sendStatus(205);
        }
    }, 2000)
}