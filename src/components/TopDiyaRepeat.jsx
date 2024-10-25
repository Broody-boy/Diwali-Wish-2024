import React from 'react';
import './TopDiyaRepeat.css'; // Importing the CSS file

const TopDiyaRepeat = () => {
    const imageWidth = 200; // Width of each image
    const screenWidth = window.innerWidth; // Get the current screen width
    const imageCount = Math.ceil(screenWidth / imageWidth); // Calculate the number of images needed

    const images = new Array(imageCount).fill("DiyaTop.png"); // Create an array of images

    return (
        <div className="repeating-container">
            {images.map((src, index) => (
                <img key={index} src={src} alt="Repeating" className="repeating-image" />
            ))}
        </div>
    );
};

export default TopDiyaRepeat;
