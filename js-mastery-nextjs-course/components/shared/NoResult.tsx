import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />

      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />

      <h2>{title}</h2>
      <p>{description}</p>
      <Link href={link}>
        <Button className="paragraph-medium  hober:bg-primary-500 dark:bg-primary-500  dar:text-light-900 bg-primary-500 text-light-900 mt-5 min-h-[46px] rounded-lg px-4 py-3">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
