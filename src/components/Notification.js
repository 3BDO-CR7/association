import React, { useState , useEffect } from "react";
import {View, Text, Image} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import { useSelector, useDispatch } from 'react-redux';
import { allNotifications } from '../actions';

function Notification({navigation}) {

    const lang                          = useSelector(state => state.lang.lang);
    const [deviceId, setDeviceId]       = useState(1);
    const notifications                 = useSelector(state => state.article.notifications ? state.article.notifications : []);
    const dispatch                      = useDispatch();

    function fetchData(){
        dispatch(allNotifications(lang, deviceId));
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
                        { i18n.t('notificatio') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.position_R ]}>

                <View style={[ styles.position_A, styles.top_0, styles.right_0, styles.Width_100, ]}>
                    <Image
                        style={[styles.Width_100, { height : 190 }]}
                        source={require('../../assets/image/bg5.png')}
                        resizeMode='contain'
                    />
                </View>

                <View style={[ styles.Width_100, styles.paddingHorizontal_10 ]}>

                    {
                        notifications.map((noty) => {
                                return (
                                    <View style={[ styles.Width_100, styles.overHidden ]}>
                                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.Width_100]}>
                                            <View style={[ styles.paddingVertical_15 ,styles.bg_White, styles.Radius_10, styles.paddingHorizontal_10, styles.marginVertical_10, styles.border_green, { borderLeftWidth : 7 } ]}>
                                                <View style={[ styles.rowGroup ]}>
                                                    <Text style={[ styles.textSize_16, styles.FairuzBold, styles.text_black, styles.textDir ]}>
                                                        { noty.title }
                                                    </Text>
                                                    <Text style={[ styles.textSize_16, styles.FairuzNormal, styles.text_bold_gray, styles.textDir ]}>
                                                        { noty.date }
                                                    </Text>
                                                </View>
                                                <Text style={[ styles.textSize_16, styles.FairuzNormal, styles.text_bold_gray, styles.textDir ]}>
                                                    { noty.body }
                                                </Text>
                                            </View>
                                        </Animatable.View>
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

export default Notification;
