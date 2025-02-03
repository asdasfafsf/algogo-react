import React, { useState, useRef, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';

interface ProfilePhotoProps {
  size?: 'default' | 'mini' | 'large';
  className?: string;
  isEditable: boolean;
  src: string;
  handleChange?: (_: unknown, src: File, b64: string) => void | Promise<void>
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
  src,
  handleChange = () => {},
}: ProfilePhotoProps) {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (src) {
      setImage(src);
    }
  }, [src]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        handleChange(e, file, (reader.result as string).toString());
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    } else {
      // eslint-disable-next-line no-alert
      alert('이미지 파일만 업로드 가능합니다.');
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
            <img src={src} alt="Profile" className="object-cover w-full h-full" />
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
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
