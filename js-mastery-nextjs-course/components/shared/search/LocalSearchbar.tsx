"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const [state, setState] = useState(0);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4  ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        defaultValue={state}
        onChange={(e) => setState(0)}
        className="no-focus placeholder  paragraph-regular background-light800_darkgradient  border-none shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearchbar;
