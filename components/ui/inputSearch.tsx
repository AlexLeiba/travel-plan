'use client';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    title: string;
    error?: string;
  };
export function InputSearch({ title, error, ...restProp }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [value, setValue] = useState('');

  useEffect(() => {
    const idTimeout = setTimeout(() => {
      if (value.length > 0) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('search', value);
        router.replace(`?${params.toString()}`);
      }
    }, 1000);

    return () => clearTimeout(idTimeout);
  }, [value]);

  function cleanSearch() {
    setValue('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    router.replace(`?${params.toString()}`);
  }

  return (
    <div className='relative'>
      {value.length > 0 ? (
        <X
          className='absolute text-gray-500 right-2 top-2 cursor-pointer'
          onClick={cleanSearch}
        />
      ) : (
        <Search className='absolute text-gray-500 right-2 top-2 ' />
      )}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='py-2 pl-3 pr-8 focus:outline-none rounded-md bg-gray-100 text-black  w-full hover:bg-gray-300 transition-all'
        name={title}
        type={'text'}
        {...restProp}
      />

      {error && <p className='text-red-500 body-sm'>{error}</p>}
    </div>
  );
}
