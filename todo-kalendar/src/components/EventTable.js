import Timetable from 'react-timetable-events'
import React, { Component } from 'react'
import {Button, Container, Row, Col} from 'react-bootstrap'
import Event from './Event'
import '../css/EventTable.css'

export default class EventTable extends Component {
    
    state = {
        dani:[]
    }

    handleResize = ()=>{
        let dani = new Map()
        let windowSize = window.innerWidth;
        let condition = windowSize > 768;
        dani['Monday']=condition?'ponedjeljak':'pon'
        dani['Tuesday']=condition?'utorak':'uto'
        dani['Wednesday']=condition?'srijeda':'sri'
        dani['Thursday']=condition?'cetvrtak':'cet'
        dani['Friday']=condition?'petak':'pet'
        dani['Saturday']=condition?'subota':'sub'
        dani['Sunday']=condition?'nedjelja':'ned'
        this.setState({dani:dani})
    }

    componentDidMount(){
        window.addEventListener("resize", this.handleResize)
        this.handleResize()
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.handleResize)
    }

    renderDayLabel = (day) => {
        let data = day.split(" ")
        let datum = data[0].split("-")
        return (window.innerWidth > 768?datum[2] + "/" + datum[1] + "/" + datum[0]:"")  
        + " (" + this.state.dani[data[1]] + ")"
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
                
                <div className = "event-table-buttons">
                    <Button block onClick = {() => this.props.onDatumNazad()}>Nazad</Button>
                    <Button block onClick = {() => this.props.onDatumNaprijed()}>Naprijed</Button>
                </div>
            
                <Timetable 
                    timeLabel = "Vrijeme"
                    events = {this.props.events}
                    hoursInterval = {[0, 24]}
                    getDayLabel = {this.renderDayLabel}
                    renderEvent = {this.renderEvent}
                />
                
            </div>
        )
    }
}

