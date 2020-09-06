import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Dimensions} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import { aboutUs } from '../actions';
import * as Animatable from "react-native-animatable";
import HTML from "react-native-render-html";



function About({navigation}) {

    const lang                          = useSelector(state => state.lang.lang);
    const about                         = useSelector(state => state.article.about ? state.article.about : '');
    const dispatch                      = useDispatch();

    function fetchData(){
        dispatch(aboutUs(lang));
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
                            // source={lang !== 'ar' || lang == null ? require('../../assets/image/left.png') : require('../../assets/image/right.png')}
                        />
                    </Button>
                </Left>
                <Body style={[styles.bodyText,styles.position_R, styles.top_15]}>
                    <Title style={[styles.FairuzBold , styles.text_White, styles.textSize_18, styles.flexLeft]}>
                        { i18n.t('aboutApp') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={styles.bgFullWidth}>

                <View style={[ styles.overHidden, styles.flexCenter ]}>
                    <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.Width_100]}>
                        <Image
                            style={[styles.width_170, styles.height_170]}
                            source={require('../../assets/image/logo.png')}
                            resizeMode='contain'
                        />
                    </Animatable.View>
                </View>

                <View style={[ styles.Width_90, styles.flexCenter, styles.paddingHorizontal_10 ]}>
                    <HTML
                        html                  = {about}
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

export default About;
