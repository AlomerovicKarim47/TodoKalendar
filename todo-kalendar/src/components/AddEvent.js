import React, { Component } from 'react'
import {Modal, Form, Button, Row, Col} from 'react-bootstrap'
import EventService from '../services/EventService'
import ToastAlert from './ToastAlert'
import Select, {components} from 'react-select'
import { Link } from 'react-router-dom'
import Dane from '../components/Dane'
import moment from 'moment'

export default class DodajEvent extends Component {
    
    state={
        kategorije:[],
        event:{
            naziv:"",
            opis:"",
            datum:"",
            pocetak:"",
            kraj:"",
            kategorija:"",
            gotov:"0", 
            boja:"#12CDB1"
        },
        novaKategorija:{
            naziv:""
        },
        showAddCategory:false,
        eventService: new EventService(),
        showAlert: false,
        showKatDeleted: false,
        showKatAdded:false,
        showYesNo: false,
        katForDelete: null,
        
        nazivError:"",
        datumError:"",
        pocetakError:"",
        krajError:"",
        kategorijaError:"",
        prijeError:""
    }

    validate = ()=>{
        let valid = true

        let requiredMessage = "Ovo polje je obavezno."

        let event = this.state.event
        if (this.props.eventToEdit)
            event = this.props.eventToEdit

        let start = moment(event.pocetak, 'HH:mm')
        let stop = moment(event.kraj, 'HH:mm')

        if (start.isAfter(stop))
        {
            this.setState({prijeError:"Pocetak mora biti prije kraja."})
            valid = false
        }

        if (event.naziv === "") { this.setState({nazivError: requiredMessage}); valid = false} 
        if (event.datum === "") { this.setState({datumError: requiredMessage}); valid = false} 
        if (event.pocetak === "") { this.setState({pocetakError: requiredMessage}); valid = false} 
        if (event.kraj === "") { this.setState({krajError: requiredMessage}); valid = false} 

        return valid
    }

    loadKategorije  = async()=>{
        let es = this.state.eventService
        let katData = await es.getKategorije()
        let kategorije = []
        katData.data.forEach(element => {
            kategorije.push({id: element.id, label:element.naziv, value:element.naziv})
        });
        this.setState({kategorije:kategorije})
    }

    async componentDidMount(){
        this.state.eventService.setUserInfo(this.props.userInfo)
        await this.loadKategorije()
        let event = this.state.event
        event.kategorija = this.state.kategorije[0].value
        this.setState({event:event})
    }

    clearEventAttributes = () => {
        let clear = this.state.event
        clear.naziv=""
        clear.opis=""
        clear.datum=""
        clear.pocetak=""
        clear.kraj=""
        clear.kategorija=this.state.kategorije[0].value
        clear.gotov="0" 
        clear.boja="#12CDB1"

        this.setState({
            event:clear,
            nazivError:"",
            datumError:"",
            pocetakError:"",
            krajError:"",
            prijeError:""
        })
    }

    onEventAttributeChange = (att, value) => {
        let newEvent = this.state.event
        newEvent[att] = value 
        this.setState({event:newEvent})
        if (this.props.eventToEdit)
            this.props.eventToEdit[att] = value
        if (att == "pocetak" || att == "kraj")
            this.setState({[att + "Error"]:"", prijeError:""})
        else
            this.setState({[att + "Error"]:""})
    }

    onAddCategory = async (kat) => {
        let es = this.state.eventService
        await es.addKategorija(kat)//({...kat, user:"1"})
        await this.loadKategorije()
        await this.props.updateKategorije()
    }

    onCloseToast = (t) => {
        if (t === 'alert')
            this.setState({showAlert:false})
        else if (t === 'deletekat')
            this.setState({showKatDeleted: false})
        else if (t === 'addkat')
            this.setState({showKatAdded: false})
    }       

    onDeleteKategorija = async (kat) => {
        let es= this.state.eventService
        await es.deleteKategorija(kat)
        await this.loadKategorije()
        await this.props.updateKategorije()
        let ev = this.state.event
        ev.kategorija = "Bez kategorije"
        if (this.props.eventToEdit)
            this.props.eventToEdit.kategorija = "Bez kategorije"
        this.setState({event:ev, showKatDeleted:true})
    }

