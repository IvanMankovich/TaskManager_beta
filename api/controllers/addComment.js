const fs = require('file-system'),
      shortId = require('shortid'),
      usersList = './users.json',
      commentsList = './comments.json';

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

module.exports = (req, res) => {
    setTimeout(() => {
        if (!req.headers['cookie']) {
            res.sendStatus(401);
        } else {
            const parsedUsersList = getUsersFromDB(),
                  parsedCommentsList = getCommentsFromDB(),
                  comment = req.body,
                  receivedCookie = req.headers['cookie'];
            // checke for valid cookie
            let cookieUserID, cookieUserAuthKey, cookieUserType;
            if (receivedCookie) {
                cookieUserID = receivedCookie.split('; ').find(item => item.startsWith('userID')).replace('userID=', '');
                cookieUserAuthKey = receivedCookie.split('; ').find(item => item.startsWith('userAuthKey')).replace('userAuthKey=', '');
                cookieUserType = receivedCookie.split('; ').find(item => item.startsWith('userType')).replace('userType=', '');
            } else {
                res.sendStatus(403);
            }
            if (parsedUsersList.find(item => {
                currentUserID = item.userID;
                currentUserType = item.userType;
                return item.userAuthKey && cookieUserAuthKey && item.userID === cookieUserID && item.userAuthKey === cookieUserAuthKey && Date.parse(item.userAuthKeyValidUntil) > Date.now() && cookieUserType === item.userType && (item.userType === 'admin' || item.userType === 'user');
            })) {
                comment.commentID = `${shortId.generate()}${shortId.generate()}${shortId.generate()}`;
                comment.commentCreationDate = new Date(Date.now());
                parsedCommentsList.push(comment);
                // update user last online date
                let newUsersList = parsedUsersList.map(user => {
                    if (user.userID === currentUserID) {
                        user.userLastOnlineDate = new Date(Date.now());
                        return user;
                    }
                    return user;
                });
                setUsersToDB(newUsersList);
                
                setCommentsToDB(parsedCommentsList);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }
    }, 2000);
}