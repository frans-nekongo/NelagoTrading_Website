import React from "react";
import { CardBody, CardHeader, Image, Card, Divider } from "@nextui-org/react";

interface ServiceCardProps {
    serviceName: string;
    serviceInfo: string;
    servicePic:string;
}

export const Cards: React.FC<ServiceCardProps> = ({ serviceName, serviceInfo, servicePic }) => {
    return (
        <Card isPressable radius={"sm"} shadow={"sm"} className="max-w-[400px]">
            <CardHeader  className="bg-[#95C893]  flex gap-3 p-3">
                <Image
                    alt="service logo"
                    height={40}
                    radius="sm"
                    src={servicePic}
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md text-black text-opacity-100">{serviceName}</p>
                    <p className="text-small text-default-500 text-opacity-100"></p>
                </div>
            </CardHeader>
            <div className="bg-transparent">


            </div>
            <Divider/>
            <CardBody className="">
                <p className="text-black">{serviceInfo}</p>
            </CardBody>
        </Card>
    );
};
