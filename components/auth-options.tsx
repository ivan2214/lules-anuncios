import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const AuthButtons = () => {
  return (
    <section className="flex items-center gap-2">
      <Button>
        <Link href="/auth/login">Iniciar Sesion</Link>
      </Button>
      <Button variant="outline">
        <Link href="/auth/register">Registrarse</Link>
      </Button>
    </section>
  )
}

export default AuthButtons
