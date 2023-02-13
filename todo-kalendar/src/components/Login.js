import React, { Component } from 'react'
import '../css/Login.css'
import {withRouter} from 'react-router-dom'
import {Form} from 'react-bootstrap'

export default withRouter(class Login extends Component {

    state = {
        username:"",
        password:"",
        usernameError:"",
        passwordError:"",
        credentialError:""
    }

    onLogin = async() => {
        if (!this.validate())
            return
        try
        {
            let info = await this.props.onLogin({username:this.state.username, password:this.state.password})
            if (info)
            {
                this.props.history.push('/home')
            }
        }
        catch(error){
            if (error.response.status === 401)
                this.setState({credentialError:"Neispravni podaci za prijavu."})
        }
    }

    validate(){
        let valid = true
        let msg = "Ovo polje je obavezno."
        if (this.state.username === "") {this.setState({usernameError:msg}); valid = false}
        if (this.state.password === "") {this.setState({passwordError:msg}); valid = false}
        return valid
    }

    errorStyle = {
        color:'red',
        fontSize:'15px'
    }

    render() {
        return (
            <div class="back">
                <div class="div-center">

                    <div class="content">

                        <h3>Prijava test promjene</h3>
                        <hr />
                        <Form.Label style = {this.errorStyle} hidden = {this.state.credentialError === ""}>{this.state.credentialError}</Form.Label>
                        <form>
                            <div class="form-group">
                                <label >Korisničko ime</label>
                                <input type="text" class="form-control"  placeholder="Korisničko ime" onChange={(e)=>this.setState({username:e.target.value, usernameError:"", credentialError:""})}/>
                                <Form.Label style = {this.errorStyle} hidden = {this.state.usernameError === ""}>{this.state.usernameError}</Form.Label>
                            </div>
                            <div class="form-group">
                                <label >Lozinka</label>
                                <input type="password" class="form-control"  placeholder="Lozinka" onChange={(e)=>this.setState({password:e.target.value, passwordError:"", credentialError:""})}/>
                                <Form.Label style = {this.errorStyle} hidden = {this.state.passwordError ===""}>{this.state.passwordError}</Form.Label>
                            </div>
                            <button type="button" class="btn btn-primary" onClick={() => this.onLogin()}>Prijavi se</button>
                            <hr/>
                            <button type="button" class="btn btn-link" onClick={() => this.props.history.push('/register')}>Nemate račun? Registrujte se.</button>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
})
