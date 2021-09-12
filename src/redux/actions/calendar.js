import { changeEventApi, getCalendarEvents } from "../../api/api";
import { CHANGE_EVENT, SET_EVENTS } from "../types/calendar";

// export const getEvents=()=>{
//     return (dispatch)=>{
//       getCalendarEvents().then(( {events} ) => {
//         dispatch({ type: SET_EVENTS, events })
//       }).catch( error =>  console.error(error));
//     }
// }
export const getEvents = () => {
  return async (dispatch) => {
      try {
          let { events } = await getCalendarEvents();
          dispatch({ type: SET_EVENTS, events })
      } catch (error) {
        console.error(error)
      }
  };
};
export const changeEvent = (id, changedEvent) => {
    return (dispatch) => {
        changeEventApi(id, changedEvent)
            .then(() => {
                dispatch({ type: CHANGE_EVENT, changedEvent });
            })
            .catch((error) => console.error(error));
    };
};


