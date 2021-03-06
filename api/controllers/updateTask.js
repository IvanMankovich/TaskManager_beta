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
        if (!req.headers['cookie'] || !req.body) {
            // unauth user or invalid request
            res.sendStatus(401);
        } else {
            const parsedUsersList = getUsersFromDB(),
                  parsedTasksList = getTasksFromDB(),
                  updatedTask = req.body,
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
                return item.userAuthKey && cookieUserAuthKey && item.userID === cookieUserID && item.userAuthKey === cookieUserAuthKey && Date.parse(item.userAuthKeyValidUntil) > Date.now() && cookieUserType === item.userType && item.userType === 'admin';
            })) {
                let currentTask = parsedTasksList.find(task => task.taskID === updatedTask.taskID);
                let newData = parsedTasksList.map(task => {
                    if (task.taskID !== updatedTask.taskID) {
                        return task;
                    } else {
                        task.taskID = task.taskID;
                        task.taskTitle = updatedTask.taskTitle.trim() ? updatedTask.taskTitle : updatedTask.taskID.slice();
                        task.taskDescription = updatedTask.taskDescription.trim() ? updatedTask.taskDescription : 'No description';
                        task.taskStatus = updatedTask.taskStatus;
                        task.taskCreatedByUserID = task.taskCreatedByUserID;
                        task.taskExecutorUserID = updatedTask.taskExecutorUserID;
                        task.taskCreationDate = task.taskCreationDate;
                        task.taskValidUntilDate = updatedTask.taskValidUntilDate;
                        task.taskUpdatedDate = new Date(Date.now());
                        currentTask = task;
                        return task;
                    }
                });
                // update user last online date
                let newUsersList = parsedUsersList.map(user => {
                    if (user.userID === currentUserID) {
                        user.userLastOnlineDate = new Date(Date.now());
                        return user;
                    }
                    return user;
                });
                setUsersToDB(newUsersList);
                setTasksToDB(newData);
                res.sendStatus(200);
            } else {
                res.sendStatus(403);
            }
        }
    }, 2000);
}