import React, { useState , useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { chooseLang } from '../actions';
import {AsyncStorage, View} from "react-native";


function InitScreen({navigation}) {

    const lang                              = useSelector(state => state.lang.lang);
    const dispatch                          = useDispatch();

    function fetchData(){

        if(lang === null) {
            navigation.push('language');
        } else {
            navigation.push('home');
        }

        AsyncStorage.getItem('init').then(init => {
            if (init != 'true'){
                AsyncStorage.setItem('init', 'true');
                dispatch(chooseLang('ar'));
            }

        });
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <View/>
    );

}

export default InitScreen;

