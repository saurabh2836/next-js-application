"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRouter,usePathname, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [search,setSearch] = useState(query || '');
  const [isOpen,setIsOpen] = useState(false);
  const searchContainerRef = useRef(null)

 useEffect(()=>{
      const handleOutsideClick  = (event: any) => {
        if(searchContainerRef.current && 
          !searchContainerRef.current.contains(event.target)
        ){
          setIsOpen(false);
          setSearch('')
        }
      }
        setIsOpen(false);

        document.addEventListener("click",handleOutsideClick);
        return  () => {
              document.addEventListener("click",handleOutsideClick)
        }
 },[pathname])


  useEffect(() => {
        const delayDebounceFn = setTimeout(()=>{
          if(search){
            const newUrl = formUrlQuery({
              params:searchParams.toString(),
              key:'global',
              value:search
            })
            router.push(newUrl,{scroll:false})
          } else{
            if(query){
              const newUrl = removeKeysFromQuery({
                params:searchParams.toString(),
                keysToRemove:['global','type']
              })
              router.push(newUrl,{scroll:false})
            }
          }
        },300);
        return ()=>clearTimeout(delayDebounceFn);
  },[search,router,pathname,router,searchParams,query])

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden" ref={searchContainerRef}>
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
        <Input
          type="text"
          value={search}
          onChange={(e)=>{
            setSearch(e.target.value);

            if(!isOpen) setIsOpen(true);
            if(e.target.value === ''  && isOpen)
              setIsOpen(false);
          }}
          placeholder="Search Anything globally"
          className="paragraph-regular text-dark400_light700
          no-focus placeholder background-light800_darkgradient 
          border-none shadow-none outline-none"
        />
      </div>
      {isOpen && <GlobalResult /> } 
    </div>
  );
};

export default GlobalSearch;
