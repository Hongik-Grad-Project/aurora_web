'use client'

import { forwardRef, useState } from "react";
import Image from "next/image";

interface DropdownProps {
    name: string;
    options: { value: string; label: string }[]; // 옵션 배열 추가
    placeholder?: string; // placeholder 추가
    required?: boolean;
    className?: string;
    disabled?: boolean;
    width?: string; // width 속성 추가
    [x: string]: any;
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
    (
        { name, options, placeholder, required, className, disabled, width, ...rest },
        ref
    ) => {
        const [selectedValue, setSelectedValue] = useState("");

        return (
            <div className="relative flex w-[20.375rem] flex-col items-start gap-[1.3125rem]">
                <select
                    id={name}
                    name={name}
                    ref={ref}
                    disabled={disabled}
                    required={required}
                    style={{ width: width }} // width 스타일 추가
                    className={`mt-2 rounded-[0.31rem] border border-grey40 px-[0.88rem] py-3 pr-10 text-sm outline-none appearance-none hover:ring hover:ring-grey30 ${className}`}
                    value={selectedValue} // value를 상태로 관리
                    onChange={(e) => setSelectedValue(e.target.value)} // 값이 변경되면 상태를 업데이트
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
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {/* SVG 아이콘을 추가하여 드롭다운 버튼으로 사용 */}
                <div className="absolute right-3 top-1/2 transform translate-y-[10%] pointer-events-none">
                    <Image
                        src="/assets/icons/select_button.svg"
                        alt="Select button"
                        width={10} // 원하는 크기로 설정
                        height={8} // 원하는 크기로 설정
                    />
                </div>

            </div>
        );
    }
);

Dropdown.displayName = "DropdownComponent";

export default Dropdown;
