// components/LoginModal.tsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface MarketingConsentModalProps {
  onClose: () => void;
  onSubmit: (consent: boolean) => Promise<void>;
  accessToken: string;
}

export default function MarketingConsentModal({ onClose, onSubmit, accessToken }: MarketingConsentModalProps) {
  const handleConsent = async (marketingAgreement: boolean) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/login/terms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({ marketingAgreement }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit marketing consent');
      }

      await onSubmit(marketingAgreement);
      onClose();
    } catch (error) {
      console.error('Marketing consent error:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000] bg-opacity-40">
      <motion.div
        initial={{ y: '5vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100vh', opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[90%] max-w-[24rem] h-auto min-h-[20rem] flex-shrink-0 rounded-[1rem] bg-[#FFF] pb-[2rem] pt-[1.5rem]"
      >
        <div className="flex flex-col items-center">
          <Image src="/assets/colorLogo.svg" width={130} height={43} alt="logo" />
          <div className="flex flex-col flex-start w-[90%] max-w-[20rem] mt-[1.2rem]">
            <h2 className="text-center text-xl font-bold mb-4">마케팅 활용 동의 및 광고 수신 동의</h2>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="marketing-consent" className="h-4 w-4" />
              <label htmlFor="marketing-consent" className="text-sm">E-mail 수신 동의 (선택)</label>
            </div>
            <p className="text-xs text-gray-500 mb-4">*동의 하시면 다양한 이벤트에 참여하실 수 있습니다.</p>
            <button
              onClick={() => handleConsent(true)}
              className="w-full py-3 bg-[#776BFF] text-white rounded-lg"
            >
              시작하기
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
