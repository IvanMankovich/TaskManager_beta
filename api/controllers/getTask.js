const fs = require('file-system'),
      tasksList = './tasks.json',
      usersList = './users.json',
      commentsList = './comments.json';
      
function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(tasksList, 'utf8'));
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

module.exports = (req, res) => {
    setTimeout(() => {
        if (!req.headers['cookie']) {
            // unauth user
            res.sendStatus(403);
        } else {
            const parsedUsersList = getUsersFromDB(),
                  parsedTasksList = getTasksFromDB(),
                  parsedCommentsList = getCommentsFromDB(),
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
                    let task = parsedTasksList.find(task => task.taskID === req.params.taskID);
                    if (!task) {
                        res.sendStatus(404);
                    } else {
                        // update user last online date
                        let newUsersList = parsedUsersList.map(user => {
                            if (user.userID === currentUserID) {
                                user.userLastOnlineDate = new Date(Date.now());
                                return user;
                            }
                            return user;
                        });
                        setUsersToDB(newUsersList);

                        if (parsedUsersList.find(user => user.userID === task.taskExecutorUserID) && parsedUsersList.find(user => user.userID === task.taskCreatedByUserID)) {
                            task.executorUserName = parsedUsersList.find(user => user.userID === task.taskExecutorUserID).userName;
                            task.createdByUserName = parsedUsersList.find(user => user.userID === task.taskCreatedByUserID).userName;
                        }
                        task.comments = parsedCommentsList.filter(comment => comment.commentTaskID === task.taskID);
                        if (task.comments) {
                            task.comments.map(comment => {
                                comment.commentCreatedByUserName = parsedUsersList.find(user => user.userID === comment.commentUserID).userName;
                                return comment;
                            });
                        }
                        let usersList = [];
                        parsedUsersList.forEach(user => {
                            if (user.userType !== 'admin') {
                                delete user.userPassword;
                                delete user.userMail;
                                delete user.userAuthKey;
                                delete user.userAuthKeyValidUntil;
                                delete user.isUserRemembered;
                                usersList.push(user);
                            }
                        });
    
                        res.status(200).send(JSON.stringify([task, usersList]));
                    }

                } else if (currentUserType === 'user') {
                    let task = parsedTasksList.find(task => task.taskID === req.params.taskID);

                    if (!task) {
                        res.sendStatus(404);
                    } else {
                        // update user last online date
                        let newUsersList = parsedUsersList.map(user => {
                            if (user.userID === currentUserID) {
                                user.userLastOnlineDate = new Date(Date.now());
                                return user;
                            }
                            return user;
                        });
                        setUsersToDB(newUsersList);
                        
                        if (task.taskExecutorUserID === currentUserID) {
                            if (parsedUsersList.find(user => user.userID === task.taskCreatedByUserID)) {
                                task.createdByUserName = parsedUsersList.find(user => user.userID === task.taskCreatedByUserID).userName;
                            }
                            task.comments = parsedCommentsList.filter(comment => comment.commentTaskID === task.taskID);
                            if (task.comments) {
                                task.comments.map(comment => {
                                    comment.commentCreatedByUserName = parsedUsersList.find(user => user.userID === comment.commentUserID).userName;
                                    return comment;
                                });
                            } else {
                                task.comments = [];
                            }
                            delete task.taskCreatedByUserID;
                            delete task.taskExecutorUserID;
    
                            res.status(200).send(JSON.stringify([task, null]));
                        } else {
                            res.sendStatus(403);
                        }
                    }
                }
            } else {
                res.sendStatus(403);
            }
        }
    }, 2000);
}