import axios from "axios";
import CONST from "../consts";

//
// export const getBlogs = ( lang, cityId, countryId, categoryId, latitude, longitude, model, page ) => {
//     return (dispatch) => {
//         axios.post(`${CONST.url}get-blogs`, {
//             lang             :  lang,
//             city_id          :  cityId,
//             country_id       :  countryId,
//             category_id      :  categoryId,
//             latitude         :  latitude,
//             longitude        :  longitude,
//             model            :  model,
//             page             :  page
//         }).then( (response)=> {
//
//             dispatch({type: 'getBlogs', payload: response.data});
//
//         }).catch(err => {
//             console.log('err', err);
//         });
//     }
// };
