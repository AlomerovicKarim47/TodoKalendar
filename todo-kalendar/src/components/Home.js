import { Container, Col, Row } from 'react-bootstrap'
import EventTable from './EventTable'
import Sidebar from './Sidebar'
import AddEvent from './AddEvent'
import React, { Component } from 'react'
import moment from 'moment'
import EventService from '../services/EventService'
import Filter from '../components/Filter'
import Share from '../components/Share'
import Import from '../components/Import'
import ToastAlert from '../components/ToastAlert'
import Dane from '../components/Dane'

export default class Home extends Component {

    state = {
        kategorije:[],
        today:moment(),
        showDodajNovi:false,
        showEdit:false,
        showFilter:false,
        showShare:false,
        showImport:false,
        datumi:null,
        events: {},
        selectedEvent:null,
        eventToEdit:null,
        filters:[],
        eventService:new EventService(),
        showDeleteToast:false,
        showYesNo:false,
        showImportAlert:false,
        importMessage:"Zadatak importovan.",
        showFilterAlert:false
    }

    onFilterChange = (filters)=>{
        this.setState({filters:[...filters], showFilterAlert:true})
        this.loadEvents(this.state.today, filters)
    }

    updateKategorije= async()=>{
        let es= this.state.eventService
        let kategorije = await es.getKategorije()
        let filters = []
        for (var i = 0; i < kategorije.data.length; i++)
            filters.push(kategorije.data[i].naziv)
        this.setState({kategorije:kategorije.data, filters:filters})
    }

    onCheck = async (eventId) => {
        let es = this.state.eventService
        await es.toggleGotov(eventId)
        this.loadEvents(this.state.today, this.state.filters)
    }

    onSelectEvent = (eventId) =>{
        this.setState({selectedEvent:eventId})
    }

    onDatumNaprijed = () => {
        this.setState({today:this.state.today.add(1, 'days')})
        this.loadEvents(this.state.today, this.state.filters)
    }

    onDatumNazad = () => {
        this.setState({today:this.state.today.add(-1, 'days')})
        this.loadEvents(this.state.today, this.state.filters)
    }

    onDelete = async () => {
        if (!this.state.selectedEvent)
            return
        let es = this.state.eventService
        try {
            await es.deleteEvent(this.state.selectedEvent)
            await this.loadEvents(this.state.today, this.state.filters)
            this.onSelectEvent(null)
            this.setState({showDeleteToast:true})
        } catch (error) {
            throw error
        }
    }

    onEdit = async ()=>{
        if (!this.state.selectedEvent)
            return
        let es = this.state.eventService
        let event = await es.getEvent(this.state.selectedEvent) 
        if (!event)
            return
        this.setState({eventToEdit:event.data})
        this.openModal('edit')
    }

    async loadEvents(today, filter){
        let events = {}
        for (var i = 0; i < 7; i++)
        {
            events[today.add(i, 'days').format("YYYY-MM-DD dddd")] = []
            today.add(-i, 'days')
        }
        try{
            let param = today.format("YYYY-MM-DD")
            let es = this.state.eventService
            let eventRes = await es.getEvents(param, filter)
            let eventData = eventRes.data
            for (var j = 0; j < eventData.length; j++)
            {
                let prop = moment(eventData[j].datum).format('YYYY-MM-DD') + " " + moment(eventData[j].datum).format('dddd')
                if (events.hasOwnProperty(prop))
                {
                    let ev = eventData[j]
                    let ev2 = {
                        id:ev.id,
                        name: ev.naziv,
                        type:"custom",
                        startTime: moment(ev.datum+'T'+ev.pocetak+':00'),
                        endTime: moment(ev.datum+'T'+ev.kraj+':00'),
                        boja: ev.boja,
                        gotov:ev.gotov,
                        kategorija:ev.kategorija,
                        opis:ev.opis
                    }
                    events[prop].push(ev2)
                }
            }
            
            this.setState({events:events})
        }
        catch (error){
            throw error
        }
    }

    async componentDidMount(){
        let selEv = null
        if (this.props.eventToGoTo)
            selEv = this.props.eventToGoTo.id
        if (!this.props.userInfo)
            return
        this.state.eventService.setUserInfo(this.props.userInfo)
        let goTo = false
        if (this.props.eventToGoTo)
            goTo = true 
        await this.updateKategorije()
        let filters = []
        for (var i = 0; i < this.state.kategorije.length; i++)
            filters.push(this.state.kategorije[i].naziv)
        let today = moment()
        if (goTo)
            today = moment(this.props.eventToGoTo.datum)
        await this.loadEvents(today, filters)

        this.setState({filters:filters, today:goTo?today:this.state.today, selectedEvent:selEv})

        setInterval(() => {
            let currentDate = moment().format('YYYY-MM-DD dddd')
            let currentTime = moment().format('hh:mm:ss')
            let todaysEvents = this.state.events[currentDate]
            let notif = null
            if (todaysEvents)
                for (var i = 0; i < todaysEvents.length; i++)
                {
                    if (todaysEvents[i].startTime.format('hh:mm:ss') === currentTime)
                        notif = new Notification(todaysEvents[i].name + " (POČETAK)", 
                            {
                                body:currentTime + " - " + todaysEvents[i].endTime.format('hh:mm:ss')
                            })
                    if (todaysEvents[i].endTime.format('hh:mm:ss') === currentTime)
                        notif = new Notification(todaysEvents[i].name + " (KRAJ)", 
                        {
                            body:todaysEvents[i].startTime.format('hh:mm:ss') + " - " + currentTime
                        })
                }
        }, 1000);
    }

