import React, { Component } from 'react'
import {Toast} from 'react-bootstrap'
export default class ToastAlert extends Component {

    handleClickOutside = (e) => {
        let toast = document.getElementById('toastmsg')
        
        if (!toast.contains(e.target))
            this.props.onCloseToast()
    }

    componentDidMount(){
        document.addEventListener('click', this.handleClickOutside, true)
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClickOutside, true)
    }

    render() {
        return (
            <div id = "toastmsg">
                <Toast 
                    style= {{
                        position:'absolute',
                        zIndex:'2',
                        width:'350px',
                        margin:'10px',
                        color:'white',
                        backgroundColor:'black'
                    }} 
                    show = {this.props.show}
                    autohide={true}
                    onClose = {() => this.props.onCloseToast()}
                    >
                        <Toast.Header>
                            <strong className="mr-auto">Todo Kalendar</strong>
                        </Toast.Header>
                        <Toast.Body>{this.props.message}</Toast.Body>
                </Toast>
            </div>
        )
    }
}
