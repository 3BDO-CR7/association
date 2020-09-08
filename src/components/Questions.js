import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Dimensions} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import { allQuestions } from '../actions';
import * as Animatable from "react-native-animatable";



function Questions({navigation}) {

    const lang                          = useSelector(state => state.lang.lang);
    const questions                     = useSelector(state => state.article.data ? state.article.data : []);
    const dispatch                      = useDispatch();

    function fetchData(){
        dispatch(allQuestions(lang));
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

            <Header style={[ styles.headerView, styles.bg_off, styles.Width_100, styles.paddingHorizontal_15, styles.rowGroup ]}>
                <Left style={[ styles.leftIcon,styles.position_R, styles.top_15 ]}>
                    <Button style={[styles.Button ]} transparent onPress={() => navigation.goBack()}>
                        <Image
                            style={[styles.width_30, styles.height_30]}
                            source={lang !== 'ar' || lang == null ? require('../../assets/image/left.png') : require('../../assets/image/right.png')}
                        />
                    </Button>
                </Left>
                <Body style={[ styles.SelfLeft]}>
                    <Title style={[styles.FairuzBold , styles.text_black, styles.textSize_18, { top : 3 }]}>
                        { i18n.t('FAQs') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.position_R ]}>

                <View style={[ styles.position_A, styles.right_0, styles.Width_100, { top : -15 } ]}>
                    <Image
                        style={[styles.Width_100, { height : 190 }]}
                        source={require('../../assets/image/bg5.png')}
                        resizeMode='contain'
                    />
                </View>

                <View style={[ styles.Width_100, styles.paddingHorizontal_10 ]}>
                    {
                        questions.map((quest) => {
                                return (
                                    <View style={[ styles.overHidden, styles.flex_50, styles.paddingHorizontal_5 ]}>
                                        <View style={[ styles.bg_White, styles.Radius_10, styles.paddingVertical_10, styles.paddingHorizontal_10, styles.marginVertical_10, styles.Border, styles.border_dash ]}>
                                            <Text style={[ styles.textSize_16, styles.FairuzNormal, styles.text_green, styles.textDir ]}>{ quest.question }</Text>
                                        </View>
                                        <View style={[ styles.paddingHorizontal_20 ]}>
                                            <Text style={[ styles.textSize_16, styles.FairuzNormal, styles.text_bold_gray, styles.textDir ]}>
                                                { quest.answer }
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }
                        )
                    }
                </View>

            </Content>
        </Container>
    );
}

export default Questions;
