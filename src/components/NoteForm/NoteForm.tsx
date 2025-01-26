import { Note } from "@/model/note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { randomUUID } from "crypto";

interface NoteFormProps {
  note: Note;
}

const NoteForm: React.FC<NoteFormProps> = ({ note }) => {
  const isEdditing = !!note;

  const id = note.id || randomUUID()
  const x = formAction.bind(null, id)
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        {isEdditing ? "Edit" : "Create"} Note
      </h1>

      <form
        action={x}
        className="space-y-4 p-6 bg-white shadow-md rounded-lg dark:bg-gray-800 dark:border-gray-700"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <Input
            id="title"
            defaultValue={note.title}
            name="title"
            placeholder="Note Title"
            className="mt-2"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Content
          </label>
          <Textarea
            id="content"
            name="content"
            defaultValue={note.content}
            placeholder="Note Content"
            rows={6}
            className="mt-2"
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            {note ? "Update Note" : "Create Note"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
