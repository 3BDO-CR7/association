import axios from "axios";
import CONST from "../consts";
import { Toast } from 'native-base';

export const addOrder = (data, navigation) => {
    return (dispatch) => {
        axios.post(`${CONST.url}add-order`, {
            lang            : data.lang,
            name            : data.name,
            phone           : data.phone,
            date            : data.date,
            time            : data.time,
            category_id     : data.productId,
            lat             : data.lat,
            lng             : data.lng,
            device_id       : data.deviceId,
            images          : data.images,
            device_type     : data.deviceType,
        }).then( (response)=> {

            if (response.data.success === true) {
                navigation.navigate('home');
            }

            Toast.show({
                text        	: response.data.message,
                type			: response.data.success === true ? "success" : "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'FairuzBlack',
                    textAlign   	: 'center'
                }
            });

            dispatch({type: 'addOrder', payload: response.data});

        }).catch(err => {
            console.log('err', err);
        });
    }
};
