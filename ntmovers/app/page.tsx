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

    return (
        <div className="min-h-screen w-full flex flex-col items-center">
            <nav className=" w-full justify-center border-b border-b-foreground/10 h-fit">
                <NavbarF/>
            </nav>

            <div key="Carousel" className="bg-[#7CA329]">
                <Header/>
            </div>

            {/*<Divider/>*/}

            <div key="About Us" className="bg-[#7CA329] w-full flex flex-col gap-1 px-3 grid-flow-col">
                <Spacer y={16}/>
                <main className="flex flex-col gap-1 place-content-center items-center text-center">
                    <h2 className="font-bold text-4xl mb-4">About Us</h2>
                    <h3>
                        Well trusted company blah blah blah good service customer first Oriented Movers for all your
                        needs
                    </h3>
                </main>
                <Spacer y={16}/>
            </div>

            <div key="Our Services" className="bg-[#7CA329] w-full flex flex-col gap-1 px-3 grid-flow-col">
                <div className="rounded-b-large bg-[#357266]">

                    <Spacer y={16}/>

                    <main className="flex flex-col gap-1 justify-center items-center">
                        <h2 className="font-bold text-4xl mb-4">Our Services</h2>
                        <ServiceCard/>
                    </main>
                    <Spacer y={16}/>

                </div>

            </div>

            <Map key="Map"/>

            <footer className="w-full border-t border-t-foreground/10 p-1 flex justify-center text-center text-2xl">
                <p>Subsidiary of Nelago trading CC 2024</p>
            </footer>
        </div>

    );
}
