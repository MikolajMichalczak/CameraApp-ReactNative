import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CircleButton from "./CircleButton";
import { MediaLibrary } from "expo";
import { Dimensions } from 'react-native';
import { BackHandler } from "react-native"
import { ToastAndroid } from 'react-native';

class BigPhoto extends Component {
    static navigationOptions = {
        header: null,
        title: "any title",
        headerStyle: {
            backgroundColor: "#000000",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount = async () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = async () => {
        await this.props.navigation.state.params.refresh()
        this.props.navigation.goBack()
        return true;
    }

    remove = async () => {
        let tab = [];
        tab.push(this.props.navigation.state.params.id)

        if (tab.length > 0) {
            await MediaLibrary.deleteAssetsAsync(tab);
        }
        ToastAndroid.showWithGravity(
            'Usunięto zdjęcie!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    onPressBtn() {
        this.remove()
    }

    render() {
        return (
            <View style={styles.user}>
                <Image
                    resizeMode={'cover'}
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: this.props.navigation.state.params.img }}
                />
                <View style={{ position: 'absolute', right: '4%', top: '2%' }}>
                    <CircleButton width={Dimensions.get("window").height / 13} height={Dimensions.get("window").height / 13} img={require('./trash.png')} handleBox={this.remove}></CircleButton>
                </View>
                <View style={{ position: 'absolute', left: '4%', bottom: '2%' }}>
                    <Text style={{ color: 'white', fontSize: Dimensions.get("window").height / 30 }}>{this.props.navigation.state.params.height}x{this.props.navigation.state.params.width}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    user: {
        flex: 1,
    },
});

export default BigPhoto;