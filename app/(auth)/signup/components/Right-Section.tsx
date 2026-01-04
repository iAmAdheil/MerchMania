'use client'

import { useState } from 'react';

import { Display } from './Main';

import Options from './Options';
import CustomerSignup from './Customer-Form';
import CreatorSignup from './Creator-Form';

export default function RightSection() {
  const [display, setDisplay] = useState<Display>('options');

  return (
    <div className="min-h-screen w-full h-full flex-1 flex justify-center items-center">
      {display === 'options' && <Options setDisplay={setDisplay} />}
      {display === 'customer' && <CustomerSignup setDisplay={setDisplay} />}
      {display === 'creator' && <CreatorSignup setDisplay={setDisplay} />}
    </div>
  );
}