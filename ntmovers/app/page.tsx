import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import {createClient} from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import {NavbarF} from "@/components/NextUI/NavbarF"
import {CarouselFigma} from "@/components/NextUI/CarouselFigma";
import {Cards} from "@/components/NextUI/Cards";
import {Divider} from "@nextui-org/react";
import React from "react";
import {Map} from "@/components/Maps/Map";
import {ServiceCard} from "@/components/1.UI/ServiceCard";
import {Spacer} from "@nextui-org/spacer";

export default async function Index() {
    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };

    const isSupabaseConnected = canInitSupabaseClient();

    const color = "80AF81"
    let externalImageUrl = "https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/posters/3.png";
    return (

        <div className="min-h-screen w-full flex flex-col items-center">
            <div className="bg-[#D8EFD3] w-full flex flex-col items-center">
                <nav className="bg-white md:w-2/3  w-full justify-center  h-fit">
                    <NavbarF/>
                </nav>
            </div>
            <div key="Carousel" className="bg-[#D8EFD3]">
                <Header/>
            </div>

            {/*<Divider/>*/}

            <div key="About Us" className="bg-[#D8EFD3] w-full flex flex-col gap-1 px-3 grid-flow-col">
                <Spacer y={16}/>
                <main className="text-black flex flex-col gap-1 place-content-center items-center text-center">
                    <h2 className="font-bold text-4xl mb-4">About Us</h2>
                    <h3>
                        Well trusted company blah blah blah good service customer first Oriented Movers for all your
                        needs
                    </h3>
                </main>
                <Spacer y={16}/>
            </div>

            <div key="Our Services"
                 className="text-black place-items-center w-full flex flex-col gap-1 px-3 grid-flow-col"
                 style={{
                     backgroundImage: `url(${externalImageUrl})`,
                     backgroundSize: 'cover',  // Ensures the image covers the entire div
                     backgroundPosition: 'center',  // Centers the image
                     backgroundRepeat: 'no-repeat',  // Prevents repeating the image
                     width: '100%',  // Full width of the parent container
                     height: '50vh'  // Full viewport height, adjust as needed
                 }}>

                <div key="our services light green container"
                     className="w-screen md:w-2/3 rounded-t-large rounded-b-large "
                >

                    <Spacer y={20}/>

                    <main className="flex flex-col gap-1 justify-center items-center">
                        <h2 className="font-bold text-4xl mb-4">Our Services</h2>
                        <Spacer y={20}/>
                        <ServiceCard/>
                    </main>
                    <Spacer y={20}/>

                </div>

            </div>


            <Map key="Map"/>

            <footer
                className="bg-[#7ABA78] w-full border-t border-t-foreground/10 p-10 flex justify-center text-center text-2xl">
                <p>Subsidiary of Nelago trading CC 2024</p>
            </footer>
        </div>

    );
}
