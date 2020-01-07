import React, { Component } from 'react';
import {Modal, 
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
import {updateImages, setSelectedImage} from '../redux/actions';
import {getImages} from '../redux/selector';



class PhotoScreen extends Component{

    static navigationOptions = {
        title: 'PICTURES',
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
                        
                        if(res.isFile() && res.path.split('.').pop() === 'jpg'){
                            //let images = this.state.images;
                            //this.setState({images: [...images,{uri: res.path, index}]},
                                 //this.props.updateImages(this.state.images));
                            this.props.updateImages({uri: res.path, index});
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

    onItemSelected = index =>{
        //this.setState({selected: this.state.images[index], visible: true})
        this.props.setSelectedImage(this.props.images[index]);
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
                <FlatList
                    numColumns={3}
                    data={this.props.images}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item,index) => index.toString()}
                    style={{flex: 1}}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {images: getImages(state)};
}

export default connect(mapStateToProps,{updateImages, setSelectedImage})(PhotoScreen)

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