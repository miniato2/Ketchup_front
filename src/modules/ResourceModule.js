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
const POST_RESOURCES = 'resources/POST_RESOURCES';
const GET_RESOURCEDETAIL = 'resources/GET_RESOURCEDETAIL';

export const {resources: {getResources, postResources, getResourcedetail}} = createActions({
    [GET_RESOURCES]: (res) => ({resourcelist: res}),
    [POST_RESOURCES]: (res) => ({insertResource: res}),
    [GET_RESOURCEDETAIL]: (res) => ({resourcedetail: res})
});

const resourceReducer = handleActions(
    {
        [GET_RESOURCES]: (state, {payload}) => {
            return payload;
        },
        [POST_RESOURCES]: (state, {payload}) => {
            return payload;
        },
        [GET_RESOURCEDETAIL]: (state, {payload}) => {
            return payload;
        }
     }, initialState
);

export default resourceReducer;