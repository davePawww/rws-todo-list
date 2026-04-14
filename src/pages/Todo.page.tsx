import { AddTodo, TodoFilter, TodoList } from '@/features/todo';

export default function TodoPage() {
  return (
    <>
      <AddTodo />
      <TodoFilter />
      <TodoList />
    </>
  );
}
