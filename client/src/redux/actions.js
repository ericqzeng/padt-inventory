export const RESULTS = 'RESULTS';
export const SET_ITEM_DIALOG_DATA = 'SET_ITEM_DIALOG_DATA';

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
