import actionTypes from './action-types';

export const updateImages = image => ({
    type: actionTypes.UPDATE_IMAGES,
    image,
});

export const updateVideos = video => ({
    type: actionTypes.UPDATE_VIDEOS,
    video,
});

export const setSelectedImage = image => ({
    type: actionTypes.UPDATE_SELECTED_IMAGE,
    image,
});

export const setSelectedVideo = video => ({
    type: actionTypes.UPDATE_SELECTED_VIDEOS,
    video,
});