    myOptionComponent = kat => {
        return(
            <components.Option {...kat}>
                <Row>
                    <Col>
                        <div style = {{
                            float:'left'
                        }}>
                            {kat.label}
                        </div>
                    </Col>
                    <Col xs = 'auto'>
                        <Link onClick = {() => this.setState({showYesNo:true, katForDelete:kat.data.id})} hidden={kat.label ==="Bez kategorije"}>x</Link>
                    </Col>
                </Row>
            </components.Option>   
                
        )
    }

    vrijemeTrajanja = () => {
        let diff = "--:--"
        let event = this.state.event

        if (this.props.eventToEdit)
            event = this.props.eventToEdit
        
        if (event.pocetak == "" || event.kraj == "")
            return diff
        
        let start = moment(event.pocetak, 'HH:mm')
        let stop = moment(event.kraj, 'HH:mm')

        if (start.isAfter(stop))
        {
            return diff
        }

        diff = stop.diff(start)
        diff = moment(diff)
        
        let h = (diff.hours() - 1).toString()
        if (h.length < 2)
            h = '0' + h
        
        let m = (diff.minutes()).toString()
        if (m.length < 2)
            m = '0' + m

        return h + ":" + m
    }

    errorStyle = {
        color: 'red',
        fontSize: '15px'
    }

