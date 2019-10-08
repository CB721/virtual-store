import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import IconButton from '@material-ui/core/IconButton';
import Button from "../components/Button";
import Form from "../components/Form";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import "./Assets/style.css";

class Contact extends Component {
    state = {

    }

    goToTwitter() {
        window.location.href = "https://twitter.com";
    }
    goToFacebook() {
        window.location.href = "https://facebook.com";
    }
    goToInstagram() {
        window.location.href = "https://instagram.com";
    }
    goToYouTube() {
        window.location.href = "https://youtube.com";
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col size="md-2" />
                        <Col size="md-8">
                            <h1 className="purple q-top-pad">
                                Submit a request
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col size="md-2" />
                        <Col size="md-8">
                            <Form
                                button={<Button
                                    buttonClass="explore"
                                    text="Submit"
                                />}
                            />
                        </Col>
                    </Row>
                    <div className="social-media">
                        <Row>
                            <Col size="md-2" />
                            <Col size="md-8">
                                <h3 className="white f-top-pad center">
                                    Connect with us on social media
                            </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col size="md-1" />
                            <Col size="md-2">
                                <IconButton onClick={this.goToTwitter} aria-label="twitter">
                                    <TwitterIcon
                                        fontSize="large"
                                    />
                                </IconButton>
                            </Col>
                            <Col size="md-1" />
                            <Col size="md-2">
                                <IconButton onClick={this.goToFacebook} aria-label="facebook">
                                    <FacebookIcon
                                        fontSize="large"
                                    />
                                </IconButton>
                            </Col>
                            <Col size="md-1" />
                            <Col size="md-2">
                                <IconButton onClick={this.goToInstagram} aria-label="instagram">
                                    <InstagramIcon
                                        fontSize="large"
                                    />
                                </IconButton>
                            </Col>
                            <Col size="md-1" />
                            <Col size="md-2">
                                <IconButton onClick={this.goToYouTube} aria-label="youtube">
                                    <YouTubeIcon
                                        fontSize="large"
                                    />
                                </IconButton>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col size="md-6">
                            <img src="https://images.unsplash.com/photo-1562185000-12e4f02e2020?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="call center"></img>
                        </Col>
                        <Col size="md-6">
                            <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="customer service"></img>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Contact;