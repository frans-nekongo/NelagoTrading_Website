import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import {UseEmblaCarousel} from "@/components/Embla/UseEmblaCarousel";
import {EmblaOptionsType} from "embla-carousel";
import EmblaCarousel from "@/components/Embla/EmblaCarousel";

const OPTIONS: EmblaOptionsType = { loop: true }
export default function Header() {
     const imageUrls = [
         'https://firebasestorage.googleapis.com/v0/b/ntmovers-e1717.appspot.com/o/Posters%2FNTWEB1.png?alt=media&token=f4765dba-fb63-47f8-992b-7d244da6faef',//first image
         'https://firebasestorage.googleapis.com/v0/b/ntmovers-e1717.appspot.com/o/Posters%2FNTWEB2.png?alt=media&token=9590ba6a-749b-45e3-b444-7ab303af9e45'//second image
  ]
    let figma = "https://www.canva.com/design/DAGI_DhBwNY/6XYdCILEdeO55zZMg1KbLQ/view";
    return (
        <div className="">
            <EmblaCarousel slides={imageUrls} options={OPTIONS}/>
        </div>
    )
        ;
}
