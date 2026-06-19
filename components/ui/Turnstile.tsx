'use client';

import { Turnstile as ReactTurnstile } from '@marsidev/react-turnstile';

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

export default function Turnstile({ siteKey, onVerify, onExpire, onError }: TurnstileProps) {
  return (
    <div className="my-2 min-h-[65px] flex justify-start items-center">
      <ReactTurnstile
        siteKey={siteKey}
        options={{
          theme: 'dark',
        }}
        onSuccess={onVerify}
        onExpire={onExpire}
        onError={onError}
      />
    </div>
  );
}
