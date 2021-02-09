import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import EventService from '../services/EventService'
import ToastAlert from './ToastAlert'
import {Form} from 'react-bootstrap'

export default withRouter(class Register extends Component {

    state={
        username:"",
        password:"",
        email:"",
        confirm:"",
        showAlert:false,

        usernameError:"",
        passwordError:"",
        emailError:"",
        confirmError:"",
        enableReg:true
    }

    onCloseToast = () => {
        this.setState({showAlert:false})
    }

    onRegister = async()=>{
        if (!this.validate())
            return
        let user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        try
        {
            let es = new EventService()
            this.setState({enableReg:false})
            await es.register(user)
            this.setState({enableReg:true})
            this.setState({showAlert:true, username: "", password: "", email: "", confirm: ""})
        }
        catch(error){
            if (error.response.status === 409)
            {
                let res = error.response.data
                this.setState({
                    usernameError:res.username===1?"Korisničko ime zauzeto.":"", 
                    emailError:res.email===1?"Email vec registrovan.":"",
                    enableReg:true})
            }
        }
    }

    onExitRegister = async ()=>{     
        this.props.history.push('/')
        this.setState({showAlert:false})
    }

    validate = () => {
        let valid = true
        let requiredMessage = "Ovo polje je obavezno."
        let notMatch = "Lozinke se ne poklapaju."
        let tooShort = "Lozinka mora imati barem 8 znakova."

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.state.email)){
            this.setState({emailError:"Neispravan format."})
            valid = false
        }

        if (this.state.password.length < 8){
            this.setState({passwordError:tooShort, confirmError:tooShort})
            valid = false
        }

        if (this.state.password !== this.state.confirm){
            this.setState({passwordError:notMatch, confirmError:notMatch})
            valid = false
        }

        if (this.state.username === ""){this.setState({usernameError: requiredMessage}); valid = false} 
        if (this.state.password === ""){this.setState({passwordError: requiredMessage}); valid = false} 
        if (this.state.confirm === ""){this.setState({confirmError: requiredMessage}); valid = false} 
        if (this.state.email === ""){this.setState({emailError: requiredMessage}); valid = false} 
        
        
        
        return valid
    }

    errorStyle = {
        color:'red',
        fontSize:'15px'
    }

    render() {
        return (
            <div>
                <div class="back">
                    <ToastAlert 
                        message = "Registracija uspjesna"
                        onCloseToast = {() => this.onCloseToast()}
                        show = {this.state.showAlert}
                        />
                    <div class="div-center">
                        <div class="content">

                            <h3>Registracija</h3>
                            <hr />
                            <form>
                                <div class="form-group">
                                    <label >Korisničko ime</label>
                                    <input type="text" class="form-control"  placeholder="Korisničko ime"
                                        onChange={(e) => this.setState({username:e.target.value, usernameError:""})}
                                        value = {this.state.username}/>
                                    <Form.Label style = {this.errorStyle} hidden = {this.state.usernameError===""}>{this.state.usernameError}</Form.Label>
                                </div>
                                
                                <div class="form-group">
                                    <label >Email</label>
                                    <input type="text" class="form-control"  placeholder="Email"
                                        onChange={(e) => this.setState({email:e.target.value, emailError:""})}
                                        value = {this.state.email}/>
                                    <Form.Label style = {this.errorStyle} hidden = {this.state.emailError===""}>{this.state.emailError}</Form.Label>
                                </div>
                                
                                <div class="form-group">
                                    <label >Lozinka</label>
                                    <input type="password" class="form-control"  placeholder="Lozinka"
                                        onChange={(e) => this.setState({password:e.target.value, passwordError:"", confirmError:""})}
                                        value = {this.state.password}/>
                                    <Form.Label style = {this.errorStyle} hidden = {this.state.passwordError===""}>{this.state.passwordError}</Form.Label>
                                </div>

                                <div class="form-group">
                                    <label >Potvrdi lozinku</label>
                                    <input type="password" class="form-control"  placeholder="Potvrdi lozinku"
                                        onChange={(e) => this.setState({confirm:e.target.value, confirmError:"", passwordError:""})}
                                        value = {this.state.confirm}/>
                                    <Form.Label style = {this.errorStyle} hidden = {this.state.confirmError===""}>{this.state.confirmError}</Form.Label>
                                </div>

                                <button disabled={!this.state.enableReg} type="button" class="btn btn-primary" onClick={()=>
                                    this.onRegister()}
                                    >
                                        Registruj se
                                </button>
                                <hr/>
                                <button type="button" class="btn btn-link" onClick = {() => this.props.history.push('/')}>
                                    Imate račun? Prijavite se.
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
