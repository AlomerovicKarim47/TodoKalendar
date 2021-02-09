import React, { Component } from 'react'
import {Modal, Form, Button, Row, Col} from 'react-bootstrap'

export default class Import extends Component {
    state = {
        importCode:"",
        showAlert:false,
        error:""
    }

    errorStyle = {color:'red', fontSize:'15px'}
    render() {
        return (
            <div>
                
                <Modal
                    show = {this.props.show}>
                        <Form.Group>
                    <Form.Label className='prompt'>Zalijepite import kod:</Form.Label>
                    <Form.Control type="text" onChange={(e)=>this.setState({importCode:e.target.value})}/>
                    <Form.Label style = {this.errorStyle} hidden = {this.state.error === ""}>{this.state.error}</Form.Label>
                    </Form.Group>
                    <Row>
                            <Col>
                                <Button block onClick = {() => {
                                    this.props.closeModal("import"); 
                                    this.setState({importCode:"", error: ""})}}>Nazad</Button> 
                            </Col>
                            <Col>
                                <Button block onClick = {() => {
                                    if (this.state.importCode === "")
                                    {
                                        this.setState({error:"Ovo polje je obavezno."})
                                        return
                                    }
                                    this.props.onImport(this.state.importCode); 
                                    this.setState({importCode:"", showAlert:true}); 
                                    this.props.closeModal("import")}}>Importuj</Button>
                            </Col>
                            
                    </Row>
                </Modal>
            </div>
        )
    }
}
