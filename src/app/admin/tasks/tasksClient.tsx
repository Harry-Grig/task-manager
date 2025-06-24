"use Client";
type Task = {
  id: string;
  title: string;
  status: string;
  dueDate: string | null; 
  priority: string;
};

type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  tasks: Task[];
};

type Props = {
  users: User[];
};

export default function UsersWithTasksPage({ users }: Props) {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold mb-8 text-rose-700 dark:text-rose-400 text-center tracking-tight">
        All Users & Their Tasks
      </h1>
      {users.map((user) => (
        <div
          key={user.id}
          className="border rounded-2xl p-6 shadow-lg bg-white dark:bg-zinc-900 space-y-4 transition-all duration-200 hover:shadow-2xl hover:border-rose-400 dark:hover:border-rose-500 group"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors duration-200">
                {user.name}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-rose-500 dark:group-hover:text-rose-300 transition-colors duration-200">
                {user.email}
              </p>
              <p className="text-sm text-rose-700 dark:text-rose-400 capitalize font-semibold group-hover:underline">
                Role: {user.role.toLowerCase()}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-200 dark:border-rose-700">
                {user.tasks.length} Task{user.tasks.length !== 1 && 's'}
              </span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            {user.tasks.length === 0 ? (
              <div className="text-sm text-zinc-400 col-span-2 text-center py-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-700">
                No tasks assigned.
              </div>
            ) : (
              user.tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 border rounded-xl bg-rose-50 dark:bg-zinc-800 text-sm shadow-sm flex flex-col gap-1 hover:bg-rose-100 dark:hover:bg-rose-900 hover:border-rose-400 dark:hover:border-rose-500 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{task.title}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border capitalize ${
                      task.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : task.status === 'IN_PROGRESS'
                        ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        : 'bg-zinc-200 text-zinc-700 border-zinc-300'
                    }`}>
                      {task.status.toLowerCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <span className={`px-2 py-0.5 rounded-full border font-medium ${
                      task.priority === 'HIGH'
                        ? 'bg-rose-200 text-rose-800 border-rose-300'
                        : task.priority === 'NORMAL'
                        ? 'bg-orange-100 text-orange-700 border-orange-200'
                        : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
