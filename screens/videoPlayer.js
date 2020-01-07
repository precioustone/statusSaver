import React from 'react';
import {Modal, Text,
    View, 
    PermissionsAndroid, 
    TouchableHighlight, 
    FlatList, Image, 
    StyleSheet, 
    ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import { copyFile, 
    mkdir, 
    ExternalStorageDirectoryPath, 
    writeFile, unlink, readDir, 
    stat, readFile } from 'react-native-fs';

import {selectedVideo} from '../redux/selector';

import VideoPlayer from '../components/video-player';

const Player = props => {
    return (<View style={{flex: 1, width: '100%'}}>
        <VideoPlayer source={props.video} />
    </View>)
}

const mapStateToProps = state => {
    return {video: selectedVideo(state)};
}

export default connect(mapStateToProps,null)(Player);