import React, { Component } from 'react';
import { Row, Label, Button } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/BaseUrl';
import '../style/components/login.scss'
import { Redirect } from 'react-router-dom';

const required = (val) => val && val.length;

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.loginUser(values);
        this.props.resetLoginForm();
    }

    render() {
        if(this.props.user) {
            return(
                <Redirect to="/home" />
            );
        }
        else {
            return(
                <div className="container">
                    <Row className="mx-auto login-form py-4">
                        <div className="offset-4 pl-md-4">
                            <img src={baseUrl + "images/login-icon.png"} className="d-flex img-fluid" alt="login-icon" />
                        </div>
                        <Form model="login" onSubmit={(values) => this.handleSubmit(values)} >
                            <Row className="form-group mx-5">
                                <Label htmlFor="username" className="ml-md-3">Ім'я користувача</Label>
                                <div className="input-group">
                                    <div className="input-group-addon ml-md-3">
                                        <i className="fa fa-user fa-lg icon"></i>
                                    </div>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="Ім'я користувача"
                                        className="form-control mr-md-3"
                                        validators={{
                                            required
                                        }} />
                                </div>
                                <Errors
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: "Це поле є обов'язковим"
                                        }} />
                            </Row>
                            <Row className="form-group mx-5">
                                <Label htmlFor="password" className="ml-md-3">Пароль</Label>
                                <div className="input-group">
                                    <div className="input-group-addon ml-md-3">
                                        <i className="fa fa-lock fa-lg icon"></i>
                                    </div>
                                    <Control.password model=".password" id="password" name="password"
                                        placeholder="Пароль"
                                        className="form-control mr-md-3"
                                        validators={{
                                            required
                                        }} />
                                </div>
                                <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: "Це поле є обов'язковим"
                                        }} />
                            </Row>
                            <Row className="form-group py-3">
                                <Button type="submit" className="login-button mx-auto">
                                    Вхід
                                </Button>
                            </Row>
                        </Form>
                    </Row>
                </div>
            );
        }
    }
}

export default Login;