    openModal = (modal) => {
        if (modal === 'novi')
            this.setState({showDodajNovi:true})
        else if (modal ==='edit')
            this.setState({showEdit:true})
        else if (modal === 'filter')
            this.setState({showFilter:true})
        else if (modal === 'share')
            this.setState({showShare:true})
        else if (modal === 'import')
            this.setState({showImport:true})
            else if (modal === 'yesno')
            this.setState({showYesNo: true})
    }

    closeModal = (modal) => {
        this.setState({eventToEdit:null})
        if (modal === 'novi')
            this.setState({showDodajNovi:false})
        else if (modal ==='edit')
            this.setState({showEdit:false})
        else if (modal === 'filter')
            this.setState({showFilter:false})
        else if (modal === 'share')
            this.setState({showShare:false})
        else if (modal === 'import')
            this.setState({showImport:false})
        else if (modal === 'yesno')
            this.setState({showYesNo: false})
    }

    addEvent = async (ev) => {
        let es = this.state.eventService
        await es.addEvent(ev)
        this.loadEvents(this.state.today, this.state.filters)
    }

    editEvent = async (ev) => {
        let es = this.state.eventService
        await es.editEvent(ev)
        this.loadEvents(this.state.today, this.state.filters)
    }

    onDateChange = (date) => {
        this.loadEvents(moment(date), this.state.filters)
        this.setState({today: moment(date)})
    }

    onImport = async(code) => {
        let es = this.state.eventService
        try
        {
            let event = await es.getSharedEvent(code)
            delete event.id
            await this.addEvent(event)
            this.setState({showImportAlert:true, importMessage:"Zadatak importovan."})
        }catch(error){
            this.setState({showImportAlert:true, importMessage: "Neispravan ili zastario import kod."})
        }
    }

    render() {
        if (!this.props.userInfo)return(<div>Unauthorized.</div>)
        return (
            <div>
                <Dane 
                    text = {"Jeste li sigurni da želite obrisati ovaj zadatak?"}
                    show = {this.state.showYesNo}
                    closeModal = {(modal) => this.closeModal(modal)}
                    action = {() => this.onDelete()}
                    />
                <ToastAlert 
                    message = {"Filter izmjenjen."}
                    onCloseToast = {() => this.setState({showFilterAlert:false})}
                    show = {this.state.showFilterAlert}
                    />
                <ToastAlert 
                    message = {this.state.importMessage}
                    onCloseToast = {() => this.setState({showImportAlert:false})}
                    show = {this.state.showImportAlert}
                    />              
                <ToastAlert 
                    message = "Zadatak obrisan."
                    onCloseToast = {() => this.setState({showDeleteToast: false})}
                    show = {this.state.showDeleteToast}
                    />
                <Import
                    show = {this.state.showImport}
                    onImport = {(code) => this.onImport(code)}
                    closeModal = {(modal) => this.closeModal(modal)}
                    />
                <Share
                    userInfo = {this.props.userInfo}
                    eventToShare = {this.state.selectedEvent}
                    closeModal = {(modal) => this.closeModal(modal)}
                    show = {this.state.showShare}
                    />
                <Filter
                    show = {this.state.showFilter}
                    closeModal = {(modal) => this.closeModal(modal)}
                    kategorije = {this.state.kategorije}
                    onFilterChange = {(filters) => this.onFilterChange(filters)}
                    defaultFilters = {this.state.filters}
                    />
                <AddEvent
                    userInfo = {this.props.userInfo} 
                    show = {this.state.showDodajNovi || this.state.showEdit}
                    closeModal = {(modal) => this.closeModal(modal)}
                    addEvent = {(ev) => this.addEvent(ev)}
                    editEvent = {(ev) => this.editEvent(ev)}
                    eventToEdit = {this.state.eventToEdit}
                    updateKategorije = {() => this.updateKategorije()}
                    />
                <Container fluid>
                    <Row>
                        <Col xs = {2}>
                            <Sidebar 
                                openModal = {(modal) => this.openModal(modal)}
                                onDateChange = {(date) => this.onDateChange(date)}
                                enableDelete = {this.state.selectedEvent?true:false}
                                enableEdit = {this.state.selectedEvent?true:false}
                                enableShare = {this.state.selectedEvent?true:false}
                                onDelete = {() => {this.setState({showYesNo:true})}}
                                onEdit = {() => this.onEdit()}
                                onLogout = {() => this.props.onLogout()}
                            />
                        </Col>
                        <Col style = {{paddingLeft:'0px'}}>                        
                            <EventTable events = {this.state.events}
                                onDatumNaprijed = {() => this.onDatumNaprijed()}
                                onDatumNazad = {() => this.onDatumNazad()}
                                onSelectEvent = {(id) => this.onSelectEvent(id)}
                                onCheck = {(id) => this.onCheck(id)}
                                eventToGoTo={this.props.eventToGoTo}
                                clearEvent = {() => this.props.clearEvent()}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
