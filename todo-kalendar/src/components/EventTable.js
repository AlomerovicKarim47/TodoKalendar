import Timetable from 'react-timetable-events'
import React, { Component } from 'react'
import {Button, Container, Row, Col} from 'react-bootstrap'
import Event from './Event'

export default class EventTable extends Component {
    
    state = {
        dani:null
    }

    componentDidMount(){
        let dani = new Map()
        dani['Monday']='ponedjeljak'
        dani['Tuesday']='utorak'
        dani['Wednesday']='srijeda'
        dani['Thursday']='cetvrtak'
        dani['Friday']='petak'
        dani['Saturday']='subota'
        dani['Sunday']='nedjelja'
        this.setState({dani:dani})
    }

    renderDayLabel = (day) => {
        let data = day.split(" ")
        let datum = data[0].split("-")
        return datum[2] + "/" + datum[1] + "/" + datum[0]  + " (" + this.state.dani[data[1]] + ")"
    }

    renderEvent = (event, defaultAttributes, styles) => {
        return (<Event
                    key = {event.id} 
                    event = {event}
                    styles = {styles}
                    defaultAttributes = {defaultAttributes}
                    onSelectEvent = {(id) => this.props.onSelectEvent(id)}
                    onCheck = {(id) => this.props.onCheck(id)}
                    eventToGoTo = {this.props.eventToGoTo}
                    clearEvent = {this.props.clearEvent}
                />)
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col style={{paddingLeft:'0px', paddingRight: '5px'}}>
                            <Button block onClick = {() => this.props.onDatumNazad()}>Nazad</Button>
                        </Col>
                        <Col style={{paddingRight:'0px', paddingLeft: '5px'}} >
                            <Button block onClick = {() => this.props.onDatumNaprijed()}>Naprijed</Button>
                        </Col>
                        </Row>
                </Container>
                
                <Timetable 
                    events = {this.props.events}
                    timeLabel = "Vrijeme"
                    hoursInterval = {[0, 24]}
                    getDayLabel = {this.renderDayLabel}
                    renderEvent = {this.renderEvent}
                />
                
            </div>
        )
    }
}

