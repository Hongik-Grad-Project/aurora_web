'use client'

interface InputProps {
    label: string;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean; // Add this line
}

export default function Input({ label, placeholder, value, onChange, readOnly = false }: InputProps) { // Set default value for readOnly
    return (
        <div className="flex flex-col items-start gap-[1.3125rem]">
            <div className="flex flex-col items-start gap-2">
                <span className="text-[#1E2A3B] text-[0.875rem] font-semibold leading-[1.375rem]">
                    {label}
                </span>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly} // Apply the readOnly attribute here
                    className={`w-[25.375rem] h-[2.75rem] px-[0.875rem] rounded-[0.4375rem] border ${readOnly ? 'border-gray-300' : 'border-[#E2E8F0]'} bg-white`}
                    placeholder={placeholder}
                    style={{ opacity: readOnly ? 0.5 : 1 }} // Change opacity based on readOnly status
                />
            </div>
        </div>
    );
}
