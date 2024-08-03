import React from "react";
import { CardBody, CardHeader, Image, Card, Divider } from "@nextui-org/react";

interface ServiceCardProps {
    serviceName: string;
    serviceInfo: string;
    servicePic:string;
}

export const Cards: React.FC<ServiceCardProps> = ({ serviceName, serviceInfo, servicePic }) => {
    return (
        <Card className="max-w-[400px] lg:w-1/5">
            <CardHeader className="flex gap-3">
                <Image
                    alt="service logo"
                    height={40}
                    radius="sm"
                    src={servicePic}
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md text-black">{serviceName}</p>
                    <p className="text-small text-default-500"></p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p className="text-black">{serviceInfo}</p>
            </CardBody>
        </Card>
    );
};
