import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contacts extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log("Feedback: " + JSON.stringify(values));
        this.props.resetFeedbackForm();
    }

    render() {
        return(
            <div className="container feedback">
                <Row>
                    <div className="col-12 mb-2">
                        <h3>Надішліть нам свій відгук</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={3}>Ваше ім'я</Label>
                                <Col md={9}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="Ваше ім'я"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                    <Errors 
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: "Це поле є обов'язковим ",
                                            minLength: "Повинно бути не менше 2 символів ",
                                            maxLength: "Повинно бути не більше 15 символів"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={3}>Ваше прізвище</Label>
                                <Col md={9}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Ваше прізвище"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: "Це поле є обов'язковим ",
                                            minLength: 'Повинно бути не менше 2 символів ',
                                            maxLength: 'Повинно бути не більше 15 символів'
                                        }}
                                    />  
                                </Col>                        
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={3}>Номер телефону</Label>
                                <Col md={9}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Номер телефону"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: "Це поле є обов'язковим ",
                                            minLength: 'Повинно бути не менше 2 символів ',
                                            maxLength: 'Повинно бути не більше 15 символів ',
                                            isNumber: 'Номер повинен містити лише цифри'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={3}>Email</Label>
                                <Col md={9}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }} />
                                        <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: "Це поле є обов'язковим ",
                                            validEmail: 'Неправильно вказаний Email'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 5, offset: 3}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input" /> {' '}
                                            <strong>Чи можна з вами?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control" >
                                        <option>Телефон</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={3}>Ваш Відгук</Label>
                                <Col md={9}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12" 
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 9, offset: 3}}>
                                    <Button type="submit" color="primary">
                                        Надіслати Відгук
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Row>
            </div>
        )
    }
}

export default Contacts;