import actionTypes from './action-types';
import {combineReducers} from 'redux';

const imageState = [];
const videoState = [];
const selectedState = {video: null, image: null};

export const videos = (state = videoState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_VIDEOS: {
            return [...state,action.video];
        }
        default: {
            return videoState;
        }
    }
}

export const images = (state = imageState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_IMAGES: {
            return [...state,action.image];
        }
        default: {
            return imageState;
        }
    }
}

export const selected = (state = selectedState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_SELECTED_IMAGE: {
            return {...state, image: action.image};
        }
        case actionTypes.UPDATE_SELECTED_VIDEOS: {
            return {...state, video: action.video};
        }
        default: {
            return selectedState;
        }
    }
}

export default combineReducers({selected,images,videos});