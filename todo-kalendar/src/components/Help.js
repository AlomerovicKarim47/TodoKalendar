import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'

export default class Help extends Component {
    render() {
        return (
            <div>
                <Modal show = {this.props.show} dialogClassName="help-modal">
                    <h2>Pomoć</h2><hr/>
                    
                    <div style = {{height:'600px', overflowY:'scroll', marginBottom:'15px'}}>
                        <hr/>
                        <h3>Vremenska crta-kalendar</h3>
                        <hr/>
                        <h5>Nalazi se sa desne strane i zauzima većinu ekrana. Na njoj su raspoređeni vaši zadaci po danu i vremenu. Vremenska crta se nalazi sa lijeve, a datumi i dani u sedmici sa gornje strane.</h5>
                        <h4>Nazad i naprijed</h4>
                        <h5>Pomjera kalendar za jedan dan u budućnost ili prošlost.</h5>
                        <h4>Zadatak</h4>
                        <h5>Predstavljen je cetveroiglom raspona od svog početnog do svog krajnjeg vremena na vremenskoj crti. Zadatak selektujemo klikom na njega. Klikom na check box u gornjem desnom uglu zadatka
                            taj zadatak označavamo gotovim ili ne gotovim.
                        </h5>

                        <hr/>
                        
                        <h3>Meni</h3>
                        <hr/>
                        <h5>Nalazi se sa lijeve strane i sadrži opcije za upravljanje zadacima i vremenskom crtom-kalendarom.</h5>
                        <h4>Mini kalendar</h4>
                        
                        <h5>Služi za navigaciju vermenskom crtom-kalendarom. Klikom na datum taj datum postavljamo na prvo mjesto na vremenskoj crti-kalendaru. 
                            Klikom na "Today" se vraćamo na današnji datum. Klikom na dugme sa mjesecom i godinom sa lijeve strane mijenjamo izgled kalendara (različit izgled omogućava drugačije i brže kretanje kroz kalendar).</h5>
                        <h4>Pretraga</h4>
                        <h5>Otvara dijalog za pretragu zadataka gdje unosite naziv ili dio naziva zadatka te nakon toga kliknete dugme "Pretraži". 
                            Nakon toga selektujete željeni zadatak i kliknete na "Idi na zadatak".</h5>
                        <h4>Novi</h4>
                        <h5>Otvara dijalog za dodavanje novog zadatka gdje unosite sve potrebne podatke te nakon toga kliknete na "Dodaj".</h5>
                        <h4>Izmjeni</h4>
                        <h5>Otvara dijalog za izmjenu selektovanog zadatka gdje unosite sve potrebne podatke te nakon toga kliknete na "Izmjeni".</h5>
                        <h4>Briši</h4>
                        <h5>Briše selektovani zadatak.</h5>
                        <h4>Podjeli</h4>
                        <h5>Otvara dijalog sa kodom za dijeljenje zadatka. Kliknite na "Kopiraj" kako biste kopirali kod i poslali ga putem e-maila, instant messengera i slučno.</h5>
                        <h4>Filter</h4>
                        <h5>Otvara dijalog sa check-boxovima za sve kategorije zadataka pomoću kojeg možemo odabrati koje kategorije zadataka želimo vidjeti na vremenskoj crti-kalendaru.</h5>
                        <h4>Import</h4>
                        <h5>Otvara dijalog sa poljem za unos koda za dijeljenje zadataka. Zalijepite kod za dijeljenje koji ste dobili kako biste importovali zadatak u vlastiti raspored.</h5>
                        <h4>Odjava</h4>
                        <h5>Odjavljuje vas sa sistema i vraća na ekran za prijavu.</h5>
                        <hr/>
                        <h3>Kategorije</h3>
                        <hr/>
                        <h5>Aplikacija nudi mogućnost dodavanja i brisanja kategorija zadataka.</h5>
                        <h4>Dodavanje kategorije</h4>
                        <h5>Vrši se klikom na Dodaj ili Izmjeni i klikom na + dugme pored polja za biranje kategorije. Otvara se dijalog gdje unosite naziv nove kategorije.</h5>
                        <h4>Brisanje kategorije</h4>
                        <h5>Vrši se klikom na "x" pored naziva kategorije u drop down meniju polja za odabir kategorije.</h5>
                    </div>
                    <Button onClick = {() => this.props.closeModal("help")}>Nazad</Button>
                </Modal>
            </div>
        )
    }
}
