import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated, Button, ScrollView } from 'react-native';
import { Camera, Permissions, MediaLibrary } from 'expo';
import { ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import { BackHandler } from "react-native"
import CircleButton from "./CircleButton";
import RadioButton from "./RadioButton";
import RadioGroup from "./RadioGroup";

class CameraScreen extends Component {
    static navigationOptions = {
        header: null,
        title: "Camera",
        headerStyle: {
            backgroundColor: '#ff0066',
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do kamery
            type: Camera.Constants.Type.back,  // typ kamery
            pos: new Animated.Value(Dimensions.get("window").height),  //startowa pozycja y wysuwanego View
            wb: Camera.Constants.WhiteBalance.auto,
            ratio: '4:3',
            fm: Camera.Constants.FlashMode.auto,
            ps: '320x240'
        };
        this.change = this.change.bind(this);
        this.take = this.take.bind(this);
        this.toggle = this.toggle.bind(this);
        this.setCamera = this.setCamera.bind(this);
        this.isHidden = true
        this.windowHeight = Dimensions.get("window").height
        this.windowWidth = Dimensions.get("window").width
        console.log(Camera.Constants.WhiteBalance)
        console.log(Camera.Constants.FlashMode)
    }

    toggle() {
        if (this.isHidden) toPos = 0; else toPos = Dimensions.get("window").height
        //animacja
        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
            }
        ).start();

        this.isHidden = !this.isHidden;
    }


    componentWillMount = async () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status == 'granted' });
        this.getSizes()
    }
    getSizes = async () => {
        if (this.camera) {
            const sizes2 = await this.camera.getAvailablePictureSizesAsync('16:9')
            const sizes = await this.camera.getAvailablePictureSizesAsync('4:3')
            console.log(JSON.stringify(sizes, null, 4))
            console.log(JSON.stringify(sizes2, null, 4))
        }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = async () => {
        await this.props.navigation.state.params.refresh()
        this.props.navigation.goBack()
        return true;
    }

    change() {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        });
    }

    take = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyslnie zapisuje w DCIM
            ToastAndroid.showWithGravity(
                'Zrobiono zdjęcie!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            //console.log(JSON.stringify(asset, null, 4))
        }
    }

    setCamera(type, groupName) {
        //console.log(type, groupName)
        switch (groupName) {
            case 'WHITE BALANCE':
                if (type == 'auto')
                    this.setState({ wb: Camera.Constants.WhiteBalance.auto })
                else if (type == 'cloudy')
                    this.setState({ wb: Camera.Constants.WhiteBalance.cloudy })
                else if (type == 'fluorescent')
                    this.setState({ wb: Camera.Constants.WhiteBalance.fluorescent })
                else if (type == 'incandescent')
                    this.setState({ wb: Camera.Constants.WhiteBalance.incandescent })
                else if (type == 'shadow')
                    this.setState({ wb: Camera.Constants.WhiteBalance.shadow })
                else if (type == 'sunny')
                    this.setState({ wb: Camera.Constants.WhiteBalance.sunny })
                break;
            case 'FLASH MODE':
                if (type == 'auto')
                    this.setState({ fm: Camera.Constants.FlashMode.auto })
                else if (type == 'off')
                    this.setState({ fm: Camera.Constants.FlashMode.off })
                else if (type == 'on')
                    this.setState({ fm: Camera.Constants.FlashMode.on })
                else if (type == 'torch')
                    this.setState({ fm: Camera.Constants.FlashMode.torch })
                break;
            case 'CAMERA RATIO':
                this.setState({ ratio: type })
                break;
            case 'PICTURE SIZES':
                this.setState({ ps: type })
                break;
        }
    }

    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}

                        onCameraReady={() => console.log("camera ready")}
                        ratio={this.state.ratio}
                        whiteBalance={this.state.wb}
                        flashMode={this.state.fm}
                        pictureSize={this.state.ps}

                        style={{ flex: 1, alignItems: 'center' }}
                        type={this.state.type}>
                        <View style={{ flex: 1, width: '60%', flexDirection: 'row', alignItems: 'flex-end', margin: '5%', justifyContent: 'space-between' }}>
                            <CircleButton width={this.windowHeight / 13} height={this.windowHeight / 13} img={require('./change.png')} handleBox={this.change}></CircleButton>
                            <CircleButton width={this.windowHeight / 10} height={this.windowHeight / 10} img={require('./take.png')} handleBox={this.take}></CircleButton>
                            <CircleButton width={this.windowHeight / 13} height={this.windowHeight / 13} img={require('./settings.png')} handleBox={this.toggle}></CircleButton>
                        </View>
                    </Camera>
                    <Animated.View
                        opacity={0.5}
                        style={[
                            styles.animatedView,
                            {
                                transform: [
                                    { translateY: this.state.pos }
                                ],
                                height: this.windowHeight
                            }]} >
                        <View style={{ flex: 1 }}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1, width: this.windowWidth / 2 }}>
                                <Text style={{ color: 'white', marginTop: '10%', marginBottom: '10%', marginLeft: '6%' }}>SETTINGS</Text>
                                <RadioGroup
                                    handleBox={this.setCamera}
                                    data={[{ type: 'auto', selected: true }, { type: 'cloudy', selected: false }, { type: 'fluorescent', selected: false }, { type: 'incandescent', selected: false }, { type: 'shadow', selected: false }, { type: 'sunny', selected: false }]}
                                    groupName={"WHITE BALANCE"} />
                                <RadioGroup
                                    handleBox={this.setCamera}
                                    data={[{ type: 'auto', selected: true }, { type: 'off', selected: false }, { type: 'on', selected: false }, { type: 'torch', selected: false }]}
                                    groupName={"FLASH MODE"} />
                                <RadioGroup
                                    handleBox={this.setCamera}
                                    data={[{ type: '4:3', selected: true }, { type: '16:9', selected: false }]}
                                    groupName={"CAMERA RATIO"} />
                                <RadioGroup
                                    handleBox={this.setCamera}
                                    data={[{ type: "320x240", selected: true }, { type: "480x360", selected: false }, { type: "640x480", selected: false }, { type: "960x720", selected: false }, { type: "1280x720", selected: false }, { type: "1280x960", selected: false }, { type: "1920x1080", selected: false }, { type: "2560x1920", selected: false }, { type: "2880x2160", selected: false }, { type: "3264x1836", selected: false }, { type: "3264x2448", selected: false }, { type: "4000x3000", selected: false }, { type: "4160x2340", selected: false }, { type: "4160x3120", selected: false }]}
                                    groupName={"PICTURE SIZES"} />
                            </ScrollView>
                        </View>
                    </Animated.View>
                </View >
            );
        }
    }
}


const styles = StyleSheet.create({
    animatedView: { position: 'absolute', backgroundColor: 'black' }
});

export default CameraScreen;