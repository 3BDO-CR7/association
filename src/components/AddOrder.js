import React, { useState , useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    KeyboardAvoidingView,
    ScrollView,
    AsyncStorage,
    ActivityIndicator
} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title, Toast, Form, Item, Input, Icon, CheckBox} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import {CameraBrowser} from 'expo-multiple-imagepicker';
import { ImageBrowser } from 'expo-multiple-media-imagepicker';
import * as ImagePicker from 'expo-image-picker';
import { getBlogs, addOrder } from '../actions';
import * as Permissions from "expo-permissions";
import {Notifications} from "expo";

function AddOrder({navigation, route}) {

    const lang                                          = useSelector(state => state.lang.lang);
    const [blogId , setBlogId]                          = useState(route.params.blog_id);
    const [lat , setLat]                                = useState(route.params.mapRegion.latitude);
    const [lng , setLng]                                = useState(route.params.mapRegion.longitude);
    const [cityName , setCityName]                      = useState(route.params.cityName);
    const [loaded, setLoaded]                           = useState(false);
    const [deviceId, setDeviceId]                       = useState('');
    const [deviceType, setDeviceType]                   = useState('android');
    const dispatch                                      = useDispatch();
    const blogs                                         = useSelector(state => state.blog.blog);


    const [name, setName]                               = useState('');
    const [nameStatus, setNameStatus]                   = useState(0);
    const [nameValue]                                   = useState(new Animated.Value(0));

    const [phone, setPhone]                             = useState('');
    const [phoneStatus, setPhoneStatus]                 = useState(0);
    const [phoneValue]                                  = useState(new Animated.Value(0));

    const [datePicker, setDatePicker]                   = useState(false);
    const [date, setDate]                               = useState('');
    const [timePicker, setTimePicker]                   = useState(false);
    const [time, setTime]                               = useState('');

    const [showModalUpload, setShowModalUpload]         = useState(false);

    const [showModalProduct, setShowModalProduct]       = useState(false);
    const [product, setProduct]                         = useState(i18n.t('product'));
    const [productId, setProductId]                     = useState(null);

    const [imageBrowserOpen, setImageBrowserOpen]       = useState(false);
    const [cameraBrowserOpen, setCameraBrowserOpen]     = useState(false);

    const [base64, setBase64]                           = useState([]);
    const [images, setImages]                           = useState([]);
    const [base_64, setBase_64]                         = useState([]);

    function fetchData(){
        dispatch(getBlogs(lang));
        getPermissionAsync();
    }

    const getDeviceId = async () => {
        const {status: existingStatus} = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        const deviceId = await Notifications.getExpoPushTokenAsync();

        setDeviceId(deviceId);

        AsyncStorage.setItem('deviceID', deviceId);
    };

    useEffect(() => {
        getDeviceId()
    }, []);

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);

    function activeInput(type) {

        if (type === 'name' || name !== ''){
            setNameStatus(1);
            const toValue = -30;
            Animated.spring(
                nameValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'phone' || phone !== ''){
            setPhoneStatus(1);
            const toValue = -30;
            Animated.spring(
                phoneValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

    }

    function unActiveInput(type) {

        if (type === 'name' && name === ''){
            setNameStatus(0);
            const toValue   = -3;
            Animated.spring(
                nameValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'phone' && phone === ''){
            setPhoneStatus(0);
            const toValue   = -3;
            Animated.spring(
                phoneValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }
    }

    const validate = () => {

        let isError     = false;
        let msg         = '';

        if (name.length <= 0) {
            isError     = true;
            msg         = i18n.t('namedonor');
        }else if (phone.length <= 0) {
            isError     = true;
            msg         = i18n.t('phone');
        }else if (date.length <= 0) {
            isError     = true;
            msg         = i18n.t('suitedate');
        }else if (time.length <= 0) {
            isError     = true;
            msg         = i18n.t('goodTime');
        }else if (productId === null) {
            isError     = true;
            msg         = i18n.t('product');
        }else if(images.length <= 0){
            isError     = true;
            msg         = i18n.t('prodimage');
        }
        if (msg !== '') {
            Toast.show({
                text        : msg,
                type        : "danger",
                duration    : 3000,
                textStyle       : {
                    color       : "white",
                    fontFamily  : 'FairuzBlack',
                    textAlign   : 'center',
                }
            });
        }
        return isError;
    };

    const toggleDatePicker = () => {
        setDatePicker(!datePicker);
    };

    const doneDatePicker = date => {
        let formatted_date = date.getFullYear() + "-" + ("0"+(date.getMonth() + 1)).slice(-2) + "-" + ("0" +date.getDate()).slice(-2);
        setDatePicker(!datePicker);
        setDate(formatted_date);
    };

    const toggleTimePicker = () => {
        setTimePicker(!timePicker);
    };

    const doneTimePicker = time => {
        let formatted_date = time.getHours() + ":" + time.getMinutes();
        setTimePicker(!timePicker);
        setTime(formatted_date);
    };

    function toggleModal (type) {

        if (type === 'product'){
            setShowModalProduct(!showModalProduct);
        }

        if (type === 'upload'){
            setShowModalUpload(!showModalUpload);
        }

    }

    function selectId(type, id, name) {

        if (type === 'product'){
            setProductId(id);
            setProduct(name);
            setShowModalProduct(!showModalProduct);
        }

    }

    const getPermissionAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    const uploadImages = async (i) => {

        if (i === 0) {

            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect      : [4, 3],
                quality     : .5,
                base64      : true
            });
            if (!result.cancelled) {
                setShowModalUpload(!showModalUpload);
                setBase64(base64.concat(result.uri));
                setImages(images.concat(result.base64));
                data.append("images[]",{
                    uri : result.uri,
                    type : 'image/jpeg',
                    name : result.filename || `temp_image_${result.height}.jpg`
                });

            }

        }else if (i === 1) {

            setImageBrowserOpen(true)

        }
    };

    const imageBrowserCallback = (callback) => {

        callback.then((photos) => {
                photos.map((item,index) => {
                    data.append("images[]",{
                        uri     : item.localUri,
                        type    : 'image/jpeg',
                        name    : item.filename || `temp_image_${index}.jpg`
                    });
                });
                setShowModalUpload(!showModalUpload);
                setImageBrowserOpen(false);
                setCameraBrowserOpen(false);
                console.log('images -=-=-=-=-', images);
                setImages(images.concat(images));
                const imgs = images;
                if (imgs.length !== 0){
                    for (let i = 0; i < imgs.length; i++) {
                        const imageURL = imgs[i].localUri;
                        FileSystem.readAsStringAsync(imageURL, { encoding: 'base64' }).then(imgBase64 => setBase_64.push(imgBase64))
                    }
                } else {
                    console.log('no images')
                }
            }
        ).catch((e) => console.log(e))
    };

    function deleteImg(i) {
        base64.splice(i, 1);
        images.splice(i, 1);
        setBase64([...base64]);
        setImages([...images]);
        console.log('base64 delet', base64.length);
        console.log('images delet', images.length);
    }

    function onSubmit(){
        const err = validate();

        if (!err){
            setLoaded(true);
            const data = { lang, name, phone, date, time, productId, lat, lng, deviceId, images, deviceType };
            dispatch(addOrder(data, navigation, loaded));
            console.log('data -=-=-=-=-=-', data)
        }

    }

    function renderLoader(){
        if (loaded){
            return(
                <View style={[styles.position_A , styles.flexCenter, styles.overlay_white_up, styles.right_0, styles.top_0, styles.Width_100, styles.height_full ,{ zIndex : 999 }]}>
                    <ActivityIndicator animating={true} size="large" color="#006633" />
                    <Text style={[styles.FairuzBold , styles.text_green, styles.textSize_18, styles.marginTop_25]}>
                        { i18n.t('wait') }
                    </Text>
                </View>
            );
        }
    }

    if (imageBrowserOpen) {
        return(<ImageBrowser base64={true} max={5} callback={imageBrowserCallback}/>);
    }

    return (

        <Container>

            { renderLoader() }

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
                        { i18n.t('donaform') }
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

                <View style={[styles.position_R,styles.flexCenter, styles.Width_100, styles.zIndex]}>
                    <KeyboardAvoidingView behavior={'padding'} style={[styles.Width_90 , styles.paddingHorizontal_10]}>
                        <Form style={[styles.flexCenter, styles.Width_100, styles.marginVertical_20]}>

                            <View style={[styles.position_R, styles.height_60, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: nameValue}]}, (nameStatus === 1 ? styles.inAct : styles.unAct) ]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (nameStatus === 1 ? styles.text_green : styles.text_light_gray)]}>
                                        {i18n.translate('namedonor')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_60, styles.Radius_15 ,(nameStatus === 1 ? styles.Active : styles.noActive)]}
                                        onChangeText={(name) => setName(name)}
                                        onBlur={() => unActiveInput('name')}
                                        onFocus={() => activeInput('name')}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_60, styles.flexCenter, styles.marginTop_20]}>
                                <Animated.View style={[styles.position_A, styles.left_10, styles.bg_trans , {transform: [{translateY: phoneValue}]}, (phoneStatus === 1 ? styles.inAct : styles.unAct) ]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (phoneStatus === 1 ? styles.text_green : styles.text_light_gray)]}>
                                        {i18n.translate('phone')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_60, styles.Radius_15 ,(phoneStatus === 1 ? styles.Active : styles.noActive)]}
                                        onChangeText={(phone) => setPhone(phone)}
                                        onBlur={() => unActiveInput('phone')}
                                        onFocus={() => activeInput('phone')}
                                        keyboardType={'number-pad'}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.overHidden, styles.rowGroup, styles.marginTop_20]}>
                                <TouchableOpacity onPress={toggleDatePicker} style={[ styles.Radius_15 , styles.Width_100, styles.height_60 , styles.paddingHorizontal_20, styles.paddingVertical_15 , styles.rowGroup, (date !== '' ? styles.Active :  styles.noActive )]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (date !== '' ? styles.text_green :  styles.text_light_gray )]}>
                                        {i18n.t('suitedate')} : {date}
                                    </Text>
                                    <Icon style={[styles.textSize_20, ( date !== '' ? styles.text_green :  styles.text_light_gray )]} type="AntDesign" name='calendar' />
                                </TouchableOpacity>
                            </View>

                            <DateTimePicker
                                isVisible       = {datePicker}
                                onConfirm       = {doneDatePicker}
                                onCancel        = {toggleDatePicker}
                                mode            = {'date'}
                                minimumDate     = {new Date()}
                            />

                            <View style={[styles.overHidden, styles.rowGroup, styles.marginTop_20]}>
                                <TouchableOpacity onPress={toggleTimePicker} style={[ styles.Radius_15 , styles.Width_100, styles.height_60 , styles.paddingHorizontal_20, styles.paddingVertical_15 , styles.rowGroup, (time !== '' ? styles.Active :  styles.noActive )]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (time !== '' ? styles.text_green :  styles.text_light_gray )]}>
                                        {i18n.t('goodTime')} : {time}
                                    </Text>
                                    <Icon style={[styles.textSize_20, ( time !== '' ? styles.text_green :  styles.text_light_gray )]} type="AntDesign" name='clockcircleo' />
                                </TouchableOpacity>
                            </View>

                            <DateTimePicker
                                isVisible       = {timePicker}
                                onConfirm       = {doneTimePicker}
                                onCancel        = {toggleTimePicker}
                                mode            = {'time'}
                                is24Hour        = {true}
                                minimumDate     = {new Date()}
                            />

                            <View style={[styles.overHidden, styles.rowGroup, styles.marginTop_20]}>
                                <TouchableOpacity onPress={() => toggleModal('product')} style={[ styles.Width_100, styles.height_60, styles.Radius_15 , styles.paddingHorizontal_20, styles.paddingVertical_15 , styles.rowGroup, styles.Border ,(productId !== null ? styles.border_green :  styles.border_light_gray )]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (productId !== null ? styles.text_green : styles.text_light_gray)]}>
                                        { product }
                                    </Text>
                                    <Icon style={[styles.textSize_20, (productId !== null ? styles.text_green : styles.text_light_gray)]} type="AntDesign" name='down' />
                                </TouchableOpacity>
                            </View>

                            <Modal isVisible={showModalProduct} onBackdropPress={() => toggleModal('product')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                    <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15]}>
                                        <Text style={[styles.FairuzBlack, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>
                                            {i18n.t('product')}
                                        </Text>
                                    </View>

                                    <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                        <ScrollView style={{ height : 300, width : '100%' }}>
                                            {
                                                blogs.map((blog) => {
                                                        return (
                                                            <TouchableOpacity
                                                                style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                                onPress             = {() => selectId('product', blog.id, blog.name)}
                                                            >
                                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                                    <CheckBox
                                                                        style               = {[styles.checkBox, styles.bg_purple, styles.border_purple]}
                                                                        color               = {styles.text_White}
                                                                        selectedColor       = {styles.text_White}
                                                                        checked             = {productId === blog.id}
                                                                    />
                                                                    <Text style={[styles.FairuzBlack , styles.text_purple, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                                        {blog.name}
                                                                    </Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    }
                                                )
                                            }
                                        </ScrollView>
                                    </View>

                                </View>
                            </Modal>

                            <View style={[styles.overHidden, styles.rowGroup, styles.marginTop_20]}>
                                <TouchableOpacity onPress={() => toggleModal('upload')} style={[ styles.Width_100, styles.height_60, styles.Radius_15 , styles.paddingHorizontal_20, styles.paddingVertical_15 , styles.rowGroup, styles.Border ,(productId !== null ? styles.border_green :  styles.border_light_gray )]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (productId !== null ? styles.text_green : styles.text_light_gray)]}>
                                        {i18n.t('prodimage')}
                                    </Text>
                                    <Icon style={[styles.textSize_20, (productId !== null ? styles.text_green : styles.text_light_gray)]} type="Fontisto" name='camera' />
                                </TouchableOpacity>
                            </View>

                            <Modal isVisible={showModalUpload} onBackdropPress={() => toggleModal('upload')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                    <View style={[ styles.bg_green, styles.flexCenter, styles.paddingVertical_15, styles.Width_100 ]}>
                                        <Text style={[styles.FairuzBlack, styles.textSize_14, styles.text_White]}>
                                            {i18n.t('choose')}
                                        </Text>
                                    </View>

                                    <TouchableOpacity onPress={() => uploadImages(0)} style={[ styles.Width_100, styles.rowIng , styles.paddingHorizontal_20, styles.paddingVertical_20 ,styles.borderBottom , styles.border_light_gray]}>
                                        <Icon style={[styles.textSize_20, styles.text_black]} type="Entypo" name='camera' />
                                        <Text style={[styles.FairuzBlack, styles.textSize_14, styles.text_black, styles.textDir, styles.marginHorizontal_10]}>
                                            {i18n.t('cam')}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => uploadImages(1)} style={[ styles.Width_100, styles.rowIng, styles.paddingVertical_20 , styles.paddingHorizontal_20]}>
                                        <Icon style={[styles.textSize_20, styles.text_black]} type="Entypo" name='images' />
                                        <Text style={[styles.FairuzBlack, styles.textSize_14, styles.text_black, styles.textDir, styles.marginHorizontal_10]}>
                                            {i18n.t('gall')}
                                        </Text>
                                    </TouchableOpacity>


                                </View>
                            </Modal>

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{marginHorizontal: 20}}>
                                {
                                    base64.map((item,i) => {
                                        return(
                                            <View key={i} style={[ styles.width_70, styles.height_70, styles.marginVertical_10, styles.marginHorizontal_10, styles.Radius_10 ]}>
                                                <Image
                                                    style={[ styles.Width_100, styles.height_full ]}
                                                    source={{uri: item}}
                                                    key={i}
                                                />
                                                <TouchableOpacity onPress={() => {deleteImg(i)}} style={[ styles.position_A, styles.Width_100, styles.height_full, styles.flexCenter, styles.overlay_black, styles.top_0, styles.right_0 ]}>
                                                    <Icon name="close" style={[ styles.textSize_14, styles.text_White ]}/>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>

                            <TouchableOpacity
                                style={[styles.bg_green, styles.Width_100, styles.flexCenter, styles.marginVertical_15, styles.height_60, styles.Radius_15, styles.marginTop_25]}
                                onPress={() => onSubmit()}>
                                <Text style={[styles.FairuzNormal , styles.textSize_16, styles.text_White]}>
                                    {i18n.t('sent')}
                                </Text>
                            </TouchableOpacity>

                        </Form>
                    </KeyboardAvoidingView>
                </View>



            </Content>
        </Container>
    );
}

export default AddOrder;
