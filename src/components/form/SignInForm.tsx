'use client'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'
import GoogleSignInButton from '../GoogleSignInButton'

const FormSchema = z.object({
  email: z.string({
    message: "Campo obrigatório."
  }).min(1, 'Campo obrigatório.').email('Email inválido.'),
  password: z.string({
    message: "Campo obrigatório."
  }).min(1, 'Campo obrigatório.').min(8, 'A senha deve conter mais de 8 caracteres')
  ,
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

const onSubmit = (values: z.infer<typeof FormSchema>) => {
  console.log(values)
};

  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className='space-y-2'>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Insira seu email" type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="Insira sua senha" type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button className='w-full mt-6' type="submit">
        Entrar
      </Button>
    </form>
    <div className='
      mx-auto
      my-4
      flex
      w-full
      items-center
      justify-evenly
      before:mr-4
      before:block
      before:h-px
      before:flex-grow
      before:bg-stone-400
      after:ml-4
      after:block
      after:h-px
      after:flex-grow
      after:bg-stone-400
    '>
      ou
    </div>
    <GoogleSignInButton>Entrar com Google</GoogleSignInButton>
    <p className='text-center text-sm text-gray-600 mt-2'>
      Se ainda não possui uma conta...
      <Link className='text-blue-500 hover:underline' href='/sign-up'>cadastre-se!</Link>
    </p>
  </Form>
  )
}

export default SignInForm