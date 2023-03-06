export const ACTIONS = {
    LOG_IN_ACCOUNT: 'LOG_IN_ACCOUNT',
    LOG_OUT_ACCOUNT: 'LOG_IN_ACCOUNT',
    DISPLAY_REGISTRATION: 'DISPLAY_REGISTRATION',
    DISPLAY_AUTHORIZATION: 'DISPLAY_AUTHORIZATION',
}


// войти в личный кабинет
export const logInAccount = () => {
    return {
        type: ACTIONS.LOG_IN_ACCOUNT,
    }
}

// выйти из личного кабинета
export const logOutAccount = () => {
    return {
        type: ACTIONS.LOG_OUT_ACCOUNT,
    }
}

// сделать активной форму регистрации
export const displayRegistration = () => {
    return {
        type: ACTIONS.DISPLAY_REGISTRATION,
    }
}

// сделать активной форму авторизации
export const displayAuthorization = () => {
    return {
        type: ACTIONS.DISPLAY_AUTHORIZATION,
    }
}








// добавляем задачу в ready и удаляем ее из backlog
export const addToReadyTasks = (task) => {
    return {
        type: ACTIONS.ADD_TO_READYTASKS,
        task,
    }
}

// добавляем задачу в progress и удаляем ее из ready
export const addToProgressTasks = (task) => {
    return {
        type: ACTIONS.ADD_TO_PROGRESSTASKS,
        task,
    }
}

// добавляем задачу в finished и удаляем ее из progress
export const addToFinishedTasks = (task) => {
    return {
        type: ACTIONS.ADD_TO_FINISHEDTASKS,
        task,
    }
}

// удаляем задачу из backlog
export const removeFromBacklogTasks = (task) => {
    return {
        type: ACTIONS.REMOVE_FROM_BACKLOGTASKS,
        task,
    }
}

// удаляем задачу из ready
export const removeFromReadyTasks = (task) => {
    return {
        type: ACTIONS.REMOVE_FROM_READYTASKS,
        task,
    }
}

// удаляем задачу из progress
export const removeFromProgressTasks = (task) => {
    return {
        type: ACTIONS.REMOVE_FROM_PROGRESSTASKS,
        task,
    }
}

// удаляем задачу из finished
export const removeFromFinishedTasks = (task) => {
    return {
        type: ACTIONS.REMOVE_FROM_FINISHEDTASKS,
        task,
    }
}


// отобразить/скрыть инпут при нажатии на кнопку в backlog
export const clickBtnBacklog = () => {
    return {
        type: ACTIONS.CLICK_BTN_BACKLOG
    }
}

// изменить значение инпута в стейте 
export const changeInput = (value) => {
    return {
        type: ACTIONS.CHANGE_INPUT,
        value,
    }
}

// отобразить поле для описания на индивидуальной странице задачи
export const changeTextarea = (event) => {
    return {
        type: ACTIONS.CHANGE_TEXTAREA,
        event
    }
}


// добавляем опсание к задаче баклога из текстареа
export const addDescriptionBacklog = (indexBacklog, textareaValue) => {
    return {
        type: ACTIONS.ADD_DESCRIPTION_BACKLOG,
        indexBacklog, 
        textareaValue,
    }
}


















