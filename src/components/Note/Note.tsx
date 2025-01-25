import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Note } from "@/model/note";
import { format } from "date-fns";
import { MouseEventHandler } from "react";

const NoteCard: React.FC<{
  onDelete: MouseEventHandler<HTMLButtonElement>;
  note: Note;
  onEdit: MouseEventHandler<HTMLButtonElement>;
}> = ({ note, onEdit, onDelete }) => {
  return (
    <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl xl:max-w-2xl mx-auto mb-6 bg-white shadow-md rounded-lg dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {note.title}
        </CardTitle>
        {note?.updated_at && (
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            Last updated:{" "}
            {format(new Date(note.updated_at), "MMMM dd, yyyy h:mm a")}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {note.content}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between text-sm text-gray-400 dark:text-gray-500">
        <span>ID: {note.id}</span>
        <div className="space-x-2">
          <Button
            onClick={onEdit}
            variant="outline"
            className="text-gray-700 dark:text-gray-300 dark:border-gray-500"
          >
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="destructive"
            className="text-white bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
