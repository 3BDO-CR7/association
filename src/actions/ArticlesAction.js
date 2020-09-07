import axios from "axios";
import CONST from "../consts";


export const aboutUs = ( lang, ) => {
    return (dispatch) => {
        axios.post(`${CONST.url}app-info`, {
            lang        : lang ,
        }).then( (response)=> {

            dispatch({type: 'aboutUs', payload: response.data});

        }).catch(err => {
            console.log('err', err);
        });
    }
};

export const termsCondition = ( lang, ) => {
    return (dispatch) => {
        axios.post(`${CONST.url}app-info`, {
            lang        : lang ,
        }).then( (response)=> {

            dispatch({type: 'termsCondition', payload: response.data});

        }).catch(err => {
            console.log('err', err);
        });
    }
};

export const allQuestions = ( lang, ) => {
    return (dispatch) => {
        axios.post(`${CONST.url}questions`, {
            lang        : lang ,
        }).then( (response)=> {

            dispatch({type: 'allQuestions', payload: response.data});

        }).catch(err => {
            console.log('err', err);
        });
    }
};

export const allNotifications = ( lang, deviceId) => {
    return (dispatch) => {
        axios.post(`${CONST.url}notifications`, {
            lang                : lang,
            device_id           : deviceId ,
        }).then( (response)=> {

            dispatch({type: 'allNotifications', payload: response.data});

        }).catch(err => {
            console.log('err', err);
        });
    }
};
