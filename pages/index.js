
import dynamic from 'next/dynamic';


const HomePage = dynamic(() => import('./homePage.js'), { ssr: false });


export default function Home() {
  return (
    <div>
      <HomePage></HomePage>
    </div>
  )
}
