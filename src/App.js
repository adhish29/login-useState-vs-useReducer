import React from 'react';
import { useRef, useState } from 'react';
import './style.css';
import { login } from './fakeAsyncLoginChk';

//using useState

// export default function App() {
//   const userRef = useRef();
//   const pwdRef = useRef();
//   const [error, setError] = useState();
//   const [inLoggedIn, setIsLoggedIn] = useState(false);
//   const [disabled, setDisabled] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const username = userRef.current.value;
//     const password = pwdRef.current.value;
//     userRef.current.value = '';
//     pwdRef.current.value = '';
//     setError();
//     setIsLoggedIn(false);
//     setDisabled(true);
//     let data;
//     try {
//       data = await login({
//         username,
//         password,
//       });
//       setIsLoggedIn(true);
//     } catch (e) {
//       setError(e.message);
//     }
//     setDisabled(false);
//     // console.log(data);
//   }
//   return (
//     <>
//       {inLoggedIn ? (
//         <div className="logout-container">
//           <h1>Logged In</h1>
//           <button className="logout" onClick={() => setIsLoggedIn(false)}>
//             Log Out
//           </button>
//         </div>
//       ) : (
//         <div className="login-container">
//           {/* {console.log(inLoggedIn)} */}
//           <form className="form" onSubmit={handleSubmit}>
//             {error && <h3 className="error">{error}</h3>}
//             <p>Please login!</p>
//             <input
//               type="text"
//               placeholder="username"
//               ref={userRef}
//               onChange={() => setError()}
//               required
//             />
//             <input
//               type="password"
//               placeholder="password"
//               ref={pwdRef}
//               onChange={() => setError()}
//               required
//             />
//             <button className="login" disabled={disabled}>
//               {disabled ? 'Logging in...' : 'Log In'}
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// }

//using useReducer
import { useReducer } from 'react';

const initialState = {
  username: '',
  password: '',
  error: '',
  isLoggedIn: false,
  disabled: false,
};

function loginReducer(state, action) {
  switch (action.type) {
    case 'field':
      console.log(action.fieldname, action.payload);
      return {
        ...state,
        error: '',
        [action.fieldname]: action.payload,
      };
    case 'login':
      return {
        ...state,
        error: '',
        disabled: true,
      };
    case 'success':
      return {
        ...state,
        isLoggedIn: true,
        disabled: false,
      };

    case 'error':
      return {
        ...state,
        error: action.payload,
        isLoggedIn: false,
        disabled: false,
        username: '',
        password: '',
      };

    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, error, isLoggedIn, disabled } = state;

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'login' });
    let data;
    try {
      data = await login({
        username,
        password,
      });

      dispatch({ type: 'success' });
    } catch (e) {
      dispatch({ type: 'error', payload: e.message });
    }
  }
  return (
    <>
      {isLoggedIn ? (
        <div className="logout-container">
          <h1>Logged In</h1>
          <button
            className="logout"
            onClick={() => dispatch({ type: 'logout' })}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="login-container">
          {/* {console.log('hello')} */}
          <form className="form" onSubmit={handleSubmit}>
            {error && <h3 className="error">{error}</h3>}
            <p>Please login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => {
                dispatch({
                  type: 'field',
                  fieldname: 'username',
                  payload: e.target.value,
                });
              }}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                dispatch({
                  type: 'field',
                  fieldname: 'password',
                  payload: e.target.value,
                });
              }}
              required
            />
            <button className="login" disabled={disabled}>
              {disabled ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
