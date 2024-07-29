"use client";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { updateDocument } from "@/lib/actions/room.actions";
import Loader from "./Loader";

// { children }: { children: React.ReactNode }

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  //State
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);

  //Refs
  const containerRef = useRef<HTMLDivElement>(null);
  // const inputRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  //Update and save on reload
  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setLoading(true);

      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);

          if (updatedDocument) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  //UseEffect to save
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [roomId, documentTitle]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              className="flex w-fit items-center justify-center gap-2"
              ref={containerRef}
            >
              {editing && !loading ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Enter title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  // disable={!editing}
                  className="document-title-input"
                />
              ) : (
                <>
                  <p className="document-title">{documentTitle}</p>
                </>
              )}

              {currentUserType === "editor" && !editing && (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="Edit icon"
                  height={24}
                  width={24}
                  onClick={() => setEditing(true)}
                  className="pointer"
                />
              )}
              {currentUserType !== "editor" && !editing && (
                <p className="view-only-tag">View only</p>
              )}

              {loading && <p className="text-sm  text-gray-400">Saving..</p>}
            </div>

            <div className="flex w-full flex-1 gap-2 justify-end sm:gap-3">
              <ActiveCollaborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
