import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from 'bcrypt';
import { z } from "zod";

// define um schema para validação do input
const userSchema = z
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
  })


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);
    
    // checar se email existe
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email }
    });
    if(existingUserByEmail) {
      return NextResponse.json({ user: null, message: "Este email já está sendo utilizado"}, { status: 409 })
    }

    // checar se usuario existe
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username }
    });
    if(existingUserByUsername) {
      return NextResponse.json({ user: null, message: "Este nome de usuário já existe"}, { status: 409 })
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({ user: rest, message: "User created sucessfully"}, { status: 201 });
  } catch(error) {
    return NextResponse.json({ message: "Something went wrong!"}, { status: 500 });
    
  }
}