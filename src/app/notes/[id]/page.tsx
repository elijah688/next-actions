import NoteForm from "@/components/NoteForm/NoteForm";
import { Note } from "@/model/note";
import { GetnoteByID } from "../../../acitons/actions";

interface Params {
  id: string;
}

const EditNotePage: React.FC<{ params: Promise<Params> }> = async ({
  params,
}) => {
  const { id } = await params;
  let note: Note = {};

  // the create/edit route is called edit,
  // so if there is no uuid it means create
  // TO-DO: pick a better name for the route
  if (id != "edit") {
    note = await GetnoteByID(id);
  }

  return <NoteForm note={note} />;
};

export default EditNotePage;
