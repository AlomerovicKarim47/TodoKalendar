import React, { Component } from 'react'
import {Form,  Col,  Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import EventService from '../services/EventService'
import SearchResult from '../components/SearchResult'
import ToastAlert from '../components/ToastAlert'

export default withRouter(class Search extends Component {
    state = {
        searchTerm:"",
        searchResults:[],
        eventService:new EventService(),
        showAlert:false
    }

    componentDidMount(){
        if (this.props.userInfo)
            this.state.eventService.setUserInfo(this.props.userInfo)
    }

    onPretrazi = async() => {
        try {
            let es = this.state.eventService
            let evData = await es.searchEvents(this.state.searchTerm)
            this.setState({searchResults:evData.data, showAlert:true})
        } catch (error) {
            this.setState({searchResults:[], showAlert:true})
        }
        
    }

    render() {
        if (!this.props.userInfo) return (<div>Unauthorized.</div>)
        return (
            <div style = {{padding:'10px', paddingTop:'0px'}}>
                <ToastAlert 
                    message = {"Pretraga gotova."}
                    onCloseToast = {() => this.setState({showAlert:false})}
                    show = {this.state.showAlert}
                    />
                <Form >
                    <Form.Row>
                        <Col xs = "auto">
                            <Button
                                onClick={() => {
                                    this.props.history.push("/home")
                                    this.props.goToEvent(null)
                                    }}>Nazad</Button>
                        </Col>
                        <Col>
                            <Form.Control placeholder = "Pretraga po nazivu" value={this.state.searchTerm} onChange={(e) => this.setState({searchTerm:e.target.value})}/>
                        </Col>
                        <Col xs = "auto">
                            <Button
                                onClick = {() => this.onPretrazi()}>Pretraži</Button>
                        </Col>
                    </Form.Row>
                </Form>
                {this.state.searchResults.map((event, i) => {
                    return (<SearchResult key = {i} event = {event} goToEvent = {(ev) => this.props.goToEvent(ev)}/>)
                })}
                <Form.Label style = {{padding:'10px'}} hidden={this.state.searchResults.length != 0}>{"Nema rezultata."}</Form.Label>
            </div>
        )
    }
})
