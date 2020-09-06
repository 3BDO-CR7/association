import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Dimensions} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import { termsCondition } from '../actions';
import * as Animatable from "react-native-animatable";
import HTML from "react-native-render-html";



function Terms({navigation}) {

    const lang                          = useSelector(state => state.lang.lang);
    const terms                         = useSelector(state => state.article.terms ? state.article.terms : '');
    const dispatch                      = useDispatch();

    function fetchData(){
        dispatch(termsCondition(lang));
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <Container>

            <Header style={[ styles.headerView, styles.bg_purple, styles.Width_100, styles.paddingHorizontal_15, styles.rowGroup ]}>
                <Left style={[ styles.leftIcon, styles.position_R, styles.top_15 ]}>
                    <Button style={[styles.Button ]} transparent onPress={() => navigation.goBack()}>
                        <Image
                            style={[styles.width_25, styles.height_25, styles.Radius_5]}
                            // source={lang !== 'ar' || lang == null ? require('../../assets/image/iconHead/left.png') : require('../../assets/image/iconHead/right.png')}
                        />
                    </Button>
                </Left>
                <Body style={[styles.bodyText,styles.position_R, styles.top_15]}>
                    <Title style={[styles.FairuzBold , styles.text_White, styles.textSize_18, styles.flexLeft]}>
                        { i18n.t('terms') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={styles.bgFullWidth}>

                <View style={[ styles.Width_90, styles.flexCenter, styles.paddingHorizontal_10 ]}>
                    <HTML
                        html                  = {terms}
                        imagesMaxWidth        = {Dimensions.get('window').width}
                        baseFontStyle         = {{
                            fontSize            : 16,
                            fontFamily          : 'FairuzNormal',
                            color               : '#363636',
                            writingDirection    : I18nManager.isRTL ? 'rtl' : 'ltr'
                        }}
                    />
                </View>

            </Content>
        </Container>
    );
}

export default Terms;
