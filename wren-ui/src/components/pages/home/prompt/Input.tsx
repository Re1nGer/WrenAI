import { useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { attachLoading } from '@/utils/helper';
import SendOutlined from '@ant-design/icons/SendOutlined';

// Container for the input and button
const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

// Styled textarea matching Figma design
const StyledTextArea = styled(Input.TextArea)`
  &.ant-input {
    padding: 16px 60px 16px 20px !important;
    font-size: 16px;
    line-height: 1.5;
    border: 1px solid #d9d9d9;
    border-radius: 16px;
    transition: all 0.3s ease;
    resize: none;
    min-height: 56px;
    
    &:hover {
      border-color: #14b8a6;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
    
    &:focus,
    &:focus-within {
      border-color: #14b8a6;
      box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.1);
      outline: none;
    }
    
    &::placeholder {
      color: #bfbfbf;
    }
    
    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }
`;

// Circular send button positioned inside textarea
const SendButton = styled.button<{ disabled: boolean }>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: ${props => props.disabled 
    ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
    : 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};
  box-shadow: ${props => props.disabled 
    ? 'none' 
    : '0 2px 8px rgba(20, 184, 166, 0.3)'};
  
  &:hover {
    transform: translateY(-50%) ${props => props.disabled ? 'none' : 'scale(1.05)'};
    box-shadow: ${props => props.disabled 
      ? 'none' 
      : '0 4px 12px rgba(20, 184, 166, 0.4)'};
  }
  
  &:active {
    transform: translateY(-50%) ${props => props.disabled ? 'none' : 'scale(0.98)'};
  }
  
  .anticon {
    font-size: 18px;
  }
`;

interface Props {
  question: string;
  isProcessing: boolean;
  onAsk: (value: string) => Promise<void>;
  inputProps: {
    placeholder?: string;
  };
}

export default function PromptInput(props: Props) {
  const { onAsk, isProcessing, question, inputProps } = props;
  const $promptInput = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [innerLoading, setInnerLoading] = useState(false);

  useEffect(() => {
    if (question) setInputValue(question);
  }, [question]);

  useEffect(() => {
    if (!isProcessing) {
      $promptInput.current?.focus();
      setInputValue('');
    }
  }, [isProcessing]);

  const syncInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const handleAsk = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    const startAsking = attachLoading(onAsk, setInnerLoading);
    startAsking(trimmedValue);
  };

  const inputEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.shiftKey) return;
    event.preventDefault();
    handleAsk();
  };

  const isDisabled = innerLoading || isProcessing;

  return (
    <InputContainer>
      <StyledTextArea
        ref={$promptInput}
        data-gramm="false"
        autoSize={{ minRows: 1, maxRows: 6 }}
        value={inputValue}
        onInput={syncInputValue}
        onPressEnter={inputEnter}
        disabled={isDisabled}
        placeholder={inputProps?.placeholder || 'Задайте вопрос'}
        {...inputProps}
      />
      <SendButton
        onClick={handleAsk}
        disabled={isDisabled || !inputValue.trim()}
        type="button"
        aria-label="Send question"
      >
        <SendOutlined />
      </SendButton>
    </InputContainer>
  );
}