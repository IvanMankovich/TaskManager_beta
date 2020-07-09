const fs = require('file-system'),
      tasksList = './tasks.json',
      usersList = './users.json',
      commentsList = './comments.json',
      archivedTasksList = './archiveTasks.json',
      archivedCommentsList = './archiveComments.json';

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

function getCommentsFromDB() {
    return JSON.parse(fs.readFileSync(commentsList, 'utf8'));
}

function setCommentsToDB(data) {
    fs.writeFileSync(commentsList, JSON.stringify(data));
}

function getAcrhivedCommentsFromDB() {
    return JSON.parse(fs.readFileSync(archivedCommentsList, 'utf8'));
}

function setAcrhivedCommentsToDB(data) {
    fs.writeFileSync(archivedCommentsList, JSON.stringify(data));
}

function getAcrhivedTasksFromDB() {
    return JSON.parse(fs.readFileSync(archivedTasksList, 'utf8'));
}

function setAcrhivedTasksToDB(data) {
    fs.writeFileSync(archivedTasksList, JSON.stringify(data));
}

function deepClone(obj) {
    let newObj;

    if (obj === null) {
        return newObj = null;

    } else if ( Array.isArray(obj) ) {
        newObj = [];
        for (let i = 0; i < obj.length; i++) {
            newObj.push( deepClone(obj[i]) );
        }

    } else if ( (typeof obj === "object") && !(typeof obj === "function") ) { 
        newObj = {};
        for (let key in obj) {
            if (key) {
                newObj[key] = deepClone(obj[key]);
            }
        }
    }

    return newObj || obj;
}

module.exports = (req, res) => {
    setTimeout(() => {
        if (!req.headers['cookie']) {
            res.sendStatus(404);
        } else {
            const parsedUsersList = getUsersFromDB(),
                  parsedTasksList = getTasksFromDB(),
                  parsedCommentsList = getCommentsFromDB(),
                  parsedArchivedCommentsList = getAcrhivedCommentsFromDB(),
                  parsedArchivedTasksList = getAcrhivedTasksFromDB(),
                  data = req.body,
                  receivedCookie = req.headers['cookie'];
            let cookieUserID, cookieUserAuthKey, cookieUserType;
            if (receivedCookie) {
                cookieUserID = receivedCookie.split('; ').find(item => item.startsWith('userID')).replace('userID=', '');
                cookieUserAuthKey = receivedCookie.split('; ').find(item => item.startsWith('userAuthKey')).replace('userAuthKey=', '');
                cookieUserType = receivedCookie.split('; ').find(item => item.startsWith('userType')).replace('userType=', '');
            } else {
                res.sendStatus(404);
            }
            if (parsedUsersList.find(item => {
                currentUserID = item.userID;
                currentUserType = item.userType;
                return item.userAuthKey && cookieUserAuthKey && item.userID === cookieUserID && item.userAuthKey === cookieUserAuthKey && Date.parse(item.userAuthKeyValidUntil) > Date.now() && cookieUserType === item.userType && item.userType === 'admin';
            })) {
                let currentComments, tempTask, tempExecutorID;
                let newParsedTasksList = parsedTasksList.map(task => {
                    if (task.taskID === data.taskID) {
                        task.taskArchived = true;
                        task.taskRate = +data.taskRate;
                        task.taskCompleteAndRateDate = Date.now();
                        tempExecutorID = task.taskExecutorUserID;
                        tempTask = deepClone(task);
                        delete task.taskTitle;
                        delete task.taskDescription;
                        delete task.taskStatus;
                        delete task.taskCreationDate;
                        delete task.taskValidUntilDate;
                        delete task.taskUpdatedDate;
                        delete task.taskRate;
                        return task;
                    } else {
                        return task;
                    }
                });
                parsedArchivedTasksList.push(tempTask);
                setAcrhivedTasksToDB(parsedArchivedTasksList);

                currentComments = parsedCommentsList.filter(comment => comment.commentTaskID === data.taskID);
                parsedArchivedCommentsList.push(...currentComments);
                setAcrhivedCommentsToDB(parsedArchivedCommentsList);

                setTasksToDB(newParsedTasksList);

                let newParsedCommentsList = parsedCommentsList.filter(task => task.taskID !== data.taskID);
                setCommentsToDB(newParsedCommentsList);

                let newParsedUsersList = parsedUsersList.map(user => {
                    if (user.userID === tempExecutorID) {
                        user.userCommonTasksAmount += 1;
                        user.userCommonRate += +data.taskRate;
                        return user; 
                    } else {
                        return user;
                    }
                });
                setUsersToDB(newParsedUsersList);
                
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
                res.sendStatus(404);
            }
        }
    }, 2000);
}