import React from "react";
import {CardBody, CardFooter, CardHeader, Link, Image, Card, Divider} from "@nextui-org/react";

export function Cards() {
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md text-black">[service here]</p>
                    <p className="text-small text-default-500"></p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p className="text-black">[More info on service here]</p>
            </CardBody>
            <Divider/>
            {/*<CardFooter>*/}
            {/*    <Link*/}
            {/*        isExternal*/}
            {/*        showAnchorIcon*/}
            {/*        href="https://github.com/nextui-org/nextui"*/}
            {/*    >*/}
            {/*        Visit source code on GitHub.*/}
            {/*    </Link>*/}
            {/*</CardFooter>*/}
        </Card>
    );
}