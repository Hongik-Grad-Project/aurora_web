'use client';

import { forwardRef } from "react";
import Image from "next/image";

interface DropdownProps {
    name: string;
    options: { value: string; label: string }[]; // 옵션 배열 추가
    value: string; // 부모 컴포넌트에서 받아온 선택된 값
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // 부모 컴포넌트에서 받아온 onChange 함수
    placeholder?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    width?: string;
    [x: string]: any;
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
    (
        { name, options, value, onChange, placeholder, required, className, disabled, width, ...rest },
        ref
    ) => {
        return (
            <div className="relative flex w-[20.375rem] flex-col items-start gap-[1.3125rem]">
                <select
                    id={name}
                    name={name}
                    ref={ref}
                    disabled={disabled}
                    required={required}
                    style={{ width: width }}
                    className={`mt-2 rounded-[0.31rem] border border-grey40 px-[0.88rem] py-3 pr-10 text-sm outline-none appearance-none hover:ring hover:ring-grey30 ${className}`}
                    value={value} // 부모로부터 받은 value 사용
                    onChange={onChange} // 부모로부터 받은 onChange 사용
                    {...rest}
                >
                    {placeholder && (
                        <option
                            value=""
                            disabled
                            className="text-[#6A6F7A] font-medium text-[1rem] leading-[1.5rem] font-pretendard"
                        >
                            {placeholder}
                        </option>
                    )}
                    {options.map((option: { value: string; label: string }, index: number) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 transform translate-y-[10%] pointer-events-none">
                    <Image
                        src="/assets/icons/select_button.svg"
                        alt="Select button"
                        width={10}
                        height={8}
                    />
                </div>
            </div>
        );
    }
);

Dropdown.displayName = "DropdownComponent";

export default Dropdown;
