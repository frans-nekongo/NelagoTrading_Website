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
    //nt logo
    let url_img = "https://firebasestorage.googleapis.com/v0/b/ntmovers-e1717.appspot.com/o/Logos%2FNT_logo_large.png?alt=media&token=47f83109-552d-45d2-8b0e-eaded794301d";
    return (
        <Navbar maxWidth={"full"} className="bg-white ">
            <NavbarBrand>
                <img src={url_img} alt={""}
                     height="50" width="50"
                />
                <p key="" className="font-bold text-inherit text-4xl italic"
                   style={{color: 'var(--fixed-black-text)'}}>MOVERS</p>
            </NavbarBrand>
            {/*<NavbarContent className="hidden sm:flex gap-4" justify="center">*/}
            {/*    <NavbarItem>*/}
            {/*        <Link color="foreground" href="#">*/}
            {/*            Features*/}
            {/*        </Link>*/}
            {/*    </NavbarItem>*/}
            {/*    <NavbarItem isActive>*/}
            {/*        <Link href="#" aria-current="page">*/}
            {/*            Customers*/}
            {/*        </Link>*/}
            {/*    </NavbarItem>*/}
            {/*    <NavbarItem>*/}
            {/*        <Link color="foreground" href="#">*/}
            {/*            Integrations*/}
            {/*        </Link>*/}
            {/*    </NavbarItem>*/}
            {/*</NavbarContent>*/}
            <NavbarContent justify="end">
                <NavbarItem>
                    {isSupabaseConnected && <AuthButton/>}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}