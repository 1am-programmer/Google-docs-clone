"use client";

import React, { ReactNode, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import { LiveblocksUIConfig } from "@liveblocks/react-ui";

const Notifiations = () => {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();
  const unreadNotifications = inboxNotifications.filter(
    (notifiations) => !notifiations.readAt
  );

  //   let count = 1;

  return (
    <div>
      <Popover>
        <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
          <Image
            src="/assets/icons/bell.svg"
            alt="Notifications"
            width={24}
            height={24}
          />
          {count > 0 && (
            <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-blue-500 " />
          )}
        </PopoverTrigger>
        <PopoverContent align="end" className="shad-popover">
          <LiveblocksUIConfig
            overrides={{
              INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
                <>{user} mentioned you.</>
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Notifiations;
