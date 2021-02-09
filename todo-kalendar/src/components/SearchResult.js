import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

export default withRouter(class SearchResult extends Component {
    state = {
        selected:false
    }

    handleClickOutside = (event)=>{
        const domNode = document.getElementById("result"+this.props.event.id)

        if (!domNode || !domNode.contains(event.target))
            this.setState({selected:false})
    }

    componentDidMount(){
        document.addEventListener('click', this.handleClickOutside, true)
        this.setState({checked:this.props.event.gotov==="1"})
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClickOutside, true)
    }

    render() {
        return (
            <div 
                id={"result" + this.props.event.id}
                style = {{
                height:'115px', 
                backgroundColor:this.props.event.boja,
                padding:'10px',
                marginTop:'7px',
                fontSize:'20px',
                border:this.state.selected?'3px solid black':'none',
                color:'white',
                borderRadius:'5px'
                }}
                
                onClick = {() => this.setState({selected:!this.state.selected})}
                >
                <div style = {{display:'block', float:'left'}}>
                {this.props.event.naziv}<br/>
                {this.props.event.datum}<br/>
                {this.props.event.pocetak + "-" + this.props.event.kraj}
                </div>
                
                <Button 
                    onClick = {() => {this.props.goToEvent(this.props.event); this.props.history.push('/home')}}
                    style = {{float:'right', visibility:this.state.selected?'visible':'hidden'}}>Idi na zadatak</Button>

            </div>
        )
    }
})
