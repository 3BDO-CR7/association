import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity,ScrollView} from "react-native";
import {Container, Content, Header, Button, Left, Body, Right, Title, Icon} from 'native-base'
import styles from '../../assets/style';
import * as Animatable from 'react-native-animatable';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import { getBlogs } from '../actions';

function Home({navigation}) {

    const [toggle , setToggle]              = useState(false);
    const lang                              = useSelector(state => state.lang.lang);
    const blog                              = useSelector(state => state.blog.blog);
    const dispatch                          = useDispatch();

    function fetchData(){
        dispatch(getBlogs(lang));
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
                    <Button style={[styles.Button ]} transparent onPress={() => navigation.openDrawer()}>
                        <Image
                            style={[styles.width_30, styles.height_20]}
                            source={require('../../assets/image/menu.png')}
                        />
                    </Button>
                </Left>
                <Body style={[styles.bodyText, styles.position_R, styles.top_15]}>
                    <Title style={[styles.FairuzBold , styles.text_black, styles.textSize_18,]}>
                        { i18n.t('head') }
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

                <View style={[ styles.rowGroup, styles.paddingHorizontal_5, styles.paddingVertical_10 ]}>
                    {
                        blog.map((blog) => {
                                return (
                                    <View style={[ styles.overHidden, styles.flex_50, styles.paddingHorizontal_5 ]}>
                                        <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.Width_100]}>
                                            <TouchableOpacity onPress={() => navigation.push('addorder', { blog_id : blog.id })} style={[ styles.Width_100, styles.marginVertical_5 ]}>
                                                <View style={[styles.bg_White, styles.Width_100, styles.Radius_15, styles.Border, styles.border_dash, styles.overHidden, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.flexCenter ]}>
                                                    <View style={[ styles.overHidden , styles.position_R, styles.height_150, styles.Width_100]}>
                                                        <Image
                                                            style={[styles.Width_100, styles.height_150, styles.Radius_10]}
                                                            source={{ uri : blog.image }}
                                                        />
                                                    </View>
                                                    <View style={[ styles.paddingHorizontal_5, styles.marginTop_15 ]}>
                                                        <View style={[ styles.rowGroup ]}>
                                                            <Text style={[styles.FairuzBold , styles.text_purple, styles.textSize_16]} numberOfLines={1} ellipsizeMode='tail'>
                                                                { blog.name }
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
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

export default Home;
