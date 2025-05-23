import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function PostCard({ $id, title, featuredImage }) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (featuredImage) {
      try {
        // Get the direct file URL
        const url = appwriteService.getFileView(featuredImage);
       // console.log('Generated Image URL:', url); // Debug log
        
        if (!url) {
          throw new Error('Failed to get image URL');
        }

        // Create a new image object to test if the URL is valid
        const img = new Image();
        img.onload = () => {
          // console.log('Image loaded successfully:', url);
          setImageUrl(url);
          setIsImageLoading(false);
        };
        img.onerror = (error) => {
          console.error('Failed to load image from URL:', url, error);
          setImageError(true);
          setIsImageLoading(false);
        };
        img.src = url;
      } catch (error) {
        console.error('Error getting image URL:', error);
        setImageError(true);
        setIsImageLoading(false);
      }
    } else {
      console.warn('No featuredImage provided to PostCard');
      setImageError(true);
      setIsImageLoading(false);
    }
  }, [featuredImage]);

  // Return a placeholder if used as a route component without props
  if (!$id || !title || !featuredImage) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <Link 
      to={`/post/${$id}`}
      className="block transition-transform duration-300 hover:scale-105"
      aria-label={`View post: ${title}`}
    >
      <div className="gap-2 bg-gray-100 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          {isImageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl"></div>
          )}
          {imageError ? (
            <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">Image not available</span>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-48 rounded-xl object-cover ${isImageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              loading="lazy"
            />
          )}
        </div>
        <h2 className="text-xl font-bold mt-2 line-clamp-2">{title}</h2>
      </div>
    </Link>
  );
}

PostCard.propTypes = {
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired
};

export default PostCard;
