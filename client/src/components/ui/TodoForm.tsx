import { Button, Flex, Input, Spinner } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState('');
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Todo added!');
  };
  return (
    <form onSubmit={createTodo}>
      <Flex gap={2}>
        <Input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          ref={inputRef}
        />
        <Button
          mx={2}
          type='submit'
          _active={{
            transform: 'scale(.97)',
          }}
        >
          {isPending ? <Spinner size={'xs'} /> : <IoMdAdd size={30} />}
        </Button>
      </Flex>
    </form>
  );
};
export default TodoForm;
