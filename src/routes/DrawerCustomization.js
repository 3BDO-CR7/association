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
import Questions from "../components/Questions";
import AddOrder from "../components/AddOrder";
import AddLocation from "../components/AddLocation";

const MainStack         = createStackNavigator();
const HomeStack         = createStackNavigator();
const CommonStack       = createStackNavigator();
const Drawer            = createDrawerNavigator();


function CustomDrawerContent(props) {

    const lang      = useSelector(state => state.lang.lang);

    const dispatch  = useDispatch();

    return (
        <DrawerContentScrollView {...props} style={[styles.bg_White, styles.bgFullWidth]}>

            <View style={[ styles.bg_off, styles.position_A, styles.Width_100, styles.height_100 ,{ top: 0 } ]}/>

            <View style={[ styles.rowGroup, styles.paddingVertical_15, styles.paddingHorizontal_15, styles.top_25 ]}>
                <Text style={[ styles.textSize_18, styles.FairuzNormal ]}>
                    { i18n.t('menu') }
                </Text>
                <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                    <Image
                        style={[styles.width_20, styles.height_20]}
                        source={require('../../assets/image/close.png')}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>

            <View style={[ styles.position_R, ]}>

                <View style={[ styles.position_R, styles.right_0, styles.Width_100, { top : -13 } ]}>
                    <Image
                        style={[styles.Width_100, { height : 190 }]}
                        source={require('../../assets/image/bg5.png')}
                        resizeMode='contain'
                    />
                </View>

                <View style={[ styles.paddingHorizontal_10, styles.paddingVertical_10, styles.position_R ]}>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('commonStack', {screen: 'notification'})}
                        style={[ styles.rowGroup, styles.borderBottom, styles.border_dash, styles.paddingVertical_15, styles.paddingHorizontal_5 ]}>
                        <View style={[ styles.rowIng ]}>
                            <Image
                                style={[styles.width_20, styles.height_20, styles.marginHorizontal_10]}
                                source={require('../../assets/image/notification.png')}
                                resizeMode='contain'
                            />
                            <Text style={[ styles.textSize_16, styles.FairuzNormal ]}>
                                { i18n.t('notificatio') }
                            </Text>
                        </View>
                        <View>
                            <Image
                                style={[styles.width_20, styles.height_20]}
                                source={require('../../assets/image/arrow.png')}
                                resizeMode='contain'
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('commonStack', {screen: 'about'})}
                        style={[ styles.rowGroup, styles.borderBottom, styles.border_dash, styles.paddingVertical_15, styles.paddingHorizontal_5 ]}>
                        <View style={[ styles.rowIng ]}>
                            <Image
                                style={[styles.width_20, styles.height_20, styles.marginHorizontal_10]}
                                source={require('../../assets/image/info.png')}
                                resizeMode='contain'
                            />
                            <Text style={[ styles.textSize_16, styles.FairuzNormal ]}>
                                { i18n.t('aboutApp') }
                            </Text>
                        </View>
                        <View>
                            <Image
                                style={[styles.width_20, styles.height_20]}
                                source={require('../../assets/image/arrow.png')}
                                resizeMode='contain'
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('commonStack', {screen: 'questions'})}
                        style={[ styles.rowGroup, styles.borderBottom, styles.border_dash, styles.paddingVertical_15, styles.paddingHorizontal_5 ]}>
                        <View style={[ styles.rowIng ]}>
                            <Image
                                style={[styles.width_20, styles.height_20, styles.marginHorizontal_10]}
                                source={require('../../assets/image/questions.png')}
                                resizeMode='contain'
                            />
                            <Text style={[ styles.textSize_16, styles.FairuzNormal ]}>
                                { i18n.t('FAQs') }
                            </Text>
                        </View>
                        <View>
                            <Image
                                style={[styles.width_20, styles.height_20]}
                                source={require('../../assets/image/arrow.png')}
                                resizeMode='contain'
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('commonStack', {screen: 'terms'})}
                        style={[ styles.rowGroup, styles.borderBottom, styles.border_dash, styles.paddingVertical_15, styles.paddingHorizontal_5 ]}>
                        <View style={[ styles.rowIng ]}>
                            <Image
                                style={[styles.width_20, styles.height_20, styles.marginHorizontal_10]}
                                source={require('../../assets/image/terms.png')}
                                resizeMode='contain'
                            />
                            <Text style={[ styles.textSize_16, styles.FairuzNormal ]}>
                                { i18n.t('terms') }
                            </Text>
                        </View>
                        <View>
                            <Image
                                style={[styles.width_20, styles.height_20]}
                                source={require('../../assets/image/arrow.png')}
                                resizeMode='contain'
                            />
                        </View>
                    </TouchableOpacity>

                </View>

            </View>

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
            <CommonStack.Screen name='questions' options={{headerShown:false}} component={Questions}/>
            <CommonStack.Screen name='addorder' options={{headerShown:false}} component={AddOrder}/>
            <CommonStack.Screen name='addlocation' options={{headerShown:false}} component={AddLocation}/>
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

