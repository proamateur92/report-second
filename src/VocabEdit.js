import styled from 'styled-components';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addWordFB } from './redux/modules/vocabulary';

const VocabEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputThai = React.useRef();
  const inputKorean = React.useRef();
  const inputExam = React.useRef();

  const onCreate = () => {
    const thai = inputThai.current.value;
    const korean = inputKorean.current.value;
    const exam = inputExam.current.value;
    dispatch(addWordFB({ thai, korean, exam, isDone: false }));
    navigate('/');
  };
  return (
    <>
      <RegistForm>
        <Guide>♥♡단어 등록하기♡♥</Guide>
        <ContentContainer>
          <Input ref={inputThai} type='text' placeholder='태국어 단어를 입력하세요.' />
          <Input ref={inputKorean} type='text' placeholder='한국어 단어를 입력하세요.' />
          <Input ref={inputExam} type='text' placeholder='태국어 예문을 입력하세요.' />
        </ContentContainer>
        <RegistButton onClick={onCreate}>등록하기</RegistButton>
      </RegistForm>
      <BackButton>
        <FontAwesomeIcon onClick={() => navigate('/')} icon={faCircleArrowLeft} size='4x' />
      </BackButton>
    </>
  );
};

const Guide = styled.span`
  display: block;
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const RegistForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  color: #ffafcc;
  border: 5px solid #ffafcc;
  height: 80%;
  border-radius: 10px;
`;

const ContentContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

const Input = styled.input`
  width: 90%;
  height: 50px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
  border: none;
  outline: none;
  color: #ffafcc;
  border-bottom: 2.5px solid #eeeeee;
  transition: all 300ms ease-in-out;
  &:focus {
    border-bottom: 2px solid #ffafcc;
  }
  &::placeholder {
    font-family: Dongle;
    font-size: 25px;
    color: #ffc8dd;
  }
`;

const RegistButton = styled.button`
  border: none;
  background-color: #ffafcc;
  width: 150px;
  padding: 10px;
  font-size: 25px;
  font-family: Dongle;
  color: #ffffff;
  border-radius: 5px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #d97e9f;
    transform: scale(1.1);
  }
`;

const BackButton = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  color: #ffafcc;
  background-color: white;
  border: 2px solid #ffffff;
  border: 2px solid #ffffff;
  border-radius: 50%;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  &:hover {
    color: #d97e9f;
    transform: scale(1.1);
  }
`;

export default VocabEdit;
