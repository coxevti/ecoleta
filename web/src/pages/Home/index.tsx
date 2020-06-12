import React from 'react';
import { LogIn } from 'react-feather';
import { Background, Container, Content } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Content>
        <header>
          <h1>Ecoleta</h1>
        </header>
        <main>
          <h1>Seu markeplace de coleta de resíduos.</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>
          <a href="/cadastro">
            <span>
              <LogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </a>
        </main>
      </Content>
      <Background />
    </Container>
  );
};

export default Home;
