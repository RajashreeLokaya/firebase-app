import './App.css';
import { AuthProvider } from './contex/AuthContext';
import { router } from './routes/Routes';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  );
}

export default App;
