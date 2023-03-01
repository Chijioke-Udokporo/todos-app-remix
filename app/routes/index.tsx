import TaskController from '../modules/task/task.controller';
import { DataFunctionArgs } from '@remix-run/node';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { useFetcher, useLoaderData } from '@remix-run/react';

export const loader = async ({ request }: DataFunctionArgs) => {
  return await TaskController.getTasks();
};

export const action = async ({ request }: DataFunctionArgs) => {
  const method = request.method;
  const formData = await request.formData();
  const id = formData.get('id');
  const task = formData.get('task');

  if (method === 'POST') {
    return await TaskController.newTask(task as string);
  }

  if (method === 'PATCH') {
    return await TaskController.updateTask(id as string);
  }

  if (method === 'DELETE') {
    return await TaskController.deleteTask(id as string);
  }

  return {};
};

type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function Index() {
  const { tasks, error } = useLoaderData() as LoaderData;
  const Fetcher = useFetcher();
  const formRef = useRef<any>();

  if (error) toast.error(error, { toastId: 0 });

  const onCompleted = (id: string) => {
    Fetcher.submit({ id }, { method: 'patch' });
  };

  const onDelete = (id: string) => {
    Fetcher.submit({ id }, { method: 'delete' });
  };

  useEffect(() => {
    if (Fetcher?.data?.message) {
      toast.success(Fetcher?.data?.message);
      formRef.current.reset();
    }

    if (Fetcher?.data?.error) {
      toast.error(Fetcher?.data?.error);
    }
  }, [Fetcher?.data]);

  return (
    <div className="flex flex-col max-w-xl gap-6 p-10 mx-auto">
      <h1 className="text-2xl font-bold">Total Task ({tasks?.items?.length})</h1>

      <Fetcher.Form method="post" ref={formRef} className="flex gap-2">
        <input
          className="flex-1 rounded p-3 border-[1px] border-gray-400"
          type="text"
          name="task"
          placeholder="Enter a task"
          required
        />

        {Fetcher?.state === 'idle' && (
          <input className="p-3 w-[10em] text-white bg-blue-500 rounded" type="submit" value="GO" />
        )}
        {Fetcher?.state === 'loading' && (
          <input className="p-3 w-[10em] text-white bg-blue-500 rounded" disabled value="Loading . . ." />
        )}
      </Fetcher.Form>

      <div className="flex flex-col ">
        {tasks?.items?.map((task) => (
          <div key={task.id} className="flex justify-between gap-2 py-4 border-b-[1px]">
            <div>
              <p className="text-xs text-gray-400">{task?.created}</p>
              <p>{task?.task}</p>
            </div>

            {task?.isCompleted && <span>Completed</span>}

            {!task?.isCompleted && (
              <div className="flex items-center gap-3">
                <button onClick={() => onCompleted(task?.id)} className="p-3 text-white bg-green-600 rounded">
                  Done
                </button>
                <button onClick={() => onDelete(task?.id)} className="p-3 text-white bg-red-600 rounded">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
