import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { modalRequestStage } from './../actions'

import Tasks from '../components/main/Tasks';
import About from './../components/main/About';
import WelcomePage from './../components/main/WelcomePage';
import Err from './../components/main/Err';
import Task from './../components/main/Task';
import Users from './../components/main/Users';
import UserInfo from './../components/main/UserInfo';
import Statistic from './../components/main/Statistic';
import ArchivedTask from './../components/main/ArchivedTask';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

function App() {
    const fetched = useSelector(state => state.request.fetched),
          fetching = useSelector(state => state.request.fetching),
          error = useSelector(state => state.request.error),
          user = useSelector(state => state.user),
          usersList = useSelector(state => state.data.usersList),
          tasksList = useSelector(state => state.data.tasksList),
          task = useSelector(state => state.data.task);

    const [modalType, setModalType] = useState(null),
          [modalIsOpen, setModalIsOpen] = useState(false);

    const dispatch = useDispatch();

    const closeModal = () => {
        setModalIsOpen(false);
        dispatch(modalRequestStage.modalDefault());
    };

    const showModal = (type) => {
        setModalType(type);
        setModalIsOpen(true);
    };

    return (
        <React.Fragment>
            <Header fetched={fetched} fetching={fetching} error={error} user={user} showModal={showModal} />
            <main className='container bg-light flex-fill py-2'>
                <Switch>
                    <Route exact path='/'>
                        <WelcomePage fetched={fetched} fetching={fetching} error={error} user={user} showModal={showModal} />
                    </Route>
                        
                    <Route exact path='/tasks'>
                        <Tasks fetched={fetched} fetching={fetching} error={error} tasksList={tasksList} user={user} usersList={usersList} />
                    </Route>

                    <Route exact path='/users'>
                        <Users fetched={fetched} fetching={fetching} error={error} tasksList={tasksList} user={user} usersList={usersList} />
                    </Route>

                    <Route exact path='/user/:userID'>
                        <UserInfo fetched={fetched} fetching={fetching} error={error} tasksList={tasksList} task={task} user={user} usersList={usersList} />
                    </Route>

                    <Route exact path='/statistic'>
                        <Statistic fetched={fetched} fetching={fetching} error={error} tasksList={tasksList} task={task} user={user} usersList={usersList} />
                    </Route>
                    
                    <Route exact path='/about'>
                        <About fetched={fetched} fetching={fetching} error={error} />
                    </Route>
    
                    <Route exact path='/task/:taskID'>
                        <Task fetched={fetched} fetching={fetching} error={error} tasksList={tasksList} task={task} user={user} usersList={usersList} />
                    </Route>

                    <Route exact path='/archive/:taskID'>
                        <ArchivedTask fetched={fetched} fetching={fetching} error={error} tasksList={tasksList} task={task} user={user} usersList={usersList} />
                    </Route>

                    <Route path='*'>
                        <Err fetched={fetched} fetching={fetching} error={error} />
                    </Route>
                </Switch>
            </main>
            <Footer />
            {modalIsOpen ? <Modal modalType={modalType} closeModal={closeModal} /> : null}
        </React.Fragment>
    )
}

export default App;