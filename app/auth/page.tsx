'use client';

import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Input from '@/components/input';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

type changeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type formSubmit = FormEvent<HTMLFormElement>;

function Auth () {
  const router = useRouter();

  const [userData, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email: userData.email,
        password: userData.password,
        redirect: false,
        callbackUrl: '/',
      });

      router.push('/');
    } catch (error) {
      console.error(error);
    }
  }, [userData.email, userData.password, router]);

  const register = useCallback((async () => {
    try {
      await axios.post('/api/auth/register', userData);

      login();
    } catch (error) {
      console.error(error);
    }
  }), [userData, login]);

  const handleChange = (evt: changeEvent) => {
    const {name, value} = evt.target;
    console.log();
    setData({...userData, [name]: value}); 
  }

  const handleFromSubmit = (evt: formSubmit) => {
    evt.preventDefault();
    variant === 'login' ? login() : register();
  }

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="w-full h-full bg-black lg:bg-opacity-50">
        <header className="px-12 py-5">
          <Image className="h-12" src="/images/logo.png" width={178} height={48} alt="Logo" priority />
        </header>
        <div className="flex justify-center">
          <section className="self-center w-full mt-2 p-16 bg-black bg-opacity-70 lg:w-2/5 lg:max-w-md">
            <h2 className="mb-8 text-white text-4xl font-semibold">
              {variant === 'login' ? 'Sign In' : 'Register'}
            </h2>
            <form 
              className="flex flex-col gap-4"
              onSubmit={handleFromSubmit}
            >
              {variant === 'register' && 
                <Input
                  id="name"
                  onChange={handleChange}
                  value={userData.name}
                  label="Username"
                  autoComplete="username"
                />
              }
              <Input
                id="email"
                onChange={handleChange}
                value={userData.email}
                label="Email"
                type="email"
                autoComplete="email"
              />
              <Input
                id="password"
                onChange={handleChange}
                value={userData.password}
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <button 
                className="w-full mt-6 py-3 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
              >
                {variant === 'login' ? 'Login' : 'Sign up'}
              </button>
            </form>
            <div className='flex flex-row items-center justify-center gap-4 mt-8'>
              <a 
                className='
                  flex items-center justify-center 
                  w-10 h-10 
                  bg-white rounded-full 
                  transition hover:opacity-80
                ' 
                href="#"
              >
                <FcGoogle size={30} />
              </a>
              <a 
                className='
                  flex items-center justify-center 
                  w-10 h-10 
                  bg-white rounded-full 
                  transition hover:opacity-80
                ' 
                href="#"
              >
                <FaGithub className='fill-black' size={30} />
              </a>
            </div>
            <p className="mt-12 text-sm text-neutral-500">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <a className="ml-1 text-white cursor-pointer hover:underline" onClick={toggleVariant} href="#">
                {variant === 'login' ? 'Create and account' : 'Login'}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Auth;