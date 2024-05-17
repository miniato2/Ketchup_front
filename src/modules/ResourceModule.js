import { createActions, handleActions } from "redux-actions";

const initialState = [{
    rscNo: '',
    rscCategory: '',
    rscName: '',
    rscInfo: '',
    rscCap: '',
    rscIsAvailable: '',
    rscDescr: ''
}];

const GET_RESOURCES = 'resources/GET_RESOURCES';

export const {resources: {getResources}} = createActions({
    [GET_RESOURCES]: (res) => ({resourcelist: res})
});

const resourceReducer = handleActions(
    {
        [GET_RESOURCES]: (state, {payload}) => {
            return payload;
        }
    }, initialState
);

export default resourceReducer;