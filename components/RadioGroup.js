import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import RadioButton from "./RadioButton";

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            groupName: this.props.groupName
        };
        //this.onPressBtn = this.onPressBtn.bind(this);
        this.windowHeight = Dimensions.get("window").height
        this.windowWidth = Dimensions.get("window").width
        this.check = this.check.bind(this);
    }

    sendToCamera(type, groupName) {
        this.props.handleBox(type, groupName)
    }

    check(type) {
        let tab = [];
        for (let item of this.state.data) {
            if (item.type == type)
                item.selected = !item.selected;
            else
                item.selected = false

            tab.push(item);
        }
        this.setState({ data: tab });
        //console.log(this.state.data)
        this.sendToCamera(type, this.props.groupName);
        // console.log(type)
        // console.log(this.props.groupName)
    }

    render() {
        return (
            <View style={styles.cont}>
                <View style={{ height: this.windowHeight / 300, backgroundColor: 'white', marginLeft: '6%', marginRight: '6%' }}></View>
                <Text style={{ marginTop: '4.5%', marginRight: '6%', textAlign: 'right', color: 'white' }}>{this.state.groupName}</Text>
                <FlatList
                    data={
                        this.state.data
                    }
                    renderItem={({ item }) => <View style={{ flex: 1 }}><RadioButton label={item.type} selected={item.selected} handleBox={this.check} /></View>}
                    keyExtractor={(item, index) => index.toString()}

                />
            </View>
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
    cont: {
        flex: 1
    }
});

export default RadioGroup;