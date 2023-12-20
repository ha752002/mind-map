"use client"
import React from 'react';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {useRouter} from "next/navigation";
const FileChooser = () => {
    const router = useRouter()
    return (
        <Link onClick={() => {
            router.push("mind-map/1")
        }}>
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Daily Mix</p>
                    <small className="text-default-500">12 Tracks</small>
                    <h4 className="font-bold text-large">Frontend Radio</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="honggha.jpg"
                        width={270}
                    />
                </CardBody>
            </Card>
        </Link>
    );
};

export default FileChooser;