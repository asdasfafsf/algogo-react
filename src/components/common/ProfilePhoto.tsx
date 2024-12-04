import React, { useState, useRef } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';

interface ProfilePhotoProps {
  size?: 'default' | 'mini' | 'large';
  className?: string;
  isEditable: boolean;
}

const sizeClasses = {
  default: 'w-36 h-36',
  mini: 'w-16 h-16',
  large: 'w-48 h-48',
};

export default function ProfilePhoto({
  size = 'default',
  className = '',
  isEditable = false,
}: ProfilePhotoProps) {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditable) {
      fileInputRef.current?.click();
    }
  };

  const sizeClass = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <div
          className={`relative flex items-center justify-center mb-4 overflow-hidden border-2 border-gray-300 rounded-full ${
            isEditable ? 'cursor-pointer' : ''
          } group ${sizeClass}`}
          onClick={handleImageClick}
        >
          {image ? (
            <img src={image} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <div className="text-gray-500">No Image</div>
          )}
          {isEditable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
              <span className="text-4xl text-white">+</span>
            </div>
          )}

        </div>
        {isEditable && (
        <div className="absolute z-10 p-2 text-white bg-gray-900 rounded-full bottom-4 right-2">
          <PencilIcon className="w-5 h-5" />
        </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
