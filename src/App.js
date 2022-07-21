import Container from "./components/Container";
import MainScreen from "./components/MainScreen";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "./api/userApi";
import { Rings } from "react-loader-spinner";
import LoginScreen from "./components/LoginScreen";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data, isLoading, isError, error } = useQuery(["user"], getUserInfo, {
    retry: false,
    onSuccess: ({ data }) => {
      setUsername(data.username);
      setIsLoggedIn(true);
    },
    onError: (err) => {
      if (err.response.status === 403) {
        setIsLoggedIn(false);
        return;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Rings color="#1D9BF0" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="App w-full flex align-middle justify-center min-h-screen ">
        <Container>
          <LoginScreen />
        </Container>
      </div>
    );
  }
  return (
    <div className="App w-full flex align-middle justify-center min-h-screen ">
      <Container>
        <MainScreen username={username} />
      </Container>
    </div>
  );
}

export default App;
