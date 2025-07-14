import './App.css'
import {Auth} from "./pages/Auth/Auth.jsx";
import {useSelector} from "react-redux";
import {Posts} from "./pages/Posts/Posts.jsx";

function App() {
    const currentUser = useSelector((state) => state.users.currentUser);

  return (
    <>
        {!currentUser ? <Auth/> : <Posts/>}
    </>
  )
}

export default App
