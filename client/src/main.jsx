import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import {Root} from "./components/Root/Root.jsx";
import {FindFriends} from "./pages/FindFriends/FindFriends.jsx";
import {RegistrationPage} from "./pages/Registration/Registration.jsx";
import { Provider } from 'react-redux'
import {store} from './Redux/store.js'
import {Posts} from "./pages/Posts/Posts.jsx";
import {WritePost} from "./pages/WritePost/WritePost.jsx";
import {DetailPost} from "./pages/Posts/DetailPost/DetailPost.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                index: true,
                element: <App/>,
            },
            {
                path: "FindFriends",
                element: <FindFriends/>,
            },
            {
                path: "posts",
                element: <Posts/>,
            },
            {
                path: "posts/:id/:userId",
                element: <DetailPost/>,
            },
            {
                path: "Registration",
                element: <RegistrationPage/>,
            },
            {
                path: "WritePost",
                element: <WritePost/>,
            },
        ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  </StrictMode>,
)
