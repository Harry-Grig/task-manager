import { User, Calendar, CheckCircle, Clock, AlertCircle, ArrowLeft, Mail, Shield } from 'lucide-react';
import Link from "next/link"
// Type definitions που ταιριάζουν με το Prisma schema
interface UserData {
  id: string;
  name: string | null;  // Μπορεί να είναι null στο schema σου
  email: string;
  role: 'ADMIN' | 'USER';
  _count: {
    tasks: number;
  };
}

interface TaskData {
  id: string;
  title: string;
  description: string | null;  // Μπορεί να είναι null στο schema σου
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'NORMAL' | 'HIGH';
  dueDate: Date | null;     // Date object, όχι string, και μπορεί να είναι null
  createdAt: Date;          // Date object, όχι string
  updatedAt: Date;          // Date object, όχι string
}

interface UserTasksAdminUIProps {
  user: UserData | null;
  tasks: TaskData[];
}

const UserTasksAdminUI: React.FC<UserTasksAdminUIProps> = ({ user, tasks }) => {
  const getStatusBadge = (status: TaskData['status']) => {
    const statusConfig = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, label: 'Pending' },
      IN_PROGRESS: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: AlertCircle, label: 'In Progress' },
      COMPLETED: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, label: 'Completed' }
    };
    const config = statusConfig[status] || statusConfig.PENDING;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <IconComponent size={12} />
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: TaskData['priority']) => {
    const priorityConfig = {
      LOW: { color: 'bg-gray-100 text-gray-800', label: 'Low' },
      NORMAL: { color: 'bg-orange-100 text-orange-800', label: 'Normal' },
      HIGH: { color: 'bg-red-100 text-red-800', label: 'High' }
    };
    const config = priorityConfig[priority] || priorityConfig.NORMAL;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleBadge = (role: UserData['role']) => {
    const roleConfig = {
      ADMIN: { color: 'bg-purple-100 text-purple-800', label: 'Admin' },
      USER: { color: 'bg-blue-100 text-blue-800', label: 'User' }
    };
    const config = roleConfig[role] || roleConfig.USER;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Shield size={12} />
        {config.label}
      </span>
    );
  };

  // Έλεγχος αν υπάρχουν δεδομένα
  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">User not found</h3>
          <p className="text-gray-600">The user you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const completedTasks = tasks?.filter(task => task.status === 'COMPLETED').length || 0;
  const inProgressTasks = tasks?.filter(task => task.status === 'IN_PROGRESS').length || 0;
  const pendingTasks = tasks?.filter(task => task.status === 'PENDING').length || 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft size={20} />
                <Link href="/admin/users" className="text-sm font-medium">
                  Back to Users
                  </Link>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">User Task Management</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{user.name || 'N/A'}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  <div className="mt-2">
                    {getRoleBadge(user.role)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{user._count.tasks}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{inProgressTasks}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingTasks}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Task List</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
              <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-base font-semibold text-gray-900">{task.title}</h4>
                      {getStatusBadge(task.status)}
                      {getPriorityBadge(task.priority)}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{task.description || 'No description'}</p>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>Created: {formatDate(task.createdAt.toString())}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>Due: {task.dueDate ? formatDate(task.dueDate.toString()) : 'No due date'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
            ) : (
              <div className="p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-600">This user does not have any tasks yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTasksAdminUI;