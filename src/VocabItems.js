import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencil, faTrashCan, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { doneWord, updateWordFB, deleteWordFB } from './redux/modules/vocabulary';
import { keyframes } from 'styled-components';

const VocabItems = ({ vocab }) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = React.useState(false);
  const [newWord, setNewWord] = React.useState({ thai: vocab.thai, korean: vocab.korean, exam: vocab.exam });

  const onDone = targetId => {
    dispatch(doneWord(targetId));
  };

  const onUpdate = targetId => {
    dispatch(updateWordFB(targetId, newWord));
    setIsEdit(false);
  };

  const onRemove = targetId => {
    dispatch(deleteWordFB(targetId));
  };

  const handleData = e => {
    const updateWord = {
      ...newWord,
      [e.target.name]: e.target.value,
    };
    setNewWord(updateWord);
  };

  const reset = () => {
    setIsEdit(prev => !prev);
    setNewWord({ thai: vocab.thai, korean: vocab.korean, exam: vocab.exam });
  };
  return (
    <VocabItem switch={vocab.isDone} key={vocab.id}>
      <VocabTop>
        {isEdit ? (
          <NewWord width='60%' type='text' name='thai' onChange={handleData} placeholder='수정할 태국어 단어' value={newWord.thai}></NewWord>
        ) : (
          <Info fontSize='30px' fontWeight='700'>
            {vocab.thai}
          </Info>
        )}
        {isEdit ? (
          <Icons>
            <Icon>
              <FontAwesomeIcon onClick={() => onUpdate(vocab.id)} icon={faPencil} size='xl' />
            </Icon>
            <Icon>
              <FontAwesomeIcon onClick={() => reset()} icon={faRotateLeft} size='xl' />
            </Icon>
          </Icons>
        ) : (
          <Icons>
            <Icon>
              <FontAwesomeIcon onClick={() => onDone(vocab.id)} icon={faCheck} size='xl' />
            </Icon>
            <Icon>
              <FontAwesomeIcon onClick={() => setIsEdit(prev => !prev)} icon={faPencil} size='xl' />
            </Icon>
            <Icon>
              <FontAwesomeIcon onClick={() => onRemove(vocab.id)} icon={faTrashCan} size='xl' />
            </Icon>
          </Icons>
        )}
      </VocabTop>
      {isEdit ? (
        <VocabBottom>
          <NewWord width='60%' marginTop='15px' type='text' name='korean' onChange={handleData} placeholder='한국어 단어 입력' value={newWord.korean} />
          <NewWord width='90%' marginTop='15px' type='text' name='exam' onChange={handleData} placeholder='예문 입력' value={newWord.exam} />
        </VocabBottom>
      ) : (
        <VocabBottom>
          <Info fontSize='28px' fontWeight='700' marginTop='5px'>
            [{vocab.korean}]
          </Info>
          <Info fontSize='18px' fontWeight='400' marginTop='15px'>
            {vocab.exam}
          </Info>
        </VocabBottom>
      )}
    </VocabItem>
  );
};
const NewWord = styled.input`
  width: ${props => props.width};
  border: none;
  outline: none;
  color: #ffafcc;
  border-bottom: 2.5px solid #eeeeee;
  transition: all 300ms ease-in-out;
  font-size: 18px;
  font-weight: 700;
  margin-top: ${props => props.marginTop};
  &:focus {
    border-bottom: 2px solid #ffafcc;
  }
  &::placeholder {
    font-family: Dongle;
    font-size: 25px;
    color: #ffc8dd;
  }
`;

const boxScale = keyframes`
  0% {transform: scale(1)}
  25% {transform: scale(1.1)}
  50% {transform: scale(1)}
`;

const VocabItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px solid #ffafcc;
  color: ${props => (props.switch ? '#ffffff' : '#ffafcc')};
  background-color: ${props => (props.switch ? '#ffafcc' : '#ffffff')};
  padding: 20px;
  width: 280px;
  height: 130px;
  border-radius: 10px;
  margin: 20px;
  transition: all 300ms ease-in-out;
  &:hover {
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    animation: ${boxScale} 800ms linear;
  }
`;

const VocabTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Icons = styled.div`
  display: flex;
`;

const VocabBottom = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info = styled.span`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  margin-top: ${props => props.marginTop};
`;

const Icon = styled.div`
  margin: 0 5px;
  cursor: pointer;
  transition: transform 300ms ease-in-out;
  &:hover {
    color: #d97e9f;
    transform: scale(1.2);
  }
`;
export default VocabItems;
