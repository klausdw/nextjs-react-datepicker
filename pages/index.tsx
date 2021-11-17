import type { NextPage } from 'next'
import Head from 'next/head'
import DatePicker from '../components/DatePicker'
import BookedDate from '../components/BookedDate'

const Home: NextPage = () => {
  return (
    <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
      <Head>
        <title>Appointment Picker</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <DatePicker />
      </div>
      {/* <BookedDate /> */}
      <footer className='w-full mx-auto text-center items-center mt-10 p-6 rounded-xl sm:p-6 lg:p-6 h-20 bg-gray-200'>
        <a
          href='https://github.com/klausdw'
          target='_blank'
          rel='noopener noreferrer'
        >
          © kdw
        </a>
      </footer>
    </div>
  )
}

export default Home
