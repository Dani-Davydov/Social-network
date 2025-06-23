import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import {Root} from "./components/Root/Root.jsx";
import {SettingsPage} from "./pages/settings/SettingsPage.jsx";
import {MyProfilePage} from "./pages/myProfile/MyProfilePage.jsx";
import {FindFriendsPage} from "./pages/findFriends/FindFriendsPage.jsx";
import {AuthPage} from "./pages/auth/AuthPage.jsx";
import {RegistrationPage} from "./pages/regestration/regestrationPage.jsx";
import { Provider } from 'react-redux'
import {store} from './Redux/store.js'

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
                path: "settings",
                element: <SettingsPage/>,
            },
            {
                path: "userProfile",
                element: <MyProfilePage/>,
            },
            {
                path: "findFriends",
                element: <FindFriendsPage/>,
            },
            {
                path: "auth",
                element: <AuthPage/>,
            },
            {
                path: "regestration",
                element: <RegistrationPage/>,
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
