import { Badge, Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Todo } from './TodoList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../../App';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();

  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ['updateTodo'],
    mutationFn: async () => {
      if (todo.completed) return alert('Todo is already completed');

      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: 'PATCH',
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong!');
        }

        return data;
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: async () => {
      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong!');
        }

        return data;
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <Flex gap={2} alignItems={'center'}>
      <Flex
        flex={1}
        alignItems={'center'}
        borderWidth={'1px'}
        borderColor={'gray.600'}
        p={2}
        borderRadius={'lg'}
        justifyContent={'space-between'}
      >
        <Text
          color={todo.completed ? 'green.400' : 'yellow.400'}
          textDecoration={todo.completed ? 'line-through' : 'none'}
        >
          {todo.body}
        </Text>
        {todo.completed && (
          <Badge ml='1' color={'green.400'}>
            Done
          </Badge>
        )}
        {!todo.completed && (
          <Badge ml='1' color={'yellow.400'}>
            In Progress
          </Badge>
        )}
      </Flex>
      <Flex gap={2} alignItems={'center'}>
        <Box
          color={'green.500'}
          cursor={'pointer'}
          onClick={() => updateTodo()}
        >
          {!isUpdating && <FaCheckCircle size={20} />}
          {isUpdating && <Spinner size={'sm'} />}
        </Box>
        <Box color={'red.500'} cursor={'pointer'} onClick={() => deleteTodo()}>
          {!isDeleting && <MdDelete size={25} />}
          {isDeleting && <Spinner size={'sm'} />}
        </Box>
      </Flex>
    </Flex>
  );
};
export default TodoItem;
