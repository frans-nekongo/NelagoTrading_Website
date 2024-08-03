import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {AcmeLogo} from "@/components/NextUI/AcmeLogo";
import AuthButton from "@/components/AuthButton";
import {createClient} from "@/utils/supabase/server";

export function NavbarF() {
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
    let url_img ="https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/Logos/NT_logo_large.png?t=2024-07-26T17%3A28%3A38.616Z";
    return (
        <Navbar maxWidth={"full"}  className="">
            <NavbarBrand>
                <img src={url_img} alt={""}
                     height="50"  width="50"
                />
                <p className="font-bold text-inherit text-2xl">MOVERS</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    {isSupabaseConnected && <AuthButton/>}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}