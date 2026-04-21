import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Dialog,
} from '@/components/ui/dialog';
import { FieldGroup, Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { useTodoStore } from '@/features/todo/todo.store';
import { todoSchema, type TodoFormData, type TodoFormValues } from '@/features/todo/todo.types';

export function AddTodo() {
  const addTodo = useTodoStore((state) => state.addTodo);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const todoForm = useForm<TodoFormValues, unknown, TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: new Date(),
    },
  });

  function onSubmit(data: TodoFormData) {
    addTodo(data);
    setDialogOpen(false);
    todoForm.reset();
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={() => {
        todoForm.reset();
        setDialogOpen((prev) => !prev);
      }}
    >
      <form
        id="todo-form"
        onSubmit={(e) => {
          void todoForm.handleSubmit(onSubmit)(e);
        }}
      >
        <DialogTrigger asChild>
          <Button className="w-full">Create a new Todo</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Creating a new Todo Item</DialogTitle>
            <DialogDescription className="text-sm opacity-65">
              Fill up the form details below for your todo item. Click save once done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name="title"
              control={todoForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    className="text-sm"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-sm" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={todoForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Input
                    className="text-sm"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-sm" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="priority"
              control={todoForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Priority</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange} name={field.name}>
                    <SelectTrigger className="w-full text-sm">
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value="low" className="text-sm">
                          Low
                        </SelectItem>
                        <SelectItem value="medium" className="text-sm">
                          Medium
                        </SelectItem>
                        <SelectItem value="high" className="text-sm">
                          High
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="dueDate"
              control={todoForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Due Date</FieldLabel>
                  <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="data-[empty=true]:text-muted-foreground w-53 justify-start text-sm font-normal"
                      >
                        <CalendarIcon />
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpenCalendar(false);
                        }}
                        defaultMonth={field.value}
                        disabled={{ before: new Date() }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError className="text-sm" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => todoForm.reset()}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="todo-form">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
