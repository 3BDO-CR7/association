import axios from "axios";
import CONST from "../consts";


export const getBlogs = ( lang ) => {
    return (dispatch) => {
        axios.post(`${CONST.url}categories`, {
            lang             :  lang,
        }).then( (response)=> {

            dispatch({type: 'getBlogs', payload: response.data});

        }).catch(err => {
            console.log('err', err);
        });
    }
};
