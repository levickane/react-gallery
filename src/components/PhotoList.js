import React from 'react';
import Photo from './Photo';
import NoPhotos from './NoPhotos'

const PhotoList = props => {

    const photos = props.photos;
    let photoList
    if (photos.length) {
        photoList = photos.map(photo => <Photo url={photo.url} key={photo.id} />);
    } else {
        photoList = <NoPhotos />
    }

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {photoList}
            </ul>
        </div>
    );
}

export default PhotoList;