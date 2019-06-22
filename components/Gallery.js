import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Button, Alert, ToolbarAndroid } from 'react-native';
import { MediaLibrary } from 'expo';
import { Permissions } from 'expo';
import { ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import MyButton from "./MyButton";
import FotoItem from "./FotoItem";

class List extends Component {
    static navigationOptions = {
        header: null,
        title: "Gallery",
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
            data: '',
            columns: 4,
            picWidth: '90%',
            picHeight: Dimensions.get("window").height / 8,
            galleryType: 'grid'
        };
        this.galleryType = this.galleryType.bind(this);
        this.check = this.check.bind(this);
        this.remove = this.remove.bind(this);
        this.openCamera = this.openCamera.bind(this);
        this.onActionSelected = this.onActionSelected.bind(this);
        this.onLongPressBtn = this.onLongPressBtn.bind(this);
        this.number;
    }

    componentDidMount = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
        this.refreshPhotos()
    }

    refreshPhotos = async () => {
        let uriTab = []
        let assets = await MediaLibrary.getAssetsAsync({
            first: 16,           // ilość pobranych assetów
            mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
            album: '-2075821635'
        })
        this.number = assets.assets.length
        //console.log(assets.assets)
        for (let item of assets.assets) {
            uriTab.push({ uri: item.uri, id: item.id, selected: false, number: this.number--, width: item.width, height: item.height })
        }
        //console.log(uriTab)
        this.setState({ data: uriTab })
    }

    galleryType() {
        if (this.state.galleryType == 'grid')
            this.setState({ columns: 1, picWidth: '100%', picHeight: Dimensions.get("window").height / 4, galleryType: 'list' })
        else
            this.setState({ columns: 4, picWidth: '95%', picHeight: Dimensions.get("window").height / 8, galleryType: 'grid' })
    }

    check(id) {
        let tab = [];
        for (let item of this.state.data) {
            if (item.id == id) {
                item.selected = !item.selected;
            }
            tab.push(item);
        }
        this.setState({ data: tab });
        //console.log(this.state.data)
    }

    remove = async () => {
        let tab = [];
        for (let item of this.state.data) {
            if (item.selected) {
                tab.push(item.id);
            }
        }
        //console.log(tab)
        if (tab.length > 0) {
            await MediaLibrary.deleteAssetsAsync(tab);
            this.refreshPhotos();
        }
        else {
            ToastAndroid.showWithGravity(
                'Wybierz zdjęcia do usunięcia!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    openCamera() {
        this.props.navigation.navigate("s3", { refresh: this.refreshPhotos })
    }

    onLongPressBtn(_img, _id, _height, _width) {
        this.props.navigation.navigate("s4", { img: _img, refresh: this.refreshPhotos, id: _id, height: _height, width: _width })
    }

    onActionSelected(position) {
        switch (position) {
            case 0:
                this.galleryType()
                break;
            case 1:
                this.openCamera()
                break;
            case 2:
                this.remove()
                break;
        }
    }

    render() {
        return (
            <View style={styles.cont}>
                <ToolbarAndroid
                    style={{
                        backgroundColor: '#ff0066',
                        height: 56, width: "100%",
                        elevation: 5 // cień poniżej
                    }}

                    titleColor="white"
                    title="Gallery"

                    actions={[
                        { title: "Grid / List", show: 'never' },
                        { title: "Open camera", show: 'never' },
                        { title: "Remove selected", show: 'never' }
                    ]}
                    onActionSelected={this.onActionSelected}
                />
                <View style={styles.pics}>
                    <FlatList
                        data={
                            this.state.data
                        }
                        renderItem={({ item }) => <FotoItem uri={item.uri} id={item.id} selected={item.selected} picWidth={this.state.picWidth} picHeight={this.state.picHeight} number={item.number} handleBox={this.check} handleBoxLong={this.onLongPressBtn} width={item.width} height={item.height} />}
                        numColumns={this.state.columns}
                        key={this.state.columns}
                        keyExtractor={(item, index) => index.toString()}

                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
    },
    btn: {
        //backgroundColor: 'yellow',
        flex: 1,
        //marginBottom: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pics: {
        marginTop: '5%',
        flex: 11,
        //backgroundColor: 'blue',
    }
});

export default List;