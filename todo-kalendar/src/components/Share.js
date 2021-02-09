import React, { Component } from 'react'
import {Modal, Form, Button, Row, Col} from 'react-bootstrap'
import EventService from '../services/EventService'
import ToastAlert from '../components/ToastAlert'

export default class Share extends Component {

    state={
        eventService:new EventService(),
        shareCode:"",
        showAlert:false
    }

    async componentDidMount(){
        this.state.eventService.setUserInfo(this.props.userInfo)
        let shareCode = await this.state.eventService.shareEvent(this.props.eventToShare)
        this.setState({shareCode:shareCode})
    }

    onShow = async () => {
        let shareCode = await this.state.eventService.shareEvent(this.props.eventToShare)
        this.setState({shareCode:shareCode})
    }

    kopiraj = ()=>{
        let sc = document.getElementById("shareCodeLabel")
        sc.select() 
        document.execCommand('copy')
        this.setState({showAlert:true})
        this.props.closeModal('share')
    }

    render() {
        return (
            <div>
                <ToastAlert 
                    message = "Kod za dijeljenje kopiran u clipboard."
                    onCloseToast = {() => this.setState({showAlert:false})}
                    show = {this.state.showAlert}
                    />
                <Modal show = {this.props.show}
                    onShow = {() => this.onShow()}
                >
                    <Form.Group>
                        <Row>
                            <Form.Label className='prompt' style = {{marginLeft:'15px'}}>Kod za dijeljenje:</Form.Label>
                        </Row>
                        <Row>
                        <textarea 
                            style = {{
                                height:'40px',
                                width:'100%',
                                display:'block',
                                resize:'none',
                                fontSize:'20px',
                                marginRight:'15px',
                                marginLeft:'15px'
                            }} 
                            readOnly id = "shareCodeLabel" 
                            value={this.state.shareCode}></textarea>
                        </Row>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button block onClick = {() => this.props.closeModal('share')}>Nazad</Button>
                        </Col>
                        <Col>
                            <Button block disabled={this.state.shareCode===""} onClick={()=>this.kopiraj()}>Kopiraj</Button>
                        </Col>
                        
                    </Row>
                </Modal>
            </div>
        )
    }
}
