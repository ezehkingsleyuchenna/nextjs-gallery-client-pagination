import Image from "next/image";
import { Card } from "./ui/card";
import { faker } from '@faker-js/faker';

export default function PaginationComponent() {

    const image = faker.image.urlPicsumPhotos;

    return (
        <div>
            <Card>
                <Image src={image} alt="" width={640} height={480} />
            </Card>
        </div>
    )
}