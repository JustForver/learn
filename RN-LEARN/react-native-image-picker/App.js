/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Dimensions
} from 'react-native';
import ImagePicker from "react-native-image-picker";
const {width,height} = Dimensions.get('window');

export default class App extends Component{
    constructor(props){
        super(props);
        this.state= {
            avatarSource : '',
        }
    }

    _changeAvatar(){
        const photoOptions = {
            title: '选择图像',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            allowsEditing: true,
            storageOptions: {
                skipBackup: true,
            }
        };
        ImagePicker.showImagePicker(photoOptions, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }
    render() {
        return (
            <View style={styles.entirePage}>
                <TouchableHighlight underlayColor={'#DDDDDD'} onPress={this._changeAvatar.bind(this)}>
                    <View style={styles.login}>
                        <Text>点击选择头像：</Text>
                        {(()=>{
                            if(this.state.avatarSource === null){
                                return
                            }else return <Image source={this.state.avatarSource} style={styles.avatar}  />

                        })()}
                        <View style={{flex: 1}}/>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    entirePage: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    login: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff'
    },
    avatar: {
        borderRadius: width * 0.07,
        width: width * 0.14,
        height: width * 0.14,
        overflow: 'hidden'
    }
});

