import 'bootstrap/dist/css/bootstrap.min.css';
import "react-widgets/dist/css/react-widgets.css";
import Home from './components/Home';
import Search from './components/Search'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import React, { Component } from 'react'
import EventService from './services/EventService'
import './App.css'

export default class App extends Component {
    state = {
        eventToGoTo: null,
        userInfo:null
    }

    goToEvent = async(event) => {
        this.setState({eventToGoTo:event})
    }

    onLogin = async(creds)=>{
        let es = new EventService()
        let info = await es.login(creds)
        if (!info)
            return null
        this.setState({userInfo:info})
        return info
    }

    onLogout = () => {
        this.setState({userInfo:null, eventToGoTo:null})
    }

    clearEvent = ()=>{
        this.setState({eventToGoTo:null})
    }

  render() {
    return(
    <Router>
        <div className="App">
            
            <Route path = '/' exact render = {props => (
                <Login {...props} onLogin = {(creds) => this.onLogin(creds)}/>
            )}/>

            <Route path = '/register' exact render = {props => (
                <Register {...props} onRegister = {(user) => this.onRegister(user)}/>
            )}/>

            <Route path = '/home' exact render = {props => 
                (<Home {...props} eventToGoTo = {this.state.eventToGoTo} userInfo = {this.state.userInfo} onLogout = {() => this.onLogout()} 
                clearEvent = {() => this.clearEvent()}/>)
            }/>
            
            <Route path = '/search' render = {props => 
                (<Search {...props} goToEvent = {(ev) => this.goToEvent(ev)} userInfo = {this.state.userInfo}/>)
            }/>    
        </div>
    </Router>
    )}
}
