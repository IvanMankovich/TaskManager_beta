import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import parseUrl from '../utils/parseUrl';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Header.css';

export default function Header(props) {
    let url = parseUrl();

    const userName = props.user.userName, 
          userType = props.user.userType;

    const { showModal } = props;

    switch (true) {
        case (userType === 'admin'):
            // admin
            return (
                <React.Fragment>
                    <header className='navbar navbar-expand-sm bg-dark navbar-light justify-content-center'>
                        <Navbar className='container' collapseOnSelect expand='lg' variant='dark'>
                            <Navbar.Brand href='/'>Task Manager</Navbar.Brand>
                            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                            <Navbar.Collapse id='responsive-navbar-nav'>
                                <Nav className='mr-auto'>
                                    <Nav.Link href='/about' className={url === '/about' ? 'nav-item active' : 'nav-item'}>About</Nav.Link>
                                    <Nav.Link href='/tasks' className={url === '/tasks' ? 'nav-item active' : 'nav-item'}>Tasks</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Navbar.Text className='pr-1'>
                                        Signed in as:
                                    </Navbar.Text>
                                    <DropdownButton
                                        alignRight
                                        title={userName}
                                        id='dropdown-menu-align-right'
                                        variant='dark'
                                        >
                                        <a className='dropdown-item-custom' role='button' href='/tasks'>Tasks</a>
                                        <a className='dropdown-item-custom' role='button' href='/users'>Users</a>
                                        <a className='dropdown-item-custom' role='button' href='/statistic'>Statistic</a>
                                        <Dropdown.Divider />
                                        <div className='dropdown-item-custom' role='button' onClick={() => showModal('logOut')} >Log out</div>
                                    </DropdownButton>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </header>
                </React.Fragment>
            )
        
        case (userType === 'user'):
            // auth common user
            return (
                <React.Fragment>
                    <header className='navbar navbar-expand-sm bg-dark navbar-light justify-content-center'>
                        <Navbar className='container' collapseOnSelect expand='lg' bg='dark' variant='dark'>
                            <Navbar.Brand href='/'>Task Manager</Navbar.Brand>
                            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                            <Navbar.Collapse id='responsive-navbar-nav'>
                                <Nav className='mr-auto'>
                                    <Nav.Link href='/about' className={url === '/about' ? 'nav-item active' : 'nav-item'}>About</Nav.Link>
                                    <Nav.Link href='/tasks' className={url === '/tasks' ? 'nav-item active' : 'nav-item'}>Tasks</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Navbar.Text className='pr-1'>
                                        Signed in as:
                                    </Navbar.Text>
                                    <DropdownButton
                                        alignRight
                                        title={userName}
                                        id='dropdown-menu-align-right'
                                        variant='dark'
                                        >
                                        <a className='dropdown-item-custom' role='button' href='/tasks'>Tasks</a>
                                        <a className='dropdown-item-custom' role='button' href='/statistic'>Statistic</a>
                                        <Dropdown.Divider />
                                        <div className='dropdown-item-custom' role='button' onClick={() => showModal('logOut')} >Log out</div>
                                    </DropdownButton>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </header>
                </React.Fragment>
            )

        default:
            // unk
            return (
                <React.Fragment>
                    <header className='navbar navbar-expand-sm bg-dark navbar-light justify-content-center'>
                        <Navbar className='container' collapseOnSelect expand='lg' bg='dark' variant='dark'>
                            <Navbar.Brand href='/'>Task Manager</Navbar.Brand>
                            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                            <Navbar.Collapse id='responsive-navbar-nav'>
                                <Nav className='mr-auto'>
                                    <Nav.Link href='/about' className={url === '/about' ? 'nav-item active' : 'nav-item'}>About</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Nav.Link onClick={() => showModal('logIn')} >Log in</Nav.Link>
                                    <Nav.Link onClick={() => showModal('signIn')} >Sign in</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </header>
                </React.Fragment>
            )
    }
}