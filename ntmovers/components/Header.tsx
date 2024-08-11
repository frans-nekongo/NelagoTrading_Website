import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import {UseEmblaCarousel} from "@/components/Embla/UseEmblaCarousel";
import {EmblaOptionsType} from "embla-carousel";
import EmblaCarousel from "@/components/Embla/EmblaCarousel";

const OPTIONS: EmblaOptionsType = { loop: true }
export default function Header() {
     const imageUrls = [
         'https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/posters/NTWEB1.png?t=2024-08-11T22%3A03%3A37.499Z',//first image
         'https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/posters/NTWEB2.png?t=2024-08-11T22%3A04%3A22.395Z'//second image
  ]
    let figma = "https://www.canva.com/design/DAGI_DhBwNY/6XYdCILEdeO55zZMg1KbLQ/view";
    return (
        <div className="">
            <EmblaCarousel slides={imageUrls} options={OPTIONS}/>
        </div>
    )
        ;
}
