import {Cards} from "@/components/NextUI/Cards";
import {Card} from "@nextui-org/react";

export function ServiceCard() {
    return (
        <div className=" place-content-center flex flex-col w-full flex-wrap mb-6 gap-4 md:flex-row md:flex-nowrap md:mb-0">
            <Cards
                serviceName="Local Movers"
                serviceInfo="from Local City to local City."
                servicePic="https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/Logos/city-buildings-svgrepo-com.svg?t=2024-08-03T21%3A04%3A43.444Z"
            />
            <Cards
                serviceName="Cross Border Movers"
                serviceInfo="from Country to Country."
                servicePic="https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/Logos/australia-svgrepo-com.svg?t=2024-08-03T21%3A04%3A23.734Z"
            />
        </div>

    );
}