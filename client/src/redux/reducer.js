import * as acts from './actions'

var initState = {
    data: [],
    addItemDialog: false,
    itemDialogData: null,
    itemDialog: false,
    openOrders: [],
    ordersDrawer: false,
    user: {
        name: '',
        email: '',
        admin: false
    }
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
        case acts.SHOW_ADD_ITEM_DIALOG:
            return {
                ...state,
                addItemDialog: action.flag
            }
        case acts.SET_ITEM_DIALOG_DATA:
            return {
                ...state,
                itemDialogData: action.data,
                itemDialog: action.flag
            }
        case acts.SET_OPEN_ORDERS:
            return {
                ...state,
                openOrders: action.data
            }
        case acts.SHOW_ORDERS_DRAWER:
            return {
                ...state,
                ordersDrawer: action.flag
            }
        case acts.SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}

export default reducer