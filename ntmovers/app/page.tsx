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
        <div className=" min-h-screen w-full flex flex-col gap-20 items-center">
            <nav className=" w-full justify-center border-b border-b-foreground/10 h-16">
                {/*<div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">*/}
                {/*  <DeployButton />*/}
                {/*  {isSupabaseConnected && <AuthButton />}*/}
                {/*</div>*/}
                <NavbarF/>
            </nav>

            <div>
                <Header/>
            </div>

            <Divider/>
            <div className="w-full  flex flex-col gap-1  px-3 grid-flow-col">
                <main className=" flex flex-col gap-1 justify-center items-center">
                    <h2 className="font-bold text-4xl mb-4">About Us</h2>
                    <h3>Well trusted company blah blah blah good service customer first Oriented Movers for all your
                        needs</h3>
                </main>
            </div>

            <Divider />
            <div className="w-full  flex flex-col gap-1  px-3 grid-flow-col">
                <main className=" flex flex-col gap-1 justify-center items-center">
                    <h2 className="font-bold text-4xl mb-4">Our Services</h2>
                    {/*{isSupabaseConnected ? <SignUpUserSteps /> :*/}
                    {/*    <ConnectSupabaseSteps />}*/}
                    <Cards/>
                </main>
            </div>

            <Divider/>
            <Map/>

            <footer
                className="flex-1 w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
                <p>
                    Subsidiary of Nelago trading CC 2024
                </p>
            </footer>
        </div>
    );
}
