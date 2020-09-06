import React, { useState , useEffect } from "react";
import {View, Text, TouchableOpacity, Image, Dimensions, I18nManager, Switch, Linking} from 'react-native';
import {Icon} from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem,} from '@react-navigation/drawer';
import styles from '../../assets/style';
import {useDispatch, useSelector} from "react-redux";
import i18n from "../../locale/i18n";


import Home                     from "../components/Home";
import Language                 from "../components/Language";
import Notification             from "../components/Notification";
import About                    from "../components/About";
import Terms                    from "../components/Terms";
import InitScreen               from "../components/InitScreen";

const MainStack         = createStackNavigator();
const HomeStack         = createStackNavigator();
const CommonStack       = createStackNavigator();
const Drawer            = createDrawerNavigator();


function CustomDrawerContent(props) {

    const lang      = useSelector(state => state.lang.lang);

    const dispatch  = useDispatch();

    return (
        <DrawerContentScrollView {...props} style={[styles.bg_White, styles.bgFullWidth]}>



        </DrawerContentScrollView>
    );

}


export function CommonStackNavigator()  {
    return(
        <CommonStack.Navigator mode={'card'} screenOptions={{headerShown: false}} >
            <CommonStack.Screen name='initScreen' options={{headerShown:false}} component={InitScreen}/>
            <CommonStack.Screen name='home' options={{headerShown:false}} component={Home}/>
            <CommonStack.Screen name='about' options={{headerShown:false}} component={About}/>
            <CommonStack.Screen name='terms' options={{headerShown:false}} component={Terms}/>
            <CommonStack.Screen name='AboutCommission' options={{headerShown:false}} component={Terms}/>
            <CommonStack.Screen name='language' options={{headerShown:false}} component={Language}/>
            <CommonStack.Screen name='notification' options={{headerShown:false}} component={Notification}/>
        </CommonStack.Navigator>
    );
}

export function HomeStackStackNavigator()  {
    return(
        <HomeStack.Navigator mode={'card'} screenOptions={{headerShown: false}} >
            <HomeStack.Screen name='commonStack' options={{headerShown:false}} component={CommonStackNavigator}/>
        </HomeStack.Navigator>
    );
}

function MyDrawer() {

    return (
        <Drawer.Navigator
            drawerStyle={[
                styles.Width_100, styles.height_full
            ]}
            drawerContentOptions={{
                itemStyle       : [],
                labelStyle      : [],
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="homeStack" component={HomeStackStackNavigator} options={{headerShown:false}}/>
        </Drawer.Navigator>
    );
}


export function MainStackNavigator()  {
    return(
        <MainStack.Navigator mode={'card'} screenOptions={{headerShown: false}}  >
            <MainStack.Screen name='myDrawer' options={{headerShown:false}} component={MyDrawer}/>
        </MainStack.Navigator>
    );
}

