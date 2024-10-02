import React from 'react'
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import { UserFilters } from "@/constants/filter";
import Link from "next/link";
import { getAllUsers } from '@/lib/actions/user.action';
import Usercard from '@/components/cards/Usercard';

const page = async () => {
    const result = await getAllUsers({});

    return (
        <>
            <h1 className="h1-bold text-dark100_light900 "> All Users</h1>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchbar
                    route="/community"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    otherClasses="flex-1"
                    placeholder="Search for amazing minds"
                />
                <Filter
                    filters={UserFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                />
            </div>
            <section className="mt-12 flex flex-wrap gap-4">
                {result.users.length > 0 ? (
                    result.users.map((user) =>(
                        <Usercard key={user._id} user={user} />
                ))
                ):(
                <div className='"paragraph-regular text-dark200_light800 mx-auto max-w-4x1 text-center'>
                    <p>No users yet</p>
                    <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">Join to be the first! </Link>
                </div>
                    )}
            </section>
        </>
    )
}

export default page