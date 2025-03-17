import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import './App.css';
import reactLogo from './assets/react.svg';
import { Api } from './myApi';
import { AppDispatch, RootState } from './store/redux.store';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);
  const useAppDispatch = () => useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const data = useAppSelector((state) => state.todoSlice.name);
  console.log(data);

  useEffect(() => {
    const api = new Api({
      baseUrl:
        'https://todo-app.proudforest-fddd498f.westeurope.azurecontainerapps.io',
    });
    api.users.usersList();
  }, []);

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
