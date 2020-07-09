const fs = require('file-system'),
      tasksList = './tasks.json',
      usersList = './users.json';

function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(tasksList, 'utf8'));
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
            // unauth user
            res.sendStatus(404);
        } else {
            const parsedUsersList = getUsersFromDB(),
                  parsedTasksList = getTasksFromDB(),
                  receivedCookie = req.headers['cookie'];
            let cookieUserID, cookieUserAuthKey, cookieUserType;
            // parse cookie
            if (receivedCookie) {
                cookieUserID = receivedCookie.split('; ').find(item => item.startsWith('userID')).replace('userID=', '');
                cookieUserAuthKey = receivedCookie.split('; ').find(item => item.startsWith('userAuthKey')).replace('userAuthKey=', '');
                cookieUserType = receivedCookie.split('; ').find(item => item.startsWith('userType')).replace('userType=', '');
            }
            let currentUserID, currentUserType;
            // is it valid user?
            if (parsedUsersList.find(item => {
                currentUserID = item.userID;
                currentUserType = item.userType;
                return item.userAuthKey && cookieUserAuthKey && item.userID === cookieUserID && item.userAuthKey === cookieUserAuthKey && Date.parse(item.userAuthKeyValidUntil) > Date.now() && cookieUserType === item.userType && (item.userType === 'admin' || item.userType === 'user');
            })) {
                if (currentUserType === 'admin') {
                    // update user last online date
                    let newUsersList = parsedUsersList.map(user => {
                        if (user.userID === currentUserID) {
                            user.userLastOnlineDate = new Date(Date.now());
                            return user;
                        }
                        return user;
                    });
                    setUsersToDB(newUsersList);
                    
                    let data = {};
                    data.totalTasksAmount = parsedTasksList.length;
                    data.totalCompleteTasksAmount = parsedTasksList.filter(task => task.taskStatus === 'Done').length;
                    data.totalActiveTasksAmount = parsedTasksList.filter(task => task.taskStatus === 'Undone' && Date.parse(task.taskValidUntilDate) - Date.now() > 0).length;
                    data.totalFailedTasksAmount = parsedTasksList.filter(task => task.taskStatus === 'Undone' && Date.parse(task.taskValidUntilDate) - Date.now() <= 0).length;
                    data.totalUsersAmount = parsedUsersList.filter(user => user.userType === 'user').length;
                    let usersList = [];
                    parsedUsersList.forEach(user => {
                        delete user.userPassword;
                        delete user.userMail;
                        delete user.userAuthKey;
                        delete user.userAuthKeyValidUntil;
                        delete user.isUserRemembered;
                        usersList.push(user);
                    });
                    res.status(200).send(JSON.stringify([data, usersList]));
                } else if (currentUserType === 'user') {
                    // update user last online date
                    let newUsersList = parsedUsersList.map(user => {
                        if (user.userID === currentUserID) {
                            user.userLastOnlineDate = new Date(Date.now());
                            return user;
                        }
                        return user;
                    });
                    setUsersToDB(newUsersList);

                    let data = {};
                    data.userCommonRate = parsedUsersList.find(user => user.userID === currentUserID).userCommonRate;
                    data.userCommonTasksAmount = parsedUsersList.find(user => user.userID === currentUserID).userCommonTasksAmount;
                    data.totalUsersTasksAmount = parsedTasksList.filter(task => task.taskExecutorUserID === currentUserID && !task.taskArchived).length;
                    data.totalUsersCompleteTasksAmount = parsedTasksList.filter(task => task.taskStatus === 'Done' && task.taskExecutorUserID === currentUserID).length;
                    data.totalUsersActiveTasksAmount = parsedTasksList.filter(task => task.taskStatus === 'Undone' && Date.parse(task.taskValidUntilDate) - Date.now() > 0 && task.taskExecutorUserID === currentUserID).length;
                    data.totalUsersFailedTasksAmount = parsedTasksList.filter(task => task.taskStatus === 'Undone' && Date.parse(task.taskValidUntilDate) - Date.now() <= 0 && task.taskExecutorUserID === currentUserID).length;
                    data.userName = parsedUsersList.find(user => user.userID === currentUserID).userName;
                    res.status(200).send(JSON.stringify([data, null]));
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        }
    }, 2000);
}