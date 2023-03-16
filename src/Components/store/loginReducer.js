import {ACTIONS} from './actions';



const initialState = {
    activeRegistration: false,
    passwordVisible: false,
    sendingRespAut: '',
    messageRespAut: '',
    expireRespAut: '',
    // loggedIn: false,
}

const loginReduсer = (state = initialState, action) => {
    switch(action.type) {

        case ACTIONS.DISPLAY_REGISTRATION:
            return {
                ...state,
                activeRegistration: true,
            }

        case ACTIONS.DISPLAY_AUTHORIZATION:
            return {
                ...state,
                activeRegistration: false,
            }

        case ACTIONS.SHOW_HIDE_PASSWORD:
            return {
                ...state,
                passwordVisible: !state.passwordVisible,
            }

        case ACTIONS.SEND_REQUEST_AUT:
            return {
                ...state,
                sendingRespAut: action.flag,
            }

        case ACTIONS.GET_RESPONSE_AUT:
            if (state.sendingRespAut === 200) {
                return {
                    ...state,
                    expireRespAut: action.response,
                    messageRespAut: '',
                }
            } else {
                return {
                    ...state,
                    messageRespAut: action.response,
                    expireRespAut: '',
                }
            }
            


        case ACTIONS.LOG_IN_ACCOUNT:
            return {
                ...state,
                loggedIn: true,
            }

        case ACTIONS.LOG_OUT_ACCOUNT:
            return {
                ...state,
                loggedIn: false,
            }





            


        // case ACTIONS.REMOVE_FROM_READYTASKS:
        //     return {
        //         ...state,
        //         readyTasks: state.readyTasks.filter(item => item.id !== action.task.id), 
        //     }

        // case ACTIONS.ADD_TO_PROGRESSTASKS:
        //     return {
        //         ...state,
        //         readyTasks: state.readyTasks.filter(item => item.id !== action.task.id),
        //     }


        // case ACTIONS.CLICK_BTN_READY:
        //     return {
        //         ...state,
        //         clickedBtnReady: !state.clickedBtnReady,
        //     }

        
        // case ACTIONS.CLICK_SELECT_READY:
        //     return {
        //         ...state,
        //         clickedSelectReady: !state.clickedSelectReady,
        //     }


        // case ACTIONS.ADD_DESCRIPTION_READY:
        //     return {
        //         ...state,
        //         readyTasks: state.readyTasks.map((item, index) => {
        //             if (index === action.indexReady) {return {...item, discription: action.textareaValue}}
        //             else {return item}
        //         })
        //     }


        default:
            return state
    }
}





export default loginReduсer;