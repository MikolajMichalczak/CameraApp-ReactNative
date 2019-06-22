import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //selected: this.props.selected
        };
        this.onPressBtn = this.onPressBtn.bind(this);
        this.windowHeight = Dimensions.get("window").height
    }

    onPressBtn() {
        //this.setState({ selected: !this.props.selected });
        this.props.handleBox(this.props.label)
    }

    render() {
        if (this.props.selected) {
            return (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: '3%', marginTop: '2%' }}>
                    <TouchableOpacity
                        style={{
                            width: this.windowHeight / 19,
                            height: this.windowHeight / 19,
                            borderWidth: 1,
                            borderColor: '#ff0066',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 100,
                        }}
                        onPress={this.onPressBtn}>
                        <View style={{
                            width: this.windowHeight / 30,
                            height: this.windowHeight / 30,
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.2)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#ff0066',
                            borderRadius: 100,
                        }}>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ margin: '3%', color: 'white' }}>
                        {this.props.label}
                    </Text>
                </View>
            );
        }
        else {
            return (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: '3%', marginTop: '2%' }}>
                    <TouchableOpacity
                        style={{
                            width: this.windowHeight / 19,
                            height: this.windowHeight / 19,
                            borderWidth: 1,
                            borderColor: '#ff0066',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 100,
                        }}
                        onPress={this.onPressBtn}>
                        <View>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ margin: '3%', color: 'white' }}>
                        {this.props.label}
                    </Text>
                </View>
            );
        }
    }
}

// MyButton.propTypes = {
//     handleBox: PropTypes.func.isRequired,
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     text: PropTypes.string.isRequired
// };

const styles = StyleSheet.create({
});

export default RadioButton;