import React, { Component } from 'react';
import {Modal, Text,
    View, 
    PermissionsAndroid, 
    TouchableHighlight, 
    FlatList, Image, 
    StyleSheet, 
    ImageBackground} from 'react-native';

import { copyFile, 
    mkdir, 
    ExternalStorageDirectoryPath, 
    writeFile, unlink, readDir, 
    stat, readFile } from 'react-native-fs';

import {connect} from 'react-redux';

import VideoPlayer from '../components/video-player';
import {getVideos} from '../redux/selector';
import {updateVideos, setSelectedVideo} from '../redux/actions';

class VideoScreen extends Component{

    static navigationOptions = {
        title: 'VIDEOS',
        //header: null,
    };

    requestPermission = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],
            {
              title: 'Status download permission',
              message:
                'Status download needs permission to access your whatsapp status ' +
                'so as to save them on your phone.',
              buttonNegative: 'Cancel',
              buttonPositive: 'Grant',
            },
          );
          if (granted['android.permission.READ_EXTERNAL_STORAGE']
          && granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
          } else {
            return false
          }
        } catch (err) {
          console.warn(err);
          return false;
        }
      }

    componentDidMount(){
        if(this.requestPermission()){
            readDir(`${ExternalStorageDirectoryPath}/WhatsApp/Media/.Statuses/`)
            .then(result => {
                return Promise.all(result);
            })
            .then(statResults => {
                let index = 0
                statResults.forEach((file) => {
                    stat(file.path).then(res => {
                        
                        if(res.isFile() && res.path.split('.').pop() === 'mp4'){
                            //let videos = this.state.videos;
                            //this.setState({videos: [...videos,{uri: res.path, index}]});
                            this.props.updateVideos({uri: res.path, index});
                            index++;
                        }
                    });
                    
                });

                return 0;
            }).catch((err) => {
                console.log(err.message, err.code);
            });
        }
    }

    state = {
        selected: null,
        videos: []
    }

    onItemSelected = index =>{
        //this.setState({selected: this.state.videos[index], visible: true})
        this.props.setSelectedVideo(this.props.videos[index]);
        this.props.navigation.navigate('View');
    }

    renderItem(item) {
        return (  
            <TouchableHighlight  
                style={{flex:1/3, //here you can use flex:1 also
                aspectRatio:1, opacity: 1}}
                onPress={_ => this.onItemSelected(item.index)}
                >
                <Image style={{flex: 1}} resizeMode='cover' 
                    source={{ uri:  `file:///${item.uri}` } }></Image>
            </TouchableHighlight>
        )
    }


    render() {
        return(
            <View style={styles.container}>
                {
                    this.state.selected !== null ? 
                        (<VideoPlayer 
                            source={this.state.selected}
                        />)
                        :(<FlatList
                            numColumns={3}
                            data={this.props.videos}
                            renderItem={({ item }) => this.renderItem(item)}
                            keyExtractor={(item,index) => index.toString()}
                            style={{flex: 1}}
                        />) 
                }

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {videos: getVideos(state)};
}

export default connect(mapStateToProps,{updateVideos, setSelectedVideo})(VideoScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
    },
})