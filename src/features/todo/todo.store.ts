import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { TodoStore } from './todo.types';

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (title: string) => {
        if (!title.trim()) return;

        set((state) => ({
          todos: [
            {
              id: crypto.randomUUID(),
              title: title.trim(),
              completed: false,
            },
            ...state.todos,
          ],
        }));
      },
      toggle: (id: string) =>
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
    }),
    {
      name: 'todo-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ todos: state.todos }),
    },
  ),
);
