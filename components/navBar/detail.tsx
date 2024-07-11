"use client";

import React from "react";
import { Link } from "react-scroll";

interface IDetailednavbar {
  contentArray: string[];
  id: string;
}

const Detaiednavbar = ({ contentArray, id }: IDetailednavbar) => {
  return (
    <ul
      id={id}
      className="absolute top-full left-0 border-gray-600 border z-10 hidden w-max bg-white"
    >
      {contentArray.map((data, index) => {
        return (
          <li
            className="p-3 h-10 border flex justify-center items-center hover:bg-gray-200 text-base cursor-pointer"
            key={index}
          >
            <Link to={data} smooth={true} duration={500}>
              {data}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Detaiednavbar;
