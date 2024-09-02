"use client"

import Image from "next/image";
import { Card } from "./ui/card";
import { faker } from '@faker-js/faker';
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";

export default function PaginationComponent() {
    const [images, setImages] = useState<{ image: string }[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPage] = useState(6);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = images.slice(firstItemIndex, lastItemIndex);

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
            const newImages = Array.from({ length: 30 }, generateFakeImage);
            setImages(newImages)
            localStorage.setItem("fakerImages", JSON.stringify(newImages));
        }
    }, []);

    return (
        <>
            <Button onClick={ resetLocalStorage }>Reset Local Storage</Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3 mb-5">
                {
                    currentItems.map((item, index) => (
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

            <PaginationSection
                totalItems={images.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

type PaginationSectionProps = {
    totalItems: any,
    itemsPerPage: any,
    currentPage: any,
    setCurrentPage: any
}

function PaginationSection({totalItems, itemsPerPage, currentPage, setCurrentPage}: PaginationSectionProps) {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(i);        
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePrevPage()} />
            </PaginationItem>

            {
                pages.map((page, index) => (
                    <PaginationItem
                        key={index}
                        className={cn({"bg-neutral-100 rounded-md": (currentPage === page)})}
                    >
                        <PaginationLink onClick={() => setCurrentPage(page)}>
                            {page}
                        </PaginationLink>                        
                    </PaginationItem>
                ))
            }
            {/* <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationNext onClick={() => handleNextPage()} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
}