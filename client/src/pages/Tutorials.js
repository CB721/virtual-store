import React, { Component } from "react";
import ReactPlayer from 'react-player';
import { Col, Row, Container } from "../components/Grid";

class Tutorials extends Component {
    state = {
        playing: false,
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col size="md-12">
                            <h5>
                                Tutorial Videos
                            </h5>
                        </Col>
                    </Row>
                    <div className="tutorial-videos">
                        <Row>
                            <Col size="md-1" />
                            <Col size="md-4">
                                <div className="video">
                                    <ReactPlayer
                                        url='https://www.youtube.com/watch?v=hU5XhG5Ywbk&t=3s'
                                        playing={this.state.playing}
                                        width="100%"
                                        height="75%"
                                    />
                                    <h6>
                                        Logic Pro X Setup
                                    </h6>
                                </div>

                            </Col>
                            <Col size="md-2" />
                            <Col size="md-4">
                            <div className="video">
                                    <ReactPlayer
                                        url='https://www.youtube.com/watch?v=qMaVhqSsPcE'
                                        playing={this.state.playing}
                                        width="100%"
                                        height="75%"
                                    />
                                    <h6>
                                        Vocal Recording
                                    </h6>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col size="md-1" />
                            <Col size="md-4">
                                <div className="video">
                                    <ReactPlayer
                                        url='https://www.youtube.com/watch?v=5jTsSvkBv60'
                                        playing={this.state.playing}
                                        width="100%"
                                        height="75%"
                                    />
                                    <h6>
                                        Tune Your Guitar
                                    </h6>
                                </div>

                            </Col>
                            <Col size="md-2" />
                            <Col size="md-4">
                            <div className="video">
                                    <ReactPlayer
                                        url='https://www.youtube.com/watch?v=E51zYgMSRb0'
                                        playing={this.state.playing}
                                        width="100%"
                                        height="75%"
                                    />
                                    <h6>
                                        Mic A Guitar Amp
                                    </h6>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col size="md-1" />
                            <Col size="md-4">
                                <div className="video">
                                    <ReactPlayer
                                        url='https://www.youtube.com/watch?v=dqNdnxpCmSI'
                                        playing={this.state.playing}
                                        width="100%"
                                        height="75%"
                                    />
                                    <h6>
                                        Intro to EQ
                                    </h6>
                                </div>

                            </Col>
                            <Col size="md-2" />
                            <Col size="md-4">
                            <div className="video">
                                    <ReactPlayer
                                        url='https://www.youtube.com/watch?v=oBK2re5wRmE'
                                        playing={this.state.playing}
                                        width="100%"
                                        height="75%"
                                    />
                                    <h6>
                                        DJ Controller Review
                                    </h6>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Tutorials;