import {Cards} from "@/components/NextUI/Cards";
import {Card} from "@nextui-org/react";

export function ServiceCard() {
    return (
        <div className="  items-center flex flex-col row-end-2 w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Cards serviceName="Local Movers" serviceInfo="from Local City to local City."/>
            <Cards serviceName="Cross Border Movers" serviceInfo="from Country to Country."/>
        </div>
    );
}