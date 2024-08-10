import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import {createClient} from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import {NavbarF} from "@/components/NextUI/NavbarF";
import {CarouselFigma} from "@/components/NextUI/CarouselFigma";
import {Cards} from "@/components/NextUI/Cards";
import {Button, Divider, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import React from "react";
import {Map} from "@/components/Maps/Map";
import {ServiceCard} from "@/components/1.UI/ServiceCard";
import {Spacer} from "@nextui-org/spacer";
import ResponsiveBackground from "@/components/ResponsiveBackground";
import WhatsAppButton from "@/components/ContactUs/WhatsAppButton";
import EmailButton from "@/components/ContactUs/EmailButton";
import ContactButtons from "@/components/ContactUs/ContactButtons";
import {ContactUsIcon} from "@/components/Icons/ContactUsIcon"; // Import the new component
import {FooterNT} from "@/components/1.UI/FooterNT"
export default function Index() {
    const canInitSupabaseClient = () => {
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };

    const isSupabaseConnected = canInitSupabaseClient();

    return (
        <div className="
                        min-h-screen
                         w-full flex flex-col items-center">

            {/*<ContactButtons/>*/}
            <div style={{position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999}}>
                <Popover backdrop={"blur"} placement="top" offset={10} showArrow>
                    <PopoverTrigger>
                        <Button
                            className="text-black"
                            variant={"solid"}
                            endContent={<ContactUsIcon/>}
                            color="danger"
                            size="lg">
                            Contact Us
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="px-1 py-2">
                            <div className="flex gap-4 justify-center">
                                <WhatsAppButton/>
                                <EmailButton/>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>


            <div className="bg-[#D8EFD3] w-full flex flex-col items-center">
                <nav className="bg-white md:w-2/3 w-full justify-center h-fit">
                    <NavbarF/>
                </nav>
            </div>
            <div key="Carousel" className="bg-[#D8EFD3]">
                <Header/>
            </div>

            <div key="About Us" className="bg-[#D8EFD3] w-full flex flex-col gap-1 px-3 grid-flow-col">
                <Spacer y={16}/>
                <main className="text-black flex flex-col gap-1 place-content-center items-center text-center">
                    <h2 className="font-bold text-4xl mb-4">About Us</h2>
                    <h3 className="text-balance text-center w-fit md:w-2/3  text-3xl">
                        Moving company specializing in both local and cross-border moves.
                        prioritizing exceptional service and a customer-first approach.
                    </h3>
                </main>
                <Spacer y={16}/>
            </div>

            <ResponsiveBackground key="Our Services">
                <div key="our services light green container"
                     className="w-full md:w-2/3 p-4 box-border rounded-t-large rounded-b-large">
                    <Spacer y={20}/>
                    <main className="flex flex-col gap-1 justify-center items-center w-full max-w-full text-center">
                        <h2 className="text-black font-bold text-4xl mb-4 border-4 border-b-green-900">Our Services</h2>
                        <Spacer y={20}/>
                        <ServiceCard/>
                    </main>
                    <Spacer y={20}/>
                </div>
            </ResponsiveBackground>

            <Map key="Map"/>

            <FooterNT/>
        </div>
    );
}
