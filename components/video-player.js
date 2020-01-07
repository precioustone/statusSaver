import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';

import { copyFile, 
    mkdir, 
    ExternalStorageDirectoryPath, 
    writeFile, unlink, readDir, 
    stat, readFile } from 'react-native-fs';

import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';


export default class VideoPlayer extends Component{
    videoPlayer;
 
    constructor(props) {
      super(props);
      this.state = {
        currentTime: 0,
        duration: 0,
        isFullScreen: false,
        isLoading: true,
        paused: false,
        playerState: PLAYER_STATES.PLAYING,
        screenType: 'content',
      };
    }
   
    onSeek = seek => {
      //Handler for change in seekbar
      this.videoPlayer.seek(seek);
    };
   
    onPaused = playerState => {
      //Handler for Video Pause
      this.setState({
        paused: !this.state.paused,
        playerState,
      });
    };
   
    onReplay = () => {
      //Handler for Replay
      this.setState({ playerState: PLAYER_STATES.PLAYING });
      this.videoPlayer.seek(0);
    };
   
    onProgress = data => {
      const { isLoading, playerState } = this.state;
      // Video Player will continue progress even if the video already ended
      if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
        this.setState({ currentTime: data.currentTime });
      }
    };
    
    onLoad = data => this.setState({ duration: data.duration, isLoading: false });
    
    onLoadStart = data => this.setState({ isLoading: true });
    
    onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
    
    onError = () => alert('Oh! ', error);
    
    exitFullScreen = () => {
      alert('Exit full screen');
    };
    
    enterFullScreen = () => {};
    
    onFullScreen = () => {
      if (this.state.screenType == 'content')
        this.setState({ screenType: 'cover' });
      else this.setState({ screenType: 'content' });
    };
    renderToolbar = () => (
      <View>
        <Text> toolbar </Text>
      </View>
    );
    onSeeking = currentTime => this.setState({ currentTime });
   
    render() {
      return (
        <View style={styles.container}>
          <Video
            onEnd={this.onEnd}
            onLoad={this.onLoad}
            onLoadStart={this.onLoadStart}
            onProgress={this.onProgress}
            paused={this.state.paused}
            ref={videoPlayer => (this.videoPlayer = videoPlayer)}
            resizeMode={this.state.screenType}
            onFullScreen={this.state.isFullScreen}
            source={{ uri: this.props.source.uri }}
            style={styles.mediaPlayer}
            volume={100}
          />
          <MediaControls
            duration={this.state.duration}
            isLoading={this.state.isLoading}
            mainColor="#333"
            onFullScreen={this.onFullScreen}
            onPaused={this.onPaused}
            onReplay={this.onReplay}
            onSeek={this.onSeek}
            onSeeking={this.onSeeking}
            playerState={this.state.playerState}
            progress={this.state.currentTime}
            toolbar={this.renderToolbar()}
          />
        </View>
      );
    }
}

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