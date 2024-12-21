import { BrowserRouter} from 'react-router-dom';
import './App.css';
import { useState } from 'react';

const AppRouter = () => {
  const [user, setUser] = useState({username:'',
    password:'',admin: false
  });
}

function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
