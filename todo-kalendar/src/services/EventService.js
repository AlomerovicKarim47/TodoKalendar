import axios from 'axios'

class EventService{

    headers=null

    setUserInfo(userInfo){
        this.headers = {
            'Authorization':'Bearer '+ userInfo.token
        }
    }

    async addEvent(event){
        try {
            await axios.post("http://localhost:4000/event", event, {headers:this.headers})
        } catch (error) {
            throw error
        }
    }
    async getEvents(today, kats){
        
        try{
            let params = ""
            if (kats)
            {
                params = "?kategorija="
                for (var i = 0; i < kats.length-1; i++)
                    params += kats[i]+ ","
                params += kats[kats.length - 1]
            }
            let events = await axios.get("http://localhost:4000/events/"+today+params, {headers:this.headers})
            return events
        }
        catch(error){
            throw error
        }
    }

    async deleteEvent(event){
        try {
            await axios.delete("http://localhost:4000/event/" + event,{headers:this.headers})
        } catch (error) {
            throw error
        }
    }

    async editEvent(event){
        try {
            await axios.put("http://localhost:4000/event", event,{headers:this.headers})
        } catch (error) {
            throw error
        }
    }

    async getEvent(id){
        try {
            let event = await axios.get("http://localhost:4000/event/" + id,{headers:this.headers})
            return event
        } catch (error) {
            throw error
        }
    }

    async getKategorije(){
        try {
            let kategorije = await axios.get("http://localhost:4000/kategorije",{headers:this.headers})
            return kategorije
        } catch (error) {
            throw error
        }
    }

    async addKategorija(kat){
        try {
            await axios.post("http://localhost:4000/kategorija", kat,{headers:this.headers})
        } catch (error) {
            throw error
        }
    }

    async toggleGotov(id){
        try {
            await axios.put("http://localhost:4000/event/" + id,null, {headers:this.headers})
        } catch (error) {
            throw error
        }
    }

    async searchEvents(term){
        try {
            let events = await axios.get("http://localhost:4000/searchEvents/" + term,{headers:this.headers})
            return events
        } catch (error) {
            throw error
        }
    }

    async login(creds){
        try {
            let info = await axios.post("http://localhost:4000/login", creds,{headers:this.headers})
            return info.data
        } catch (error) {
            throw error
        }
    }

    async register(user){
        try {
            await axios.post("http://localhost:4000/register", user, {headers:this.headers})
        } catch (error) {
            throw error
        }
    }

    async shareEvent(id){
        try {
            let shareCode = await axios.get("http://localhost:4000/share/"+id, {headers:this.headers})
            return shareCode.data
        } catch (error) {
            throw error
        }
    }

    async getSharedEvent(code){
        try {
            let event = await axios.get("http://localhost:4000/sharedEvent/"+code, {headers:this.headers})
            return event.data
        } catch (error) {
            throw error
        }
    }

    async deleteKategorija(kat){
        try {
            await axios.delete("http://localhost:4000/kategorija/" + kat, {headers:this.headers})
        } catch (error) {
            throw error
        }
    }
}

export default EventService