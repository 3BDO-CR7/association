import React, { useState , useEffect, useRef } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Dimensions} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;
const isIOS = Platform.OS === 'ios';

function AddLocation({navigation, route}) {

    const lang                          = useSelector(state => state.lang.lang);
    const [blogId , setBlogId]          = useState(route.params.blog_id);
    let mapRef                          = useRef(null);
    const [initMap, setInitMap]         = useState(true);
    const dispatch                      = useDispatch();
    const [city, setCity]               = useState('');
    const [mapRegion, setMapRegion]     = useState({
        latitude: 31.2587 ,
        longitude:32.2988,
        latitudeDelta ,
        longitudeDelta
    });

    const fetchData = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let userLocation = {};
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            if (route.params && route.params.latitude){
                userLocation = { latitude: route.params.latitude, longitude:route.params.longitude , latitudeDelta , longitudeDelta};
            } else {
                userLocation = { latitude, longitude , latitudeDelta , longitudeDelta};
            }
            setInitMap(false);
            setMapRegion(userLocation);
            isIOS ? mapRef.current.animateToRegion(userLocation, 1000) : false;
        }
        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity    += userLocation.latitude + ',' + userLocation.longitude;
        getCity    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';
        console.log("getCity  " , getCity)
        // ReactotronConfig.log(getCity);
        try {
            const { data } = await axios.get(getCity);
            setCity(data.results[0].formatted_address)
            // console.log("city  " , data.results[0].formatted_address)
            // console.log("city  " , city)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(  () => {
        fetchData();
    }, []);

    useEffect(  () => {
    }, [city , mapRegion ]);

    const _handleMapRegionChange  = async (mapCoordinate) =>  {

        setMapRegion({ latitude: mapCoordinate.latitude, longitude: mapCoordinate.longitude, latitudeDelta, longitudeDelta});

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += mapCoordinate.latitude + ',' + mapCoordinate.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';

        try {
            const { data } = await axios.get(getCity);
            setCity(data.results[0].formatted_address)

        } catch (e) {
            console.log(e);
        }
    };

    function getLocation(){

        navigation.navigate('addorder', {
            blogId			: blogId,
            mapRegion	    : mapRegion,
            cityName	    : city,
        });

    }

    return (
        <Container>

            <Header style={[ styles.headerView, styles.Width_100, styles.paddingHorizontal_15, styles.rowGroup ]}>
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
                        { i18n.t('location') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.position_R ]}>

                <View style={[styles.bgFullWidth, styles.height_full]}>
                    {
                        !initMap && mapRegion.latitude != null ? (
                            <MapView
                                ref={mapRef}
                                style={{width: '100%', height: '100%', flex: 1}}
                                initialRegion={mapRegion}>
                                <MapView.Marker
                                    draggable
                                    coordinate={mapRegion}
                                    onDragEnd={(e) => _handleMapRegionChange(e.nativeEvent.coordinate)}
                                >
                                    <Image source={require('../../assets/image/pin.png')}
                                           resizeMode={'contain'} style={{width: 35, height: 35}}/>
                                </MapView.Marker>
                            </MapView>
                        ) : (<View/>)
                    }

                    <TouchableOpacity
                        style={[styles.bg_green, styles.width_150, styles.flexCenter, styles.marginVertical_15, styles.height_40, styles.position_A, styles.bottom_10]}
                        onPress={() => getLocation()}>
                        <Text style={[styles.FairuzNormal , styles.textSize_14, styles.text_White]}>
                            {i18n.t('continue')}
                        </Text>
                    </TouchableOpacity>

                </View>

            </Content>
        </Container>
    );
}

export default AddLocation;
