import { BrowserRouter } from "react-router-dom"
import { AppRoute } from "./routes/AppRoute"
import { useAppDispatch } from "./utilities/AppDispatch"
import { useEffect } from "react";
import { fetchUser } from "./services/userService";
import { userFetchUserThunk } from "./slices/userSlice";

function App() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUser();
      dispatch(userFetchUserThunk(user.data));
    }
    getUser()
  })

  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  )
}

export default App
