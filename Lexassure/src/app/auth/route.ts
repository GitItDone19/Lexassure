import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    const hashed = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashed
      }
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: "Registration failed" },
      { status: 400 }
    )
  }
}
