export const RESULTS = 'RESULTS';
export const SET_ITEM_DIALOG_DATA = 'SET_ITEM_DIALOG_DATA';
export const SHOW_ORDERS_DRAWER = 'SHOW_ORDERS_DRAWER';
export const SET_OPEN_ORDERS = 'SET_OPEN_ORDERS';
export const SET_USER = 'SET_USER';


export function setResults(results) {
    return {
        type: RESULTS,
        data: results
    }
}

export function setItemDialogData(data, flag) {
    return {
        type: SET_ITEM_DIALOG_DATA,
        data: data,
        flag: flag
    }
}

export function showOrdersDrawer(flag) {
    return {
        type: SHOW_ORDERS_DRAWER,
        flag: flag
    }
}

export function setOpenOrders(data) {
    return {
        type: SET_OPEN_ORDERS,
        data: data
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        user: user
    }
}
