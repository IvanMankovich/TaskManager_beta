import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loading from './Loading';
import { requsetsTypes } from '../../actions';

export default function About(props) {
    const fetched = props.fetched,
          fetching = props.fetching,
          error = props.error;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requsetsTypes.getInfo());
    }, [dispatch])

    if (fetched && !fetching && !error) {
        document.title = 'About || TaskManager';
        return (
            <React.Fragment>
                <h2 className='text-center'>About TaskManager</h2>
                <h3>Motivation</h3>
                <p>TaskManager application is primitive CMS which can be used in different relations like manager/worker or teacher/student. There are two types of user with two different possibilities:</p>
                <ul>
                    <li>administrator
                        <ul>
                            <li>can create, edit or remove content</li>
                            <li>can get user statistic and statistic on current and completed tasks</li>
                            <li>can control task executing by data (task header color depends on status)</li>
                            <li>can rate tasks on completing</li>
                            <li>can comment current tasks</li>
                            <li>can check archive tasks and comments to them</li>
                            <li>can create and remove any type of user (<i>in extended version</i>)</li>
                            <li>can make an attachments to tasks and comments (<i>in extended version</i>)</li>
                            <li>can get extended statistic on tasks and users (<i>in extended version</i>)</li>
                            <li>can remove comments (<i>in extended version</i>)</li>
                        </ul>
                    </li>
                    <li>user
                        <ul>
                            <li>can comlpete own tasks</li>
                            <li>can comment current own tasks</li>
                            <li>can check archive own tasks and comments to them</li>
                            <li>can get own statistic</li>
                            <li>can make an attachments to comments (<i>in extended version</i>)</li>
                            <li>can remove comments (<i>in extended version</i>)</li>
                        </ul>
                    </li>
                </ul>
                <p>This app was created with the aims to improve tech skills (like React, Redux, Node.js) and to learn registration, authorization and authentication process by my own. If you have some comments or some proposals, please, let me know about it (see contacts below). I'll be grateful for any constructive criticism and suggestions.</p>
                <h3>Known bugs/weaknesses</h3>
                    <ul>
                        <li>authorization key expiration</li>
                        <li>server requsets handling not optimized</li>
                        <li>redux-store structure</li>
                        <li>redux-actions code duplication</li>
                        <li>react-component code duplication</li>
                        <li>no posibility to create new admin or remove user</li>
                        <li>no posibility to sort task list, comments and user list by selected params</li>
                    </ul>
                <h3>Used technologies:</h3>
                <ul>
                    <li>Frontend
                        <ul>
                            <li>ES6</li>
                            <li>React (Hooks)</li>
                            <li>Redux</li>
                            <li>React-Router</li>
                            <li>Thunk</li>
                            <li>Bootstrap 4/React-Bootstrap</li>
                            <li>FetchAPI</li>
                        </ul>
                    </li>
                    <li>Backend
                        <ul>
                            <li>Node.js</li>
                            <li>Express</li>
                        </ul>
                    </li>
                </ul>
                <h3>Contacts</h3>
                    <ul>
                        <li><a href='https://www.linkedin.com/in/ivan-mankovich/' title=''>LinkedIn</a></li>
                        <li><a href='mailto:mankovich.ivan@gmail.com'>Mail</a></li>
                    </ul>
            </React.Fragment>
        );
    } else if (fetched && !fetching && error) {
        document.title = 'About | Error | TaskManager';
        return (
            <React.Fragment>
                <main className='container bg-light flex-fill'>
                    <h2>Error.</h2>
                    <p>{error}</p>
                    <a className='text-muted' href='/'>Go to start page.</a>
                </main>
            </React.Fragment>
        )
    } else {
        document.title = 'About | Loading | TaskManager';
        return (
            <Loading />
        )
    }
}