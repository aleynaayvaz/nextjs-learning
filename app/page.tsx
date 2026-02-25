import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Hello Next.js!</h1>
      <Link href="/about">Go to About page</Link>
    </div>
  )
}