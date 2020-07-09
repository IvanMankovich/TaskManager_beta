const fs = require('file-system'),
      shortId = require('shortid'),
      tasksList = './tasks.json',
      usersList = './users.json';

function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(tasksList, 'utf8'));
}

function setTasksToDB(data) {
    fs.writeFileSync(tasksList, JSON.stringify(data));
}

function getUsersFromDB() {
    return JSON.parse(fs.readFileSync(usersList, 'utf8'));
}

function setUsersToDB(data) {
    fs.writeFileSync(usersList, JSON.stringify(data));
}

module.exports = (req, res) => {
    setTimeout(() => {
        if (!req.headers['cookie']) {
            res.status(200).send(JSON.stringify(''));
        } else {
            const parsedUsersList = getUsersFromDB(),
                  parsedTasksList = getTasksFromDB(),
                  task = req.body,
                  receivedCookie = req.headers['cookie'];
            let cookieUserID, cookieUserAuthKey, cookieUserType;
            if (receivedCookie) {
                cookieUserID = receivedCookie.split('; ').find(item => item.startsWith('userID')).replace('userID=', '');
                cookieUserAuthKey = receivedCookie.split('; ').find(item => item.startsWith('userAuthKey')).replace('userAuthKey=', '');
                cookieUserType = receivedCookie.split('; ').find(item => item.startsWith('userType')).replace('userType=', '');
            }
            if (parsedUsersList.find(item => {
                currentUserID = item.userID;
                return item.userAuthKey && cookieUserAuthKey && item.userID === cookieUserID && item.userAuthKey === cookieUserAuthKey && Date.parse(item.userAuthKeyValidUntil) > Date.now() && cookieUserType === item.userType && item.userType === 'admin';
            })) {
                task.taskID = shortId.generate();
                task.taskTitle = task.taskTitle.trim() ? task.taskTitle : task.taskID.slice();
                task.taskDescription = task.taskDescription.trim() ? task.taskDescription : 'No description';
                task.taskStatus = 'Undone';
                task.taskCreatedByUserID = currentUserID;
                task.taskExecutorUserID;
                task.taskCreationDate = new Date(Date.now());
                task.taskValidUntilDate = new Date(task.taskValidUntilDate);
                task.taskUpdatedDate = null;
                parsedTasksList.push(task);
                setTasksToDB(parsedTasksList);

                // update user last online date
                let newUsersList = parsedUsersList.map(user => {
                    if (user.userID === currentUserID) {
                        user.userLastOnlineDate = new Date(Date.now());
                        return user;
                    }
                    return user;
                });
                setUsersToDB(newUsersList);

                let usersList = [];
                parsedUsersList.forEach(user => {
                    delete user.userPassword;
                    delete user.userMail;
                    delete user.userAuthKey;
                    delete user.userAuthKeyValidUntil;
                    delete user.isUserRemembered;
                    usersList.push(user);
                });
                res.status(200).send(JSON.stringify([parsedTasksList, usersList]));
            } else {
                res.status(200).send(JSON.stringify(parsedTasksList));
            }
        }
    }, 2000);
}