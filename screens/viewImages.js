import React from 'react';
import {Modal, View, Image, StyleSheet, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import { copyFile, 
    mkdir, 
    ExternalStorageDirectoryPath, 
    writeFile, unlink, readDir, 
    stat, readFile } from 'react-native-fs';

import {selectedImage} from '../redux/selector';

const PhotoSlider = props => {
    return (
        <View style={{flex: 1, marginVertical: 30, justifyContent: 'center', alignItems: 'center'}}>
            <ImageBackground style={styles.largeView} 
                source={{uri: `file:///${props.image.uri}`}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    largeView: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center', 
        alignItems: 'center'
    },
})


const mapStateToProps = state => {
    return {image: selectedImage(state)};
}

export default connect(mapStateToProps,null)(PhotoSlider);