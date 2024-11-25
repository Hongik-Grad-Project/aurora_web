'use client'

import styled from 'styled-components'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const StyledDatePickerWrapper = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 20.375rem; // 326px, 종료 날짜 컴포넌트와 동일한 너비
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  input {
    width: 100%;
    height: 2.75rem;
    padding: 0.5rem 0.875rem;
    border-radius: 0.4375rem;
    border: 1px solid #E2E6EF;
    background: white;
    color: #6A6F7A;
    font-size: 0.875rem;
    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }
`;

interface DatePickerProps {
  date: Date | null;
  onDateChange: (date: Date | null) => void;
  placeholder?: string;
}

export function DatePicker({ date, onDateChange, placeholder }: DatePickerProps) {
  return (
    <StyledDatePickerWrapper>
      <ReactDatePicker
        selected={date}
        onChange={onDateChange}
        dateFormat="yyyy.MM.dd"
        placeholderText={placeholder}
      />
    </StyledDatePickerWrapper>
  );
}
