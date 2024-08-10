import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import {UseEmblaCarousel} from "@/components/Embla/UseEmblaCarousel";
import {EmblaOptionsType} from "embla-carousel";
import EmblaCarousel from "@/components/Embla/EmblaCarousel";

const OPTIONS: EmblaOptionsType = { loop: true }
export default function Header() {
     const imageUrls = [
         'https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/posters/1.png?t=2024-08-07T21%3A49%3A00.276Z',
         'https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/posters/2.png?t=2024-08-07T21%3A49%3A28.464Z'
  ]
    let figma = "https://www.canva.com/design/DAGI_DhBwNY/6XYdCILEdeO55zZMg1KbLQ/view";
    return (
        <div className="">
            <EmblaCarousel slides={imageUrls} options={OPTIONS}/>
        </div>
    )
        ;
}
