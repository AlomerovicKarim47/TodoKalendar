import React, { Component } from 'react'
import {Overlay} from 'react-bootstrap'
import moment from 'moment'

export default class Event extends Component {
    state = {
        selected:false,
        checked:false,
        hovered: false
    }

    handleClickOutside = (event)=>{
        const domNode = document.getElementById("event"+this.props.event.id)
        const deleteButton = document.getElementById('deleteButton')
        const editButton = document.getElementById('editButton')
        const shareButton = document.getElementById('shareButton')
        const yesButton = document.getElementById('yesbutton')

        if (!domNode || !domNode.contains(event.target))
        {
            //if (!deleteButton.contains(event.target) && (!noButton || !noButton.contains(event.target)))
                this.setState({selected:false})
        }
        
        if (!deleteButton.contains(event.target) && !editButton.contains(event.target) && !shareButton.contains(event.target) &&(!yesButton || !yesButton.contains(event.target)) )
            this.props.onSelectEvent(null)
        
    }

    componentDidMount(){
        let selected = this.state.selected
        if (this.props.eventToGoTo && this.props.eventToGoTo.id === this.props.event.id)
            selected = true
        document.addEventListener('click', this.handleClickOutside, true)
        this.setState({checked:this.props.event.gotov==="1", selected:selected})
        this.props.clearEvent()
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClickOutside, true)
    }

    myRef = React.createRef()

    vrijemeTrajanja = (start, stop) => {

        let diff = stop.diff(start)
        diff = moment(diff)
        
        let h = (diff.hours() - 1).toString()
        if (h.length < 2)
            h = '0' + h
        
        let m = (diff.minutes()).toString()
        if (m.length < 2)
            m = '0' + m

        return h + ":" + m
    }

    render() {
        return (
            <div>

                <div
                    onMouseOver={()=>this.setState({hovered:true})}
                    onMouseOut = {() => this.setState({hovered: false})}
                    
                    ref = {this.myRef}
                    id={"event"+this.props.event.id}
                    {...this.props.defaultAttributes}
                    title={this.props.event.name}
                    key={this.props.event.id}
                    onClick = {() => {
                        let sel = !this.state.selected
                        this.setState({selected:!this.state.selected})
                        if (sel)
                            this.props.onSelectEvent(this.props.event.id)
                        else
                            this.props.onSelectEvent(null)
                    }}
                    
                    style={{
                        ...this.props.defaultAttributes.style,
                        border: this.state.selected? '2px solid black':'none',
                        cursor:'pointer',
                        backgroundColor:this.state.checked?'grey':this.props.event.boja,
                        borderRadius:'5px'
                    }}
                >
                    <Overlay 
                        target = {this.myRef}
                        show = {this.state.hovered} 
                        placement="right"
                        flip
                        > 
                        {({placement, arrowProps, show: _show, popper, ...props}) => (
                            <div {...props}
                            style = {{
                                width:'300px',
                                backgroundColor: this.state.checked?'grey':this.props.event.boja,
                                padding: '15px',
                                color: 'white',
                                borderRadius: 5,
                                ...props.style,
                            }}>
                                <h4>{this.props.event.name}{this.state.checked?" (GOTOVO)":""}</h4>
                                <label
                                    style = {{width:'100%'}}>{"Opis: " +this.props.event.opis}</label>
                                <label style = {{width:'100%'}}>{"Kategorija: " + this.props.event.kategorija}</label>
                                <label style = {{width:'100%'}}>{"Datum: "+this.props.event.startTime.format('DD/MM/YYYY')}</label>
                                <label style = {{width:'100%'}}>{"Vrijeme: " +this.props.event.startTime.format('HH:mm') 
                                + " - " + 
                                this.props.event.endTime.format('HH:mm')}</label>
                                <label>{"Trajanje: " + this.vrijemeTrajanja(this.props.event.startTime , this.props.event.endTime)}</label>
                            </div>
                        )}
                    </Overlay>

                    <div style={{position:'absolute', height:'100%', width:'100%'}}>
                    <input 
                        type = "checkbox" 
                        id="cekboks" 
                        style = {{
                            margin:'5px',
                            float:'right'
                        }}
                        onClick={() => {
                            this.setState({checked:!this.state.checked})
                            this.props.onCheck(this.props.event.id)
                            
                        }}
                        onChange={()=>{}}
                        checked={this.state.checked}
                        />
                    </div>
                    <span className={this.props.styles.event_info} style = {{textDecoration:this.state.checked?'line-through':'none'}}>
                        { this.props.event.name}
                    </span>
                    <span className={this.props.styles.event_info} style = {{textDecoration:this.state.checked?'line-through':'none'}}>
                        { this.props.event.kategorija}
                    </span>
                    <span className={this.props.styles.event_info} style = {{textDecoration:this.state.checked?'line-through':'none'}} >
                        { this.props.event.startTime.format('HH:mm') } - { this.props.event.endTime.format('HH:mm') }
                    </span>
                    
                </div>
            </div>
        )
    }
}
