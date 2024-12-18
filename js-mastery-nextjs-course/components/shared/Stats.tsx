import { formatAndDivideNumber } from '@/lib/utils';
import { BadgeCounts } from '@/types';
import Image from 'next/image';
import React from 'react'

interface StatsCardProps {
    imgurl: string;
    value: number;
    title: string
}

const StatsCard = ({ imgurl, value, title }: StatsCardProps) => {
    return (
        <div className='light-border background-light900_dark300 flex flex-wrap
        items-center justify-start gap-4 rounded-md border p-6 
        shadow-light-300 dark:shadow-dark-200'>
        <Image src={imgurl} alt="title" width={40} height={50} />
            <div >
                <p className='paragraph-semibold text-dark200_light900'>
                       {value}
                </p>
                <p className='body-medium text-dark400_light700'>
                    {title}
                </p>
            </div>
        </div>
    )
}
interface Props {
    totalQuestions: number;
    totalAnswers: number;
    badges:BadgeCounts;
    reputation:number
}


const Stats = ({ totalQuestions, totalAnswers ,badges,reputation}: Props) => {
    return (
        <div className='mt-10'>
            <h4 className='h3-semibold text-dark200_light900'>Stats</h4>
            <div className='mt-5 grid  gird-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
                <div className='light-border background-light900_dark300 flex flex-wrap
             items-center justify-evenly gap-4 rounded-md border p-6 
             shadow-light-300 dark:shadow-dark-200'>
                    <div>
                        <p className='paragraph-semibold text-dark200_light900'>
                            {formatAndDivideNumber(totalQuestions)}
                        </p>
                        <p className='body-medium text-dark400_light700'>
                            Questions
                        </p>
                    </div>
                    <div>
                        <p className='paragraph-semibold text-dark200_light900'>
                            {formatAndDivideNumber(totalAnswers)}
                        </p>
                        <p className='body-medium text-dark400_light700'>
                            Answers
                        </p>
                    </div>
                </div>

                <StatsCard
                    imgurl="/assets/icons/gold-medal.svg"
                    value={badges.GOLD}
                    title="Gold Badges"
                />
                <StatsCard
                    imgurl="/assets/icons/silver-medal.svg"
                    value={badges.SILVER}
                    title="Silver Badges"
                />
                <StatsCard
                    imgurl="/assets/icons/bronze-medal.svg"
                    value={badges.BRONZE}
                    title="Bronze Badges"
                />
            </div>
        </div>
    )
}

export default Stats