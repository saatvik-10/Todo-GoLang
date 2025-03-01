import { Container, Stack } from '@chakra-ui/react';
import Navbar from './components/ui/Navbar';
import TodoForm from './components/ui/TodoForm';
import TodoList from './components/ui/TodoList';

export const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:4000/api' : '/api';

function App() {
  return (
    <Stack h={'100vh'}>
      <Navbar />
      <Container maxW={'xl'}>
        <TodoForm />
        <TodoList />
      </Container>
    </Stack>
  );
}

export default App;
