"use client"
import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className="embla md:w-2/3">
      <div className="embla__viewport rounded-b-large" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((url, index) => (
            <div className="embla__slide" key={index}>
              <img
                className="embla__slide__img"
                src={url}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      {/*<div className="embla__controls">*/}
      {/*  <div className="embla__buttons">*/}
      {/*    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />*/}
      {/*    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </section>
  )
}

export default EmblaCarousel
