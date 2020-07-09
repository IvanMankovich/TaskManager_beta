const fs = require('file-system'),
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
        if (!req.headers['cookie'] || !req.params.taskID) {
            // unauth user
            res.status(200).send(JSON.stringify(''));
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

                    let currentTask = parsedTasksList.find(task => task.taskID === req.params.taskID);
                    let newData = parsedTasksList.map(task => {
                        if (task.taskID !== req.params.taskID) {
                            return task;
                        } else {
                            task.taskStatus = 'Done';
                            task.taskUpdatedDate = new Date(Date.now());
                            currentTask = task;
                            return task;
                        }
                    });
                    setTasksToDB(newData);
                    res.status(200).send(JSON.stringify([currentTask, null]));
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
                    
                    let currentTask = parsedTasksList.find(task => task.taskID === req.params.taskID);
                    let newData = parsedTasksList.map(task => {
                        if (task.taskID !== req.params.taskID) {
                            return task;
                        } else {
                            task.taskStatus = 'Done';
                            task.taskUpdatedDate = new Date(Date.now());
                            currentTask = task;
                            return task;
                        }
                    });
                    setTasksToDB(newData);
                    let createdByUserName = parsedUsersList.find(user => user.userID === currentTask.taskCreatedByUserID).userName;
                    currentTask.createdByUserName = createdByUserName;
                    delete currentTask.taskCreatedByUserID;
                    delete currentTask.taskExecutorUserID;
                    res.status(200).send(JSON.stringify([currentTask, null]));
                }
            } else {
                res.sendStatus(404);
            }
        }
    }, 2000);
}