'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

type Filter = 'all' | 'active' | 'completed';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo.trim(),
          completed: false,
          createdAt: new Date(),
        },
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={addTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </form>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded ${
            filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded ${
            filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Completed
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredTodos}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-2">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onView={() => router.push(`/todo/${todo.id}`)}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {todos.some(todo => todo.completed) && (
        <button
          onClick={clearCompleted}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}