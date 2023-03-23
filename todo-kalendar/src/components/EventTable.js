import Timetable from 'react-timetable-events'
import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import Event from './Event'
import '../css/EventTable.css'

export default class EventTable extends Component {
    
    state = {
        dani:[]
    }

    handleResize = ()=>{  
        let dani = new Map()
        let windowSize = window.innerWidth;
        let condition = windowSize > 900;
        dani['Monday']=condition?'ponedjeljak':'pon'
        dani['Tuesday']=condition?'utorak':'uto'
        dani['Wednesday']=condition?'srijeda':'sri'
        dani['Thursday']=condition?'cetvrtak':'cet'
        dani['Friday']=condition?'petak':'pet'
        dani['Saturday']=condition?'subota':'sub'
        dani['Sunday']=condition?'nedjelja':'ned'
        this.setState({dani:dani})
    }

    dayAppend = (e) => { 
        if (window.innerWidth > 768) return
        let dani = new Map()
        dani['pon']='ponedjeljak';
        dani['uto']='utorak';
        dani['sri']='srijeda';
        dani['cet']='cetvrtak'; 
        dani['pet']='petak';
        dani['sub']='subota';
        dani['ned']='nedjelja';
        let element = e.target;
        let expansion = document.createElement("div")
        expansion.className = "day-label-expansion"
        expansion.innerHTML = `<span>${element.dataset.datum}</span>
                                <span>(${dani[element.dataset.dan]})</span>`;
        element.appendChild(expansion)
    }
    dayRemove = (e) => {
        if (window.innerWidth > 768) return
        let element = e.target;
        element.removeChild(element.lastChild)
    }

    addDayListeners(){
        let days = document.getElementsByClassName("day-label") 
        Array.prototype.forEach.call(days, (day) => {
            day.addEventListener("mouseenter", this.dayAppend)
            day.addEventListener("mouseleave", this.dayRemove)
        })
    }

    removeDayListeners(){
        let days = document.getElementsByClassName("day-label") 
        Array.prototype.forEach.call(days, (day) => {
            day.removeEventListener("mouseenter", this.dayAppend)
            day.removeEventListener("mouseleave", this.dayRemove)
        })
    }

    componentDidMount(){
        this.addDayListeners()
        window.addEventListener("resize", this.handleResize)
        this.handleResize()
    }

    componentDidUpdate(){
        this.addDayListeners()
    }

    componentWillUnmount(){
        this.removeDayListeners()
        window.removeEventListener("resize", this.handleResize)
    }

    renderDayLabel = (day) => {
        let data = day.split(" ")
        let datum = data[0].split("-")
        return <div className = "day-label" data-dan = {this.state.dani[data[1]]} data-datum = {datum[2] + "/" + datum[1] + "/" + datum[0]}>
                    <span>{(window.innerWidth > 768?datum[2] + "/" + datum[1] + "/" + datum[0]:"")}</span>
                    <span>{" (" + this.state.dani[data[1]] + ")"}</span>
                </div>
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

