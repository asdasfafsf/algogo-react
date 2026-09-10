import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Carousel as ShadcnCarousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@components/ui/carousel";
import { cn } from "@lib/utils";

export interface CarouselProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  prevArrow?: React.ReactNode;
  nextArrow?: React.ReactNode;
  navigation?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  transition?: number;
  loop?: boolean;
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
      className,
      slideRef,
      onMouseEnter,
      onMouseLeave,
      onFocusCapture,
      onBlurCapture,
      ...props
    },
    ref,
  ) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const isHovered = useRef(false);
    const hasFocusWithin = useRef(false);
    const slides = React.Children.toArray(children);

    useEffect(() => {
      if (!api) return;
      const select = () => setCurrent(api.selectedScrollSnap());
      select();
      api.on("select", select).on("reInit", select);
      return () => {
        api.off("select", select).off("reInit", select);
      };
    }, [api]);

    useEffect(() => {
      if (!api || !autoplay || slides.length < 2) return;
      const timer = window.setInterval(() => {
        if (!isHovered.current && !hasFocusWithin.current) api.scrollNext();
      }, autoplayDelay);
      return () => window.clearInterval(timer);
    }, [api, autoplay, autoplayDelay, slides.length]);

    return (
      <ShadcnCarousel
        ref={ref}
        setApi={setApi}
        opts={{
          loop,
          duration: Math.max(10, Math.min(60, Math.round(transition / 10))),
        }}
        className={cn(
          "h-64 overflow-hidden [&>div:first-child]:h-full",
          className,
        )}
        onMouseEnter={(event) => {
          isHovered.current = true;
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          isHovered.current = false;
          onMouseLeave?.(event);
        }}
        onFocusCapture={(event) => {
          hasFocusWithin.current = true;
          onFocusCapture?.(event);
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            hasFocusWithin.current = false;
          }
          onBlurCapture?.(event);
        }}
        {...props}
      >
        <CarouselContent
          ref={slideRef}
          className="ml-0 h-full"
          aria-live="polite"
        >
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="h-full pl-0"
              aria-label={`${index + 1} / ${slides.length}`}
              aria-hidden={current !== index}
              inert={current !== index}
            >
              {slide}
            </CarouselItem>
          ))}
        </CarouselContent>

        {slides.length > 1 && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur hover:bg-background"
              onClick={() => api?.scrollPrev()}
              aria-label="이전 슬라이드"
            >
              {prevArrow ?? <ChevronLeft />}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur hover:bg-background"
              onClick={() => api?.scrollNext()}
              aria-label="다음 슬라이드"
            >
              {nextArrow ?? <ChevronRight />}
            </Button>
          </>
        )}

        {navigation && slides.length > 1 && (
          <div
            className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-full bg-background/80 px-2 py-1"
            role="group"
            aria-label="슬라이드 선택"
          >
            {slides.map((_, index) => (
              <Button
                key={index}
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "size-5 rounded-full p-1 hover:bg-transparent",
                  current === index
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`${index + 1}번 슬라이드로 이동`}
                aria-current={current === index ? "true" : undefined}
              >
                <span className="size-2.5 rounded-full bg-current" />
              </Button>
            ))}
          </div>
        )}
      </ShadcnCarousel>
    );
  },
);
Carousel.displayName = "Carousel";
export default Carousel;
