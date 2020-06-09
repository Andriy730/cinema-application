import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../style/components/header.scss';
import { baseUrl } from '../shared/BaseUrl';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isDropdownOpen: false
        }

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleMenu() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        });
    }

    logout() {
        this.props.logoutUser();
    }

    render() {

        const RenderRightPart = (user) => {
            user = user.user;
            if(user != null) {
                return(
                    <Nav className="ml-auto mr-3" navbar>
                        <NavItem>
                            <Dropdown isOpen={this.state.isDropdownOpen} size="lg" toggle={this.toggleMenu}>
                                <DropdownToggle tag="a" className="login" caret>
                                    {user.username}<img className="user-icon" src={baseUrl + "images/user-icon.png"} height="30" width="30" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <NavLink to="/user">Profile</NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem tag="div">
                                        <Button onClick={() => this.logout()}>Logout</Button>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                    </Nav>
                );
            }
            else {
                return(
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="nav-link login" to="/login">
                                Sign in<img className="user-icon" src={baseUrl + "images/user-icon.png"} height="30" width="30" />
                            </NavLink>
                        </NavItem>
                    </Nav>
                );
            }
        }

        return(
            <Navbar dark expand="lg">
                <NavbarToggler onClick={this.toggleNav} />
                <NavbarBrand className="col-4 col-md-1 mr-auto" href="/">
                    Cinema
                </NavbarBrand>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem className="mr-lg-4">
                            <NavLink className="nav-link" to="/home">
                                Зараз у кіно
                            </NavLink>
                        </NavItem>
                        <NavItem className="mr-lg-4">
                            <NavLink className="nav-link" to="/soon">
                                Скоро у прокаті
                            </NavLink>
                        </NavItem>
                        <NavItem className="mr-lg-4">
                            <NavLink className="nav-link" to="/contacts">
                                Контакти
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <RenderRightPart user={this.props.user} />
                </Collapse>                
            </Navbar>
        );
    }
}

export default Header;