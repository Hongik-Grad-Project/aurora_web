import React, { forwardRef } from 'react';
import ReactDatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

// 한국어 로케일 등록
registerLocale('ko', ko);

const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
  <div className="relative flex items-center w-full">
    <input
      type="text"
      value={value}
      onClick={onClick}
      ref={ref}
      readOnly
      className="w-[20.375rem] px-[0.875rem] py-[0.625rem] rounded-[0.4375rem] border border-[#E2E6EF] bg-white cursor-pointer"
      placeholder="날짜를 선택하세요"
    />
    <div className="absolute right-[0.875rem] top-1/2 transform -translate-y-1/2 pointer-events-none">
      <Image
        src="/assets/icons/calendar.svg"
        alt="달력 아이콘"
        width={20}
        height={20}
      />
    </div>
  </div>
));

CustomInput.displayName = 'CustomInput';

function DatePicker({ ...props }: DatePickerProps) {
  return (
    <ReactDatePicker
      locale="ko"
      dateFormat="yyyy년 MM월 dd일"
      customInput={<CustomInput />}
      {...props}
    />
  );
}

export default DatePicker;
