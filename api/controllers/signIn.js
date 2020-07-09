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
              newUserData = req.body;
        
        if (parsedUsersList.find(item => {
            return item.userMail === req.body.userMail;
        })) {
            res.sendStatus(205);
        } else {
            newUserData.userID = shortId.generate();
            newUserData.userMail = newUserData.userMail;
            newUserData.userName = newUserData.userName;
            newUserData.userType = 'user';
            newUserData.userPassword = newUserData.userPassword;
            newUserData.userCreationDate = new Date();
            newUserData.isUserOnline = false;
            newUserData.userAuthKey = `${shortId.generate()}${shortId.generate()}${shortId.generate()}`;
            newUserData.userLastOnlineDate = new Date();
            newUserData.userCommonTasksAmount = 0;
            newUserData.userRate = 0;
            newUserData.isUserRemembered = '';
            res.cookie('authKey', newUserData.authKey, { expires: new Date(Date.now() + 900000) });
            res.cookie('currentUserID', newUserData.userID, { expires: new Date(Date.now() + 900000) });
            res.cookie('currentUserName', newUserData.userName, { expires: new Date(Date.now() + 900000) });
            res.cookie('userType', newUserData.userType, { expires: new Date(Date.now() + 900000) });
            parsedUsersList.push(newUserData);
            setUsersToDB(parsedUsersList);
            res.sendStatus(201);
        }
    }, 2000)
}