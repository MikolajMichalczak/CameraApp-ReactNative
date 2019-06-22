import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

class CircleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onPressBtn = this.onPressBtn.bind(this);
    }

    onPressBtn() {
        this.props.handleBox()
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 100,
                }}
                onPress={this.onPressBtn}>
                <Image style={{ width: '55%', height: '55%' }} source={this.props.img} />
            </TouchableOpacity>
        );
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

export default CircleButton;