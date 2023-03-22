
import {Button} from 'react-bootstrap'
import {Calendar} from 'react-widgets'

import React, { Component } from 'react'
import {withRouter} from 'react-router-dom' 

import '../css/Sidebar.css'

export default withRouter(class Sidebar extends Component {
    render() {
        return (
            <div style = {{marginTop:'-10px'}}>
                
                <div className="calendar-wrapper">
                    <Calendar
                        defaultValue={new Date()}
                        onChange={value => this.props.onDateChange(value)}
                    />
                </div> 
                <div className="sidebar-buttons">
                    <Button block
                        onClick={() => {
                            this.props.openSearch()
                        }}>Pretraga</Button>
                    <Button block onClick = {() => this.props.openModal("novi")}>Novi</Button>
                    <Button
                        id="editButton"
                        block
                        disabled={!this.props.enableEdit}
                        onClick = {() => this.props.onEdit()}>
                        Izmjeni
                    </Button>
                    <Button
                        id="deleteButton"
                        block
                        disabled={!this.props.enableDelete}
                        onClick = {() => this.props.onDelete()}>
                            Briši
                    </Button>
                    <Button
                        id="shareButton"
                        block
                        disabled={!this.props.enableShare}
                        onClick = {() => this.props.openModal('share')}
                        >
                            Podjeli
                    </Button>
                    <Button
                        block
                        onClick={()=>this.props.openModal('filter')}>
                        Filter{this.props.kategorije.length === this.props.filters.length?"":"*"}
                    </Button>
                    <Button
                        block
                        onClick={()=>this.props.openModal('import')}>
                        Import
                    </Button>
                    <Button
                        block
                        onClick={()=>this.props.openModal("help")}>
                        Pomoć
                    </Button>
                    <Button
                        block
                        onClick={()=>{this.props.onLogout(); this.props.history.push('/')}}>
                        Odjava
                    </Button>
                </div>  
            </div>
        )
    }
})
