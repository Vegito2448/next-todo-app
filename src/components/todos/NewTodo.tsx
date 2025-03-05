'use client';

import { addTodo, deleteCompleted } from "@/actions";
import { Todo } from "@prisma/client";
import { IoTrashOutline } from "react-icons/io5";



export const NewTodo = () => {
  // const router = useRouter();

  // const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const completed = formData.get('completed') === 'on';
    const newTodo = { title, description, completed } as Todo;
    const create = await addTodo(newTodo);

    if (create) {
      // formRef.current?.reset();
      e.currentTarget.reset();
      // router.refresh();
    }

  };



  return (
    <form onSubmit={onSubmit} className='flex w-full' /* ref={formRef} */>
      <input
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="title" name="title" required />

      <input type="text"
        className="w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all ml-2"
        placeholder="description"
        name="description"
      />
      <label htmlFor="completed" className="ml-2">
        ¿Completed?
        <input
          type="checkbox"
          name="completed"
          className="ml-2 w-6 h-6 border-2 border-gray-200 rounded-lg outline-none focus:border-sky-500 transition-all"
          id="completed"
        />
      </label>
      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Create
      </button>

      <span className='flex flex-1'></span>

      <button
        onClick={async () => await deleteCompleted()}
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline className="mr-2" />
        Delete Completed Todos
      </button>


    </form>
  );
};
