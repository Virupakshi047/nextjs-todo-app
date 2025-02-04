'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onView: () => void;
}

export function TodoItem({ todo, onToggle, onDelete, onView }: TodoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded shadow cursor-move"
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-4 w-4"
        />
        <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.text}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onView}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
}