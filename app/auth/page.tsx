'use client';

import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Input from "@/components/input";

type changeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type formSubmit = FormEvent<HTMLFormElement>;

function Auth () {
  const [userData, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const register = useCallback((async () => {
    try {
      await axios.post('/api/auth/register', {...userData});
    } catch (error) {
      console.error(error);
    }
  }), [userData]);

  const handleChange = (evt: changeEvent) => {
    const {name, value} = evt.target;
    console.log();
    setData({...userData, [name]: value}); 
  }

  const handleFromSubmit = (evt: formSubmit) => {
    evt.preventDefault();
    register();
  }

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="w-full h-full bg-black lg:bg-opacity-50">
        <header className="px-12 py-5">
          <img className="h-12" src="/images/logo.png" width="178" height="48" alt="Logo" />
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