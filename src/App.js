import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import VocabList from './VocabList';
import VocabEdit from './VocabEdit';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadWordDB } from './redux/modules/vocabulary';
import { useNavigate } from 'react-router-dom';
import React from 'react';
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadWordDB());
  }, []);
  return (
    <div className='App'>
      <GlobalStyle />
      <Container>
        <Header onClick={() => navigate('/')}>태국어 사전</Header>
        <Box>
          <Routes>
            <Route path='/' element={<VocabList />} />
            <Route path='/word/add' element={<VocabEdit />} />
          </Routes>
        </Box>
      </Container>
    </div>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  ${reset}
  `;

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  font-family: Dongle;
  background-color: #ffffff;
`;

const Header = styled.div`
  display: inline-block;
  padding: 35px 0 15px 0;
  font-size: 48px;
  font-weight: bold;
  color: #ffafcc;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  &:hover {
    font-size: 52px;
    margin-bottom: -4px;
    color: #ffc8dd;
  }
`;

const Box = styled.div`
  height: 90%;
  width: 88vw;
  border-radius: 10px;
`;
