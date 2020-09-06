import React, { useState, useEffect } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Body, Button, Container, Content, Header, Icon, Left, Title,} from 'native-base';
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import {useSelector, useDispatch} from 'react-redux';
import { chooseLang } from '../actions';

function Language({navigation}) {

    const [lang, setLang]       = useState('');
    const language              = useSelector(state => state.lang);
    const dispatch              = useDispatch();

    useEffect(() => {
        setLang(language.lang)
    },[]);

    function selectLang(lang) {
        setLang(lang)
    }

    function onChooseLang(){
        dispatch(chooseLang(lang));
        navigation.push('home');
    }

    return (
        <Container style={[ styles.bg_green ]}>

            <Content contentContainerStyle={[ styles.bgFullWidth ]}>

                <View style={[styles.paddingHorizontal_30, styles.paddingVertical_10, styles.bgFullWidth, styles.flexCenter, styles.Width_100 ]}>

                    <View style={[ styles.overHidden, styles.flexCenter, styles.marginVertical_25 ]}>
                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.Width_100]}>
                            <Image
                                style={[styles.width_170, styles.height_170]}
                                source={require('../../assets/image/logo.png')}
                                resizeMode='contain'
                            />
                        </Animatable.View>
                    </View>

                    <View style={[ styles.overHidden, styles.marginVertical_25, styles.SelfLeft ]}>
                        <Text style={[ styles.FairuzBlack, styles.textSize_22, styles.text_White, styles.textDir ]}>
                            { i18n.t('language') }
                        </Text>
                    </View>

                    <View style={[ styles.marginVertical_10, styles.Width_100 ]}>

                        <View style={[styles.overHidden, styles.marginVertical_5]}>
                            <Animatable.View animation="fadeIn" easing="ease-out" delay={500} style={[ styles.marginVertical_5 ]}>
                                <TouchableOpacity
                                    style       = {[ styles.rowGroup, styles.Border, styles.paddingVertical_15, styles.Radius_20, styles.paddingHorizontal_20, ( lang === 'ar' ? styles.border_White : styles.border_light_gray) ]}
                                    onPress     = {() => selectLang('ar')}
                                >
                                    <Text style={[ styles.FairuzBlack, styles.textSize_14,  ( lang === 'ar' ? styles.text_White : styles.text_light_gray) ]}>عربي</Text>
                                    <Icon style={[styles.textSize_24, ( lang === 'ar' ? styles.text_White : styles.text_light_gray)]} type="AntDesign" name={( lang === 'ar' ? 'check' : '')} />
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                        <View style={[styles.overHidden, styles.marginVertical_5]}>
                            <Animatable.View animation="fadeIn" easing="ease-out" delay={500} style={[ styles.marginVertical_5 ]}>
                                <TouchableOpacity
                                    style       = {[ styles.rowGroup, styles.Border, styles.paddingVertical_15, styles.Radius_20, styles.paddingHorizontal_20, ( lang === 'en' ? styles.border_White : styles.border_light_gray) ]}
                                    onPress     = {() => selectLang('en')}
                                >
                                    <Text style={[ styles.FairuzBlack, styles.textSize_14,  ( lang === 'en' ? styles.text_White : styles.text_light_gray) ]}>English</Text>
                                    <Icon style={[styles.textSize_24, ( lang === 'en' ? styles.text_White : styles.text_light_gray)]} type="AntDesign" name={( lang === 'en' ? 'check' : '')} />
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                    </View>


                    <TouchableOpacity
                        style       = {[ styles.bg_White ,styles.marginVertical_30 , styles.Width_100, styles.height_55 , styles.flexCenter, styles.Radius_10]}
                        onPress     = {onChooseLang}
                    >
                        <Text style={[styles.FairuzBlack, styles.textSize_16, styles.text_green]}>
                            { i18n.t('next') }
                        </Text>
                    </TouchableOpacity>

                </View>

            </Content>
        </Container>
    );
}

export default Language;
