import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import {UseEmblaCarousel} from "@/components/Embla/UseEmblaCarousel";
import {EmblaOptionsType} from "embla-carousel";
import EmblaCarousel from "@/components/Embla/EmblaCarousel";

export default function Header() {
     const imageUrls = [
    'https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/posters/1.png?t=2024-08-03T12%3A09%3A30.390Z', // Replace with your image URL
    'https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/posters/2.png?t=2024-08-03T12%3A09%3A41.889Z'  // Replace with your image URL
  ]
    let figma = "https://www.canva.com/design/DAGI_DhBwNY/6XYdCILEdeO55zZMg1KbLQ/view";
    return (
        <div className="">
            <EmblaCarousel slides={imageUrls}/>
        </div>
    )
        ;
}
