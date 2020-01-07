export const getSelectedState = ( store ) => store.selected;

export const getVideosState = ( store ) => store.videos;

export const getImagesState = ( store ) => store.images;

export const selectedImage = store => getSelectedState(store) ? getSelectedState(store).image : {};

export const selectedVideo = store => getSelectedState(store) ? getSelectedState(store).video : {};

export const getImages = store => getImagesState(store) ? getImagesState(store) : [];

export const getVideos = store => getVideosState(store) ? getVideosState(store) : [];