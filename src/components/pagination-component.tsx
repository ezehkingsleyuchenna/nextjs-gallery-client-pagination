"use client"

import Image from "next/image";
import { Card } from "./ui/card";
import { faker } from '@faker-js/faker';
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function PaginationComponent() {
    const [images, setImages] = useState<{ image: string }[]>([]);

    const generateFakeImage = () => {
        const newImage = faker.image.urlPicsumPhotos();
        return { image: newImage };
    }

    const resetLocalStorage = () => {
        localStorage.removeItem("fakerImages");
        setImages([]);
    }

    useEffect(() => {
        const storedImages = localStorage.getItem("fakerImages");

        if (storedImages) setImages(JSON.parse(storedImages));
        else {
            const newImages = Array.from({ length: 15 }, generateFakeImage);
            setImages(newImages)
            localStorage.setItem("fakerImages", JSON.stringify(newImages));
        }
    }, []);

    return (
        <>
            <Button onClick={ resetLocalStorage }>Reset Local Storage</Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                {
                    images.map((item, index) => (
                        <Card key={index}>
                            <div className="group flex transform flex-col overflow-hidden transition-all duration-200">
                                <div className="overflow-hidden rounded-md">
                                    <Image
                                        src={item.image}
                                        alt="Image"
                                        width={640}
                                        height={480}
                                        className="w-full h-full transform object-cover transition-all duration-200 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                            
                        </Card>
                    ))
                }
                
            </div>
        </>
    )
}