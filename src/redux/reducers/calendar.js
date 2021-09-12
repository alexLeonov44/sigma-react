import { CHANGE_EVENT, SET_EVENTS } from "../types/calendar";

let initialState = {
  calendarEvents: [],
 
};

export default function calendar(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return { ...state, calendarEvents:action.events };
      case CHANGE_EVENT: 
      return { ...state,calendarEvents:state.calendarEvents.map(e=>{
        if(e.id === action.changedEvent.id){
         return  e = action.changedEvent
        }
        return e
      }) };
  }
  return state;
}
