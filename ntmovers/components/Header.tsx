import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import {UseEmblaCarousel} from "@/components/Embla/UseEmblaCarousel";
import {EmblaOptionsType} from "embla-carousel";
import EmblaCarousel from "@/components/Embla/EmblaCarousel";

export default function Header() {
    const OPTIONS: EmblaOptionsType = {loop: true}
    const SLIDE_COUNT = 2
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    let figma = "https://www.canva.com/design/DAGI_DhBwNY/6XYdCILEdeO55zZMg1KbLQ/view";
    return (
        <div className="w-full h-full">
            <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
        </div>
    )
        ;
}