    render() {
        return (
            <div>

                <ToastAlert 
                    message = {"Zadatak dodan/izmjenjen."}
                    onCloseToast = {() => this.onCloseToast('alert')}
                    show = {this.state.showAlert}
                    />
                <Modal show = {this.props.show}>
                    <Dane 
                        show = {this.state.showYesNo}
                        text = "Jeste li sigurni da želite obrisati ovu kategoriju? Zadaci sa ovom kategorijom će ostati bez kategorije."
                        closeModal = {(modal) => this.setState({showYesNo:false})}
                        action = {() => this.onDeleteKategorija(this.state.katForDelete)}
                    />
                    <ToastAlert 
                        message = {"Kategorija obrisana."}
                        onCloseToast = {() => this.onCloseToast('deletekat')}
                        show = {this.state.showKatDeleted}
                        />   
                    <ToastAlert 
                        message = {"Kategorija dodana."}
                        onCloseToast = {() => this.onCloseToast('addkat')}
                        show = {this.state.showKatAdded}
                        />  
                    <Modal show = {this.state.showAddCategory}>
                        <Form.Group>
                            <Form.Label >Naziv nove kategorije</Form.Label>
                            <Form.Control 
                                type = "text"
                                onChange={(e) => this.setState({novaKategorija:{naziv:e.target.value}, kategorijaError:""})}/>
                            <Form.Label style = {this.errorStyle} hidden={this.state.kategorijaError===""}>{this.state.kategorijaError}</Form.Label>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button block
                                    onClick = {()=> this.setState({showAddCategory:false, novaKategorija:{naziv:""}, kategorijaError:""})}
                                >
                                    Nazad
                                </Button>
                            </Col>
                            <Col>
                                <Button block
                                    onClick={() => {
                                        if (this.state.novaKategorija.naziv !== "")
                                        {
                                            this.onAddCategory(this.state.novaKategorija)
                                            this.setState({showAddCategory:false, showKatAdded:true, novaKategorija:{naziv:""}})
                                        }
                                        else
                                            this.setState({kategorijaError: "Ovo polje je obavezno."})
                                    }}>
                                    Dodaj kategoriju
                                </Button>
                            </Col>
                        </Row>
                    </Modal>

                    <Form.Group>
                        <Row>
                            <Col xs = {3}>
                                <Form.Label>Naziv:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control 
                                    onChange={(e)=>this.onEventAttributeChange("naziv", e.target.value)}
                                    value = {this.props.eventToEdit?this.props.eventToEdit.naziv:this.state.event.naziv}/>
                                <Form.Label style = {this.errorStyle} hidden={this.state.nazivError===""}>{this.state.nazivError}</Form.Label>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col xs = {3}>
                                <Form.Label>Opis:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control onChange={(e)=>this.onEventAttributeChange("opis", e.target.value)}
                                value = {this.props.eventToEdit?this.props.eventToEdit.opis:this.state.event.opis}/>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col xs = {3}>
                                <Form.Label>Datum:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type = "date" onChange={(e)=>this.onEventAttributeChange("datum", e.target.value)}
                                value = {this.props.eventToEdit?this.props.eventToEdit.datum:this.state.event.datum}/>
                                <Form.Label style = {this.errorStyle} hidden={this.state.datumError===""}>{this.state.datumError}</Form.Label>
                            </Col>
                        </Row>
                    </Form.Group>
                    
                    <Form.Group>
                        <Row>
                            <Col xs = {3}>
                                <Form.Label>Početak:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="time" onChange={(e)=>this.onEventAttributeChange("pocetak", e.target.value)}
                                    value = {this.props.eventToEdit?this.props.eventToEdit.pocetak:this.state.event.pocetak}/>
                                <Form.Label style = {this.errorStyle} hidden={this.state.pocetakError===""}>{this.state.pocetakError}</Form.Label>
                                <Form.Label style = {this.errorStyle} hidden={this.state.prijeError===""}>{this.state.prijeError}</Form.Label>
                            </Col>
                            <Col xs = {2}>
                                <Form.Label>Kraj:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="time" onChange={(e)=>this.onEventAttributeChange("kraj", e.target.value)}
                                    value = {this.props.eventToEdit?this.props.eventToEdit.kraj:this.state.event.kraj}/>
                                <Form.Label style = {this.errorStyle} hidden={this.state.krajError===""}>{this.state.krajError}</Form.Label>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col xs = {3}>
                                <Form.Label>
                                    Trajanje:
                                </Form.Label>
                            </Col>
                            <Col>
                                <Form.Label>
                                    {this.vrijemeTrajanja()}
                                </Form.Label>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                        <Col xs = {3}>
                            <Form.Label>Kategorija:</Form.Label>
                        </Col>
                        <Col>
                            <Select
                                components={{
                                    Option: this.myOptionComponent
                                }}                   
                                options={this.state.kategorije} 
                                onChange = {(kat)=>this.onEventAttributeChange("kategorija", kat.value)}
                                value = {
                                    this.props.eventToEdit?
                                        {label:this.props.eventToEdit.kategorija, value:this.props.eventToEdit.kategorija}:
                                        {label:this.state.event.kategorija, value: this.state.event.kategorija}
                                }
                                />
                        </Col>
                        <Col xs = "auto">
                            <Button
                                onClick={()=>{
                                    this.setState({showAddCategory:true})
                                }}>
                                +
                            </Button>
                        </Col>
                    </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col xs = {3}>
                                <Form.Label>Boja:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type = "color" onChange={(e) => this.onEventAttributeChange('boja', e.target.value)}
                                value = {this.props.eventToEdit?this.props.eventToEdit.boja:this.state.event.boja}/>
                            </Col>
                        </Row>
                    </Form.Group>
                    
                    <Row>
                        <Col>
                            <Button block onClick = {() => {this.props.closeModal("novi"); this.props.closeModal("edit"); this.clearEventAttributes()}}>
                                Nazad
                            </Button>
                        </Col>
                        
                        <Col>
                            <Button block onClick = {() => {
                                    if (this.validate())
                                    {
                                        this.setState({showAlert:true})
                                        if (!this.props.eventToEdit)
                                            this.props.addEvent(this.state.event) 
                                        else
                                        {
                                            this.props.editEvent(this.props.eventToEdit)
                                        }
                                        this.clearEventAttributes()
                                        this.props.closeModal("novi")
                                        this.props.closeModal("edit")
                                    }
                                }}>
                                    {this.props.eventToEdit?"Izmjeni":"Dodaj"}
                            </Button>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}
