import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { TodoFormData, TodoStore, UpdateTodoData } from '@/features/todo/todo.types';

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',
      setFilter: (filter) => set({ filter }),
      addTodo: ({ title, description, priority, dueDate }: TodoFormData) => {
        if (!title.trim()) return;

        set((state) => ({
          todos: [
            {
              id: crypto.randomUUID(),
              title: title.trim(),
              description,
              completed: false,
              priority,
              dueDate,
            },
            ...state.todos,
          ],
        }));
      },
      updateTodo: ({ id, title, description, priority, dueDate }: UpdateTodoData) => {
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                title: title.trim(),
                description,
                priority,
                dueDate,
              };
            }

            return todo;
          }),
        }));
      },
      toggleTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                completed: !todo.completed,
              };
            }

            return todo;
          }),
        })),
      deleteTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: 'todo-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ todos: state.todos, filter: state.filter }),
    },
  ),
);
