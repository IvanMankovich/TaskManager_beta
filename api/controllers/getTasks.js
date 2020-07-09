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
            res.sendStatus(401);
        } else {
            const parsedUsersList = getUsersFromDB(),
                  parsedTasksList = getTasksFromDB(),
                  receivedCookie = req.headers['cookie'];
            let result = [], cookieUserID, cookieUserAuthKey, cookieUserType;
            if (receivedCookie) {
                cookieUserID = receivedCookie.split('; ').find(item => item.startsWith('userID')).replace('userID=', '');
                cookieUserAuthKey = receivedCookie.split('; ').find(item => item.startsWith('userAuthKey')).replace('userAuthKey=', '');
                cookieUserType = receivedCookie.split('; ').find(item => item.startsWith('userType')).replace('userType=', '');
            }
            let currentUserType;
            if (parsedUsersList.find(item => {
                currentUserID = item.userID;
                currentUserType = item.userType;
                // check for userID, authKey and validityDateOfAuthKey
                return item.userID === cookieUserID && item.userAuthKey === cookieUserAuthKey && item.userAuthKey && cookieUserAuthKey && Date.parse(item.userAuthKeyValidUntil) > Date.now() && currentUserType === cookieUserType;
            })) {
                // response depends on userType
                if (cookieUserType === 'user') {
                    // allTasks
                    parsedTasksList.forEach(item => {
                        if (item.taskExecutorUserID === cookieUserID && !item.taskArchived) {
                            let executorUserName = parsedUsersList.find(user => user.userID === item.taskExecutorUserID).userName;
                            let createdByUserName = parsedUsersList.find(user => user.userID === item.taskCreatedByUserID).userName;
                            delete item.taskCreatedByUserID;
                            delete item.taskExecutorUserID;
    
                            result.push({
                                ...item,
                                executorUserName: executorUserName,
                                createdByUserName: createdByUserName,
                            })
                        }
                    })
                    // update user last online date
                    let newUsersList = parsedUsersList.map(user => {
                        if (user.userID === currentUserID) {
                            user.userLastOnlineDate = new Date(Date.now());
                            return user;
                        }
                        return user;
                    });
                    setUsersToDB(newUsersList);

                    res.status(200).send(JSON.stringify([result, null]));
                } else if ((cookieUserType === 'admin')) {
                    // allUserTasks
                    parsedTasksList.forEach(item => {
                        if (!item.taskArchived) {
                            let createdByUserName = parsedUsersList.find(user => user.userID === item.taskCreatedByUserID).userName;
                            let executorUserName = parsedUsersList.find(user => user.userID === item.taskExecutorUserID).userName;
        
                            result.push({
                                ...item,
                                createdByUserName: createdByUserName,
                                executorUserName: executorUserName,
                            })
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
                    
                    const dataToSend = [result, parsedUsersList.filter(item => item.userType === 'user')];
                    res.status(200).send(JSON.stringify(dataToSend));
                } else {
                    res.status(200).send(JSON.stringify(result));
                }
                
            } else {
                res.sendStatus(403);
            }

        }
    }, 2000);
}