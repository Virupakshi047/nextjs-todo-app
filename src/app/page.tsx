import { TodoList } from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Todo App</h1>
          <ThemeToggle />
        </div>
        <TodoList />
      </div>
    </main>
  );
}