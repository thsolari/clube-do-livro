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
import { useRouter } from 'next/navigation'

const FormSchema = z
  .object({
    username:z.string({
      message: "Campo obrigatório"
    }).min(1, "Campo obrigatório").max(29),
    email: z.string({
      message: "Campo obrigatório."
    }).min(1, 'Campo obrigatório.').email('Email inválido.'),
    password: z.string({
      message: "Campo obrigatório."
    }).min(1, 'Campo obrigatório.').min(8, 'A senha deve conter no mínimo 8 caracteres'),
    confirmPassword: z.string({
      message: ""
    }).min(1, "Confirmação é necessária.")
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'A senha deve ser idêntica'
  });

const SignUpForm = () => {
  const router = useRouter
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

const onSubmit = async (values: z.infer<typeof FormSchema>) => {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: values.username,
      email: values.email,
      password: values.password
    })
  })
  
  if(response.ok) {
    router.push('/sign-in')
  } else {
    console.error('Registration Failed')
  }

};

  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className='space-y-2'>
      <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input placeholder="Como quer ser chamado?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme sua senha</FormLabel>
              <FormControl>
                <Input placeholder="...sua senha novamente" type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button className='w-full mt-6' type="submit">
        Cadastrar-se
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
      Se já possui uma conta...
      <Link className='text-blue-500 hover:underline' href='/sign-in'>entre!</Link>
    </p>
  </Form>
  )
}

export default SignUpForm