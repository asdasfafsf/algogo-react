// src/components/Carousel/Carousel.tsx
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  TouchEvent,
  MouseEvent,
  useImperativeHandle,
} from 'react';

export interface CarouselProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  prevArrow?: React.ReactNode;
  nextArrow?: React.ReactNode;
  navigation?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  transition?: number;
  loop?: boolean;
  className?: string;
  slideRef?: React.Ref<HTMLDivElement>;
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      prevArrow,
      nextArrow,
      navigation = true,
      autoplay = false,
      autoplayDelay = 3000,
      transition = 500,
      loop = true,
      className = '',
      slideRef,
      ...props
    },
    ref,
  ) => {
    const [current, setCurrent] = useState(0);
    const slides = React.Children.toArray(children);
    const total = slides.length;

    const autoplayRef = useRef<NodeJS.Timeout | null>(null);
    const isHovered = useRef(false);

    const startX = useRef<number | null>(null);
    const isDragging = useRef<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const nextSlide = useCallback(() => {
      setCurrent((prev) => {
        if (prev + 1 < total) {
          return prev + 1;
        }
        return loop ? 0 : prev;
      });
    }, [total, loop]);

    const prevSlide = useCallback(() => {
      setCurrent((prev) => {
        if (prev - 1 >= 0) {
          return prev - 1;
        }
        return loop ? total - 1 : prev;
      });
    }, [total, loop]);

    useEffect(() => {
      if (autoplay) {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
        autoplayRef.current = setInterval(() => {
          if (!isHovered.current) {
            nextSlide();
          }
        }, autoplayDelay);
      }

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }, [autoplay, autoplayDelay, nextSlide]);

    const goToSlide = (index: number): void => {
      setCurrent(index);
    };

    const handleMouseEnter = (): void => {
      isHovered.current = true;
    };

    const handleMouseLeave = (): void => {
      isHovered.current = false;
      isDragging.current = false;
      startX.current = null;
    };

    const handleTouchStart = (e: TouchEvent): void => {
      startX.current = e.touches[0].clientX;
      isDragging.current = true;
    };

    const handleTouchMove = (e: TouchEvent): void => {
      if (!isDragging.current || startX.current === null) return;
      const currentX = e.touches[0].clientX;
      const diff = startX.current - currentX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        isDragging.current = false;
        startX.current = null;
      }
    };

    const handleTouchEnd = (): void => {
      isDragging.current = false;
      startX.current = null;
    };

    const handleMouseDown = (e: MouseEvent): void => {
      startX.current = e.clientX;
      isDragging.current = true;
    };

    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging.current || startX.current === null) return;
      const currentX = e.clientX;
      const diff = startX.current - currentX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        isDragging.current = false;
        startX.current = null;
      }
    };

    const handleMouseUp = (): void => {
      isDragging.current = false;
      startX.current = null;
    };

    return (
      <div
        className={`relative overflow-hidden h-64 ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
        {...props}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className="flex h-full transition-transform"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transitionDuration: `${transition}ms`,
          }}
          ref={slideRef}
          aria-live="polite"
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full"
              aria-hidden={current !== index}
            >
              {slide}
            </div>
          ))}
        </div>

        {prevArrow ? (
          <button
            type="button"
            className="absolute z-10 text-3xl text-gray-600 transform -translate-y-1/2 top-1/2 left-4"
            onClick={prevSlide}
            aria-label="Previous Slide"
          >
            {prevArrow}
          </button>
        ) : (
          <button
            type="button"
            className="absolute z-10 text-3xl text-gray-600 transform -translate-y-1/2 top-1/2 left-4"
            onClick={prevSlide}
            aria-label="Previous Slide"
          >
            &#10094;
          </button>
        )}

        {nextArrow ? (
          <button
            type="button"
            className="absolute z-10 text-3xl text-gray-600 transform -translate-y-1/2 top-1/2 right-4"
            onClick={nextSlide}
            aria-label="Next Slide"
          >
            {nextArrow}
          </button>
        ) : (
          <button
            type="button"
            className="absolute z-10 text-3xl text-gray-600 transform -translate-y-1/2 top-1/2 right-4"
            onClick={nextSlide}
            aria-label="Next Slide"
          >
            &#10095;
          </button>
        )}

        {navigation && (
        <div className="absolute flex space-x-2 transform -translate-x-1/2 bottom-4 left-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                current === index ? 'bg-gray-800' : 'bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        )}
      </div>
    );
  },
);

export default Carousel;
