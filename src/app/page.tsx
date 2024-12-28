import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-8 from-blue-500 to-purple-600 text-white'>
      <div className='text-center text-black text-6xl'>
        <Link href='/todos'>
            Go to Todo List
        </Link>
      </div>
    </main>
  )
}