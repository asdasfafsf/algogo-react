import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Carousel from "@components/Carousel/Carousel";
import "../../src/index.css";

const slides = ["첫 번째", "두 번째", "세 번째"];

function createFixtureSlides(prefix: string) {
  return slides.map((label, index) => (
    <div
      key={label}
      data-testid={`${prefix}-slide-${index + 1}`}
      className="grid h-64 place-items-center bg-slate-900 text-3xl font-bold text-white"
    >
      {label} 슬라이드
    </div>
  ));
}

function CarouselFixture() {
  return (
    <main className="mx-auto grid max-w-4xl gap-10 p-8">
      <section>
        <h1 className="mb-3 text-xl font-semibold">자동 재생 · 반복</h1>
        <Carousel
          aria-label="자동 재생 반복 캐러셀"
          autoplay
          autoplayDelay={1200}
          loop
          className="rounded-xl"
        >
          {createFixtureSlides("autoplay")}
        </Carousel>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">수동 이동 · 반복 없음</h2>
        <Carousel
          aria-label="수동 비반복 캐러셀"
          autoplay={false}
          loop={false}
          className="rounded-xl"
        >
          {createFixtureSlides("manual")}
        </Carousel>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CarouselFixture />
  </StrictMode>,
);
