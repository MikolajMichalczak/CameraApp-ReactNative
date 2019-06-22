import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MyButton from "./MyButton"

class FotoItem extends Component {
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
            img: this.props.uri,
            selected: this.props.selected
        };
        this.onLongPressBtn = this.onLongPressBtn.bind(this);
    }

    onPressBtn() {
        this.setState({ selected: !this.state.selected });
        this.props.handleBox(this.props.id)
        console.log(this.props.height)
    }

    onLongPressBtn() {
        this.props.handleBoxLong(this.props.uri, this.props.id, this.props.height, this.props.width)
    }

    render() {
        if (!this.state.selected) {
            return (
                <View style={styles.user}>
                    <TouchableOpacity style={{ padding: '2%' }} onPress={() => this.onPressBtn()} onLongPress={this.onLongPressBtn}>
                        <Image
                            style={{
                                width: this.props.picWidth,
                                height: this.props.picHeight,
                                //position: "absolute"
                            }}
                            source={{ uri: this.state.img }}
                        />
                        <Text style={styles.number}>{this.props.number}</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.user}>
                    <TouchableOpacity style={{ padding: '2%' }} onPress={() => this.onPressBtn()} onLongPress={this.onLongPressBtn}>
                        <Image
                            style={{
                                width: this.props.picWidth,
                                height: this.props.picHeight,
                                borderWidth: 10,
                                borderColor: '#ff0066',
                                opacity: 0.2
                                //position: "absolute"
                            }}
                            source={{ uri: this.state.img }}
                        />
                        <Text style={styles.number}>{this.props.number}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    user: {
        flex: 1,
    },
    number: {
        position: 'absolute',
        left: '3%',
        color: 'white',
        top: '3%'
    }
});

export default FotoItem;