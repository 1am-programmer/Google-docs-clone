"use client";
import { Button } from "./ui/button";
import Image from "next/image";
import { createDocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";

const AddDocumentBtn = ({ email, userId }: AddDocumentBtnProps) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });

      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="gradient-blue flex gap-1 shadow-md "
    >
      <Image
        src="/assets/icons/add.svg"
        alt="add  Document"
        height={24}
        width={24}
        className=""
      />
      <p className="hidden sm:block">Start a blank document</p>
    </Button>
  );
};

export default AddDocumentBtn;