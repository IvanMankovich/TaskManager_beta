import requestStarted from './requestStatus/requestStarted';
import requestSuccess from './requestStatus/requestSuccess';
import requestFailed from './requestStatus/requestFailed';
import requestFinished from './requestStatus/requestFinished';
import requsetDefault from './requestStatus/requestDefault';

import getTasksList from './requsetsTypes/getTasksList';
import getInfo from './requsetsTypes/getInfo';
import addTask from './requsetsTypes/addTask';
import removeTask from './requsetsTypes/removeTask';
import changeTaskStatus from './requsetsTypes/changeTaskStatus';
import getTask from './requsetsTypes/getTask';
import updateTask from './requsetsTypes/updateTask';
import signIn from './requsetsTypes/signIn';
import logIn from './requsetsTypes/logIn';
import logOut from './requsetsTypes/logOut';
import getUserInfo from './requsetsTypes/getUserInfo';
import getUsersList from './requsetsTypes/getUsersList';
import addComment from './requsetsTypes/addComment';
import rateTask from './requsetsTypes/rateTask';
import getCommonStat from './requsetsTypes/getCommonStat';
import getTaskFromArchive from './requsetsTypes/getTaskFromArchive';

import setTasksList from './handleData/setTasksList';
import setTask from './handleData/setTask';
import setTasksListClearTask from './handleData/setTasksListClearTask';
import setTaskClearTasksList from './handleData/setTaskClearTasksList';
import setUsersList from './handleData/setUsersList';
import setDataDefault from './handleData/setDataDefault';

import modalRequestStarted from './modalRequestStatus/modalRequestStarted';
import modalRequestSuccess from './modalRequestStatus/modalRequestSuccess';
import modalRequestFailed from './modalRequestStatus/modalRequestFailed';
import modalRequestFinished from './modalRequestStatus/modalRequestFinished';
import modalDefault from './modalRequestStatus/modalDefault';

import userLoggedIn from './handlingUserData/userLoggedIn';
import userLoggedOut from './handlingUserData/userLoggedOut';

const requestStage = {
    requestStarted: requestStarted,
    requestSuccess: requestSuccess,
    requestFailed: requestFailed,
    requestFinished: requestFinished,
    requsetDefault: requsetDefault,
};

const requsetsTypes = {
    getTasksList: getTasksList,
    getInfo: getInfo,
    addTask: addTask,
    removeTask: removeTask,
    changeTaskStatus: changeTaskStatus,
    getTask: getTask,
    updateTask: updateTask,
    signIn: signIn,
    logIn: logIn,
    logOut: logOut,
    getUsersList: getUsersList,
    getUserInfo: getUserInfo,
    addComment: addComment,
    rateTask: rateTask,
    getCommonStat: getCommonStat,
    getTaskFromArchive: getTaskFromArchive,
}

const modalRequestStage = {
    modalRequestStarted: modalRequestStarted,
    modalRequestSuccess: modalRequestSuccess,
    modalRequestFailed: modalRequestFailed,
    modalRequestFinished: modalRequestFinished,
    modalDefault: modalDefault,
};

const handleData = {
    setTask: setTask,
    setTasksList: setTasksList,
    setTaskClearTasksList: setTaskClearTasksList,
    setTasksListClearTask: setTasksListClearTask,
    setUsersList: setUsersList,
    setDataDefault: setDataDefault,
}

const handlingUserData = {
    userLoggedIn: userLoggedIn,
    userLoggedOut: userLoggedOut,
}


export { requestStage, requsetsTypes, handleData, modalRequestStage, handlingUserData };