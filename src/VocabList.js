import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import VocabItems from './VocabItems';
import React from 'react';

const VocabList = () => {
  const navigate = useNavigate();
  const vocabList = useSelector(state => state.vocabulary.list);
  return (
    <VocabContainer>
      {vocabList.length === 0 ? <NoGuide>등록된 단어가 없습니다.</NoGuide> : vocabList.map(vocab => <VocabItems key={vocab.id} vocab={vocab} />)}
      <WriteButton>
        <FontAwesomeIcon onClick={() => navigate('/word/add')} icon={faCirclePlus} size='4x' />
      </WriteButton>
    </VocabContainer>
  );
};

const NoGuide = styled.span`
  margin-top: 30px;
  display: block;
  font-size: 46px;
  color: #ffafcc;
`;

const VocabContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-flow: wrap;
`;

const WriteButton = styled.div`
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
export default VocabList;
