"use client";

import NoteCard from "@/components/Note/Note";
import { useEffect, useState, startTransition } from "react";
import { DeleteByID, GetNotes } from "../../acitons/actions";
import { Note } from "@/model/note";
import { useRouter } from "next/navigation";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function getNotes() {
      const fetchedNotes = await GetNotes(3, offset);
      setNotes(fetchedNotes);
    }
    getNotes();
  }, [offset]);

  const changePage = (direction: "next" | "prev") => {
    startTransition(() => {
      setOffset((prevOffset) => {
        if (direction === "next") return prevOffset + 3;
        if (direction === "prev" && prevOffset > 0) return prevOffset - 3;
        return prevOffset;
      });
    });
  };

  const handleDelete = (id: string) => {
    setIsTransitioning(true);
    startTransition(async () => {
      await DeleteByID(id);
      const fetchedNotes = await GetNotes(3, offset);
      setNotes(fetchedNotes);
      setIsTransitioning(false);
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-900">Meeting Notes</h1>

      <div className="flex justify-between m-4">
        <button
          onClick={() => changePage("prev")}
          className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md disabled:opacity-50"
          disabled={offset === 0 || isTransitioning}
        >
          Previous
        </button>

        <button
          onClick={() => router.push("/notes/edit")}
          className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md"
          disabled={isTransitioning}
        >
          New Note
        </button>

        <button
          onClick={() => changePage("next")}
          className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md"
          disabled={notes.length < 3 || isTransitioning}
        >
          Next
        </button>
      </div>

      <div className="space-y-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={() => handleDelete(note.id!.toString())}
            onEdit={() => router.push(`/notes/${note.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
