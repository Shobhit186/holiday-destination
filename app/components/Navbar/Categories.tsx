'use client';
import { TbBeach, TbPool } from "react-icons/tb";
import Container from "../Container";
import { GiBarn, GiCampfire, GiCastle, GiClubs, GiDesert, GiFishing, GiForest, GiHillFort, GiIsland, GiWindmill } from "react-icons/gi";
import { FaMountain } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import CategoryItem from "./CategoryItem";
import { usePathname, useSearchParams } from "next/navigation";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "Beach related content",
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "Windmill related content",
    },
    {
        label: "Mountain",
        icon: FaMountain,
        description: "Mountain related content",
    },
    {
        label: "Forest",
        icon: GiForest,
        description: "Forest related content",
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "Modern related content",
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "Pool related content",
    },
    {
        label: "Islands",
        icon: GiIsland,
        description: "Island related content",
    },
    {
        label: "Lake",
        icon: GiFishing,
        description: "Lake related content",
    },
    {
        label: "Snow",
        icon: BsSnow,
        description: "Snow related content",
    },
    {
        label: "Castles",
        icon: GiCastle,
        description: "Castle related content",
    },
    {
        label: "Camping",
        icon: GiCampfire,
        description: "Camping related content",
    },
    {
        label: "Clubs",
        icon: GiClubs,
        description: "Clubs related content",
    },
    {
        label: "Forts",
        icon: GiHillFort,
        description: "Forts related content",
    },
    {
        label: "Deserts",
        icon: GiDesert,
        description: "Desert related content",
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "Barn related content",
    },
    {
        label: "Lux",
        icon: IoDiamond,
        description: "Luxurious related content",
    }
];

const Categories = () => {
    const params = useSearchParams();
    const item = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';
    if(!isMainPage){
        return null;
    }
  return (
    <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((category,index) => (
            <CategoryItem key={index} label={category.label} selected={item === category.label} icon={category.icon} description={category.description} />
          ))}
        </div>
    </Container>
  )
}

export default Categories