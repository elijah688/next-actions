"use server";

import { db } from "@/lib/db";
import { Note } from "@/model/note";
import { redirect } from 'next/navigation'

export async function GetNotes(limit: number, offset: number): Promise<Note[]> {
  return await db.getPaginatedNotes(limit, offset);
}

export async function UpsertNote(note: Note): Promise<Note> {
  return await db.upsertNote(note);
}

export async function GetnoteByID(id: string): Promise<Note> {
  return await db.getNoteById(id);
}

export async function DeleteByID(id: string): Promise<void> {
  return await db.deleteNoteByID(id);
}


export async function formAction(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const note = { id, title, content, updated_at: new Date() }
  console.log(note)
  await UpsertNote(note);
  redirect("/notes")
}
