import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';

class MyButton extends Component {
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
                    //backgroundColor: "red",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={this.onPressBtn}><Text style={styles.text}>{this.props.text}</Text></TouchableOpacity>
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
    text: {
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default MyButton;