import { Box, Center, Input } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";
import DButton from "../components/DButton";
import { login } from "../services/login";

const Home = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Se já está logado, não mostra tela de login
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/conta/1");
    }
  }, [isLoggedIn, navigate]);

  const validateUser = async (email: string, password: string) => {
    const loggedIn = await login(email, password);

    if (!loggedIn) {
      return alert("Email ou senha inválidos");
    }

    setIsLoggedIn(true);
    setUser(email);

    localStorage.setItem("dioBankUser", JSON.stringify({ login: true, email }));

    navigate("/conta/1");
  };

  return (
    <Box padding="25px">
      <Card>
        <Center>
          <h1>Faça o login</h1>
        </Center>
        <Input
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          marginBottom="10px"
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          marginBottom="10px"
        />
        <Center>
          <DButton onClick={() => validateUser(email, password)} />
        </Center>
      </Card>
    </Box>
  );
};

export default Home;
