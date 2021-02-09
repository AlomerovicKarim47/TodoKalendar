import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'

export default class Filter extends Component {

    state = {
        
    }

    onPrimjeni = ()=> {
        let filters = []
        for (var kat in this.state)
            if (this.state[kat])
                filters.push(kat)
        this.props.onFilterChange(filters)
        this.props.closeModal('filter')
    }

    onModalShow = () => {
        let filters = {}
        
        this.props.kategorije.forEach(kat => {
            filters[kat.naziv] = this.props.defaultFilters.indexOf(kat.naziv) > -1
            
        })
        this.setState(filters)
    }

    render() {
        return (
            <div>
                <Modal show = {this.props.show}
                        onShow = {() => this.onModalShow()}
                        >

                    <Form.Group>
                        <Form.Label className="prompt">Odaberite kategorije za prikaz:</Form.Label><hr/>
                    {this.props.kategorije.map((kat, i) => {
                        
                        return(<div key={i}><input type="checkbox" 
                                        onChange={()=>{}}
                                        onClick={(e) => {
                                            let at = kat.naziv
                                            this.setState({[at]: !this.state[at]})
                                        }} 
                                        checked={this.state[kat.naziv]?this.state[kat.naziv]:false}                                      
                                        />
                                        {" "+ kat.naziv}
                                    </div>)
                                })}
                                </Form.Group>
                    <Row>
                        <Col>
                        <Button
                            block
                            onClick = {() => this.props.closeModal('filter')}
                            >Nazad</Button>
                        </Col>
                        <Col>
                        <Button
                            block
                            onClick = {() => this.onPrimjeni()}
                            >Primjeni filter</Button>
                        </Col>
                        
                    </Row>
                </Modal>
            </div>
        )
    }
}
