import {ACTIONS} from './actions';


const initialState = {
    loggedIn: false,
    activeRegistration: false,
}

const loginReduсer = (state = initialState, action) => {
    switch(action.type) {
        
        case ACTIONS.LOG_IN_ACCOUNT:
            return {
                ...state,
                loggedIn: true,
            }

        case ACTIONS.REMOVE_FROM_READYTASKS:
            return {
                ...state,
                readyTasks: state.readyTasks.filter(item => item.id !== action.task.id), 
            }

        case ACTIONS.ADD_TO_PROGRESSTASKS:
            return {
                ...state,
                readyTasks: state.readyTasks.filter(item => item.id !== action.task.id),
            }


        case ACTIONS.CLICK_BTN_READY:
            return {
                ...state,
                clickedBtnReady: !state.clickedBtnReady,
            }

        
        case ACTIONS.CLICK_SELECT_READY:
            return {
                ...state,
                clickedSelectReady: !state.clickedSelectReady,
            }


        case ACTIONS.ADD_DESCRIPTION_READY:
            return {
                ...state,
                readyTasks: state.readyTasks.map((item, index) => {
                    if (index === action.indexReady) {return {...item, discription: action.textareaValue}}
                    else {return item}
                })
            }


        default:
            return state
    }
}





export default loginReduсer;