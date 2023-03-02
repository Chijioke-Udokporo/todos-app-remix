import TaskController from '../modules/task/task.controller';
import { AnimatePresence, motion } from 'framer-motion';
import { DataFunctionArgs } from '@remix-run/node';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { TaskItem } from '~/components/task';

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
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold uppercase">Total Task ({tasks?.items?.length})</h1>

        {Fetcher?.state === 'loading' && <span className="text-gray-500">Loading . . .</span>}
      </div>

      <Fetcher.Form method="post" ref={formRef} className="flex gap-2">
        <input
          className="flex-1 rounded p-3 border-[1px] border-gray-400"
          type="text"
          name="task"
          placeholder="Enter a task"
          required
        />

        <button
          className="p-3 w-[6em] text-sm text-white bg-blue-500 rounded"
          disabled={Fetcher?.state === 'loading'}
          type="submit"
        >
          GO
        </button>
      </Fetcher.Form>

      <AnimatePresence>
        <div className="flex flex-col ">
          {tasks?.items?.map((task) => (
            <TaskItem key={task.id} task={task} onCompleted={onCompleted} onDelete={onDelete} />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
