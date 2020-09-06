import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity,ScrollView} from "react-native";
import {Container, Content, Header, Button, Left, Body, Right, Title, Icon} from 'native-base'
import styles from '../../assets/style';
import * as Animatable from 'react-native-animatable';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import {getBlogs, getCountries, getCitys} from '../actions';

function Home({navigation}) {

    const [toggle , setToggle]              = useState(false);
    const lang                              = useSelector(state => state.lang.lang);
    // const blog                              = useSelector(state => state.blog.blog);
    const dispatch                          = useDispatch();

    // function fetchData(){
    //     dispatch(getCountries(lang));
    // }
    //
    // useEffect(() => {
    //     fetchData();
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         fetchData();
    //     });
    //
    //     return unsubscribe;
    // }, [navigation]);

    function clickToggle(){setToggle(!toggle);}

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

            <Content contentContainerStyle={styles.bgFullWidth}>


            </Content>
        </Container>
    );
}

export default Home;
