import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title, Textarea} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import { useSelector, useDispatch } from 'react-redux';
import { getBlogs } from '../actions';

function Notification({navigation}) {

    const lang          = useSelector(state => state.lang.lang);


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
                        { i18n.t('noty') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={styles.bgFullWidth} style={{ backgroundColor : '#f5f6f9' }}>

                <View style={[ styles.Width_100, styles.paddingHorizontal_10 ]}>

                    <View style={[ styles.Width_100, styles.overHidden ]}>
                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.Width_100]}>
                            <View style={[ styles.paddingVertical_15, styles.rowGroup ,styles.bg_White, styles.Radius_10, styles.paddingHorizontal_10, styles.marginVertical_10, styles.border_purple, { borderLeftWidth : 7 } ]}>
                                <View style={[ styles.flex_20, styles.flexCenter ]}>
                                    <Text style={[styles.FairuzBold , styles.text_light_gray, styles.textSize_16]}>
                                        20 / 9
                                    </Text>
                                    <Text style={[styles.FairuzBold , styles.text_light_gray, styles.textSize_14]}>
                                        اليوم
                                    </Text>
                                </View>
                                <View style={[ styles.flex_80, styles.flexLeft, styles.paddingHorizontal_10, styles.borderLeft, styles.border_light_gray ]}>
                                    <Text style={[styles.FairuzBold , styles.text_purple, styles.textSize_16]}>
                                        من التطبيق
                                    </Text>
                                    <Text style={[styles.FairuzBold , styles.text_light_gray, styles.textSize_14]}>
                                        تم إسال طلب سعر علي طلبك
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.push('DetailsOrder')}>
                                        <Text style={[styles.FairuzBold , styles.text_orange, styles.textSize_14, styles.textDecoration]}>
                                            { i18n.t('show') }
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animatable.View>
                    </View>

                    <View style={[ styles.Width_100, styles.overHidden ]}>
                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.Width_100]}>
                            <View style={[ styles.paddingVertical_15, styles.rowGroup ,styles.bg_White, styles.Radius_10, styles.paddingHorizontal_10, styles.marginVertical_10, styles.border_orange, { borderLeftWidth : 7 } ]}>
                                <View style={[ styles.flex_20, styles.flexCenter ]}>
                                    <Text style={[styles.FairuzBold , styles.text_light_gray, styles.textSize_16]}>
                                        20 / 9
                                    </Text>
                                    <Text style={[styles.FairuzBold , styles.text_light_gray, styles.textSize_14]}>
                                        اليوم
                                    </Text>
                                </View>
                                <View style={[ styles.flex_80, styles.flexLeft, styles.paddingHorizontal_10, styles.borderLeft, styles.border_light_gray ]}>
                                    <Text style={[styles.FairuzBold , styles.text_purple, styles.textSize_16]}>
                                        من التطبيق
                                    </Text>
                                    <Text style={[styles.FairuzBold , styles.text_light_gray, styles.textSize_14]}>
                                        تم إسال طلب سعر علي طلبك
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.push('DetailsOrder')}>
                                        <Text style={[styles.FairuzBold , styles.text_orange, styles.textSize_14, styles.textDecoration]}>
                                            { i18n.t('show') }
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animatable.View>
                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default Notification;
