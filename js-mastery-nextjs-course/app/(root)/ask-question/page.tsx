import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import React from "react";
import type { Metadata } from "next";

export const  metadata: Metadata = {
  title:'Ask Question | Dev Overflow'
}
const page = async () => {
  const { userId } = auth();
  // const userId = "123456789";

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  return (
    <div>
      <h1 className="h1-bold text-dark-100_light900"> Ask a Question </h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default page;
