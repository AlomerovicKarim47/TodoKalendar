import React, { Component } from 'react'
import {Button, Modal, Form, Col, Row} from 'react-bootstrap'

export default class Dane extends Component {
    render() {
        return (
            
                <Modal show = {this.props.show}>
                    <Row>
                        <Form.Group>
                            <Form.Label style = {{padding:'20px'}}>{this.props.text}</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <Button 
                            id = "nobutton"
                            block onClick = {() => this.props.closeModal('yesno')}>Ne</Button>
                        </Col>
                        <Col>
                            <Button 
                                id = "yesbutton"
                                block onClick = {() => {
                                this.props.action()
                                this.props.closeModal('yesno')
                            }}>Da</Button>
                        </Col>
                    </Row>

                </Modal>
            
        )
    }
}
