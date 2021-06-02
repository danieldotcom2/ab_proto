const SET_FORM = 'forms/SET_FORM'


export const loadForm = (id) => async (dispatch) => {
    const res = await fetch(`/api/forms/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(setForm(data))
    }
}

export const setForm = (form) => {
    return {
        type: SET_FORM,
        form
    }
}

export default function formsReducer(state = {form: {}} ,action) {
    let newState = Object.assign({},state);
    switch (action.type){
        case SET_FORM:
            newState.form = action.form
            return newState
        default:
            return state
    }
}