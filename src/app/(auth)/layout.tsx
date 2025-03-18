'use client'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const isSignIn = pathname === '/sign-in'
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
          <Button
            variant={'secondary'}
            onClick={() =>
              isSignIn ? router.push('/sign-up') : router.push('/sign-in')
            }
          >
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  )
}

export default AuthLayout
