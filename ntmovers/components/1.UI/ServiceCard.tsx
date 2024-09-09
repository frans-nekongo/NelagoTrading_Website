import {Cards} from "@/components/NextUI/Cards";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

export function ServiceCard() {
    return (
        <div
            className=" place-content-center flex flex-col w-full flex-wrap mb-6 gap-4 md:flex-row md:flex-nowrap md:mb-0">
            <Cards
                serviceName="Local Movers"
                serviceInfo="from Local City to local City."
                servicePic="https://firebasestorage.googleapis.com/v0/b/ntmovers-e1717.appspot.com/o/Logos%2Fcity-buildings-svgrepo-com.svg?alt=media&token=db89702e-3ee0-47df-aeb3-25581f9a089b"
            />
            <Cards
                serviceName="Cross Border Movers"
                serviceInfo="from Country to Country."
                servicePic="https://firebasestorage.googleapis.com/v0/b/ntmovers-e1717.appspot.com/o/Logos%2Faustralia-svgrepo-com.svg?alt=media&token=7a719237-afab-4f33-8b23-6ce137f8d18f"
            />
        </div>

    );
}