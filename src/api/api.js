import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.nopaperwork.ca:844/api/events/',
  
});
export const getCalendarEvents =()=>{
  return instance.get(`1bec2050-d5a2-4a6a-a476-8f7a6424ace0/1/502/`)
    .then(({data})=> data)
}
export const changeEventApi =(id,changedEvent)=>{
  return instance.put(`1bec2050-d5a2-4a6a-a476-8f7a6424ace0/${id}`,changedEvent)
    .then(({data})=> data)
}

