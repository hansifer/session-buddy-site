import { useEffect, useState } from 'react';
import { detectOS, type OS } from '@/util/os';

type OSStringProps = {
  windows: string;
  apple: string;
  linux?: string;
};

export const OSString = ({ windows, apple, linux }: OSStringProps) => {
  const [os, setOS] = useState<OS>();

  useEffect(() => {
    setOS(detectOS());
  }, []);

  if (!os) return null;

  if (os === 'linux') {
    return linux ?? windows;
  }

  if (os === 'apple') {
    return apple;
  }

  return windows;
};
