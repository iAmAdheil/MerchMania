'use client'

import { useState } from 'react';
import OptionsBox from './Options';
import CustomerSignup from './CustomerSignupForm';
import CreatorSignup from './CreatorSignupForm';
import { Display } from '@/app/signup/page';

export default function FormSection() {
  const [display, setDisplay] = useState<Display>('options');

  return (
    <>
      {display === 'options' && <OptionsBox setDisplay={setDisplay} />}
      {display === 'customer' && <CustomerSignup setDisplay={setDisplay} />}
      {display === 'creator' && <CreatorSignup setDisplay={setDisplay} />}
    </>
  );
}