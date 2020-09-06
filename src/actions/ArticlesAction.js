import axios from "axios";
import CONST from "../consts";


// export const aboutUs = ( lang, ) => {
//     return (dispatch) => {
//         axios.post(`${CONST.url}aboutUs`, {
//             lang        : lang ,
//         }).then( (response)=> {
//
//             dispatch({type: 'aboutUs', payload: response.data});
//
//         }).catch(err => {
//             console.log('err', err);
//         });
//     }
// };
//
// export const termsCondition = ( lang, ) => {
//     return (dispatch) => {
//         axios.post(`${CONST.url}termsAndConditions`, {
//             lang        : lang ,
//         }).then( (response)=> {
//
//             dispatch({type: 'termsCondition', payload: response.data});
//
//         }).catch(err => {
//             console.log('err', err);
//         });
//     }
// };
//
// export const siteHelp = ( lang, ) => {
//     return (dispatch) => {
//         axios.post(`${CONST.url}site_help`, {
//             lang        : lang ,
//         }).then( (response)=> {
//
//             dispatch({type: 'siteHelp', payload: response.data});
//
//         }).catch(err => {
//             console.log('err', err);
//         });
//     }
// };
