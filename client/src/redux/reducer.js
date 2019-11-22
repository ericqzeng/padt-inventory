import * as acts from './actions'

var initState = {
    data: [],
    itemDialogData: null,
    itemDialog: false
}

/**
 * Reducer for global state
 * @param {object} state previous global state
 * @param {object} action action to reduce with
 */
var reducer = function (state = initState, action) {
    console.log('reducing state...');
    switch (action.type) {
        case acts.RESULTS:
            return {
                ...state,
                data: action.data
            }
        case acts.SET_ITEM_DIALOG_DATA:
            return {
                ...state,
                itemDialogData: action.data,
                itemDialog: action.flag
            }
        default:
            return state
    }
}

export default reducer