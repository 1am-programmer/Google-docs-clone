"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { argv } from "process";
import { parseStringify } from "../utils";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName} `,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));
    // This statement creates a new array, {sortedUsers}, by mapping each email in userIds to its corresponding user object found in the users array.
    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log("error fetching users");
  }
};
