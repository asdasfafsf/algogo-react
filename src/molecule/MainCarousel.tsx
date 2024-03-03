import { Button, Carousel, Typography } from "@material-tailwind/react";


export default function MainCarousel() {
    return (<Carousel className="rounded-xl h-60">
       <div className="relative h-full w-full">
      <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-xl md:text-2xl lg:text-2xl"
            >
              계정 연동 관련 멘트를 넣고싶은데 적당한게 생각이 안나요
            </Typography>

          </div>
        </div>
      </div>
    </Carousel>)
}