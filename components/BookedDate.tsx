import Link from 'next/link'

import { CalendarIcon, ClockIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { Appointment } from '../models/Appointment'

const BookedDate = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load () {
      setLoading(l => l + 1)
      try {
        const res = await fetch('https://appointmentskdw.herokuapp.com/appointments')
        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.message)
        }
        setAppointments(json)
        setError('')
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(l => l - 1)
      }
    }
    void load()
  }, [])
  // console.log(appointments)

  return (
    <div>
      <div>
        {error ? <div>{error}</div> : null }
        {loading ? <div>Loading...</div> : null}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {appointments.map((appointment) => (
          <BookDetail appointment={appointment} key={appointment.id} />
        ))}
      </div>
    </div>
  )
}
export default BookedDate

export function BookDetail ({ appointment }: { appointment: Appointment }) {
  return (
    <Link
      href={'/appointments/[id]'}
      as={`appointments/${appointment.id}`}
    >
      <div className='grid grid-cols-1 items-center text-center w-full max-w-sm mx-auto border border-blue-600 p-4 px-auto rounded-xl mt-10 mb-10'>
        <p className=''>Sehr geehrte(r) Frau / Herrn</p>
        <p className='font-bold'> {appointment.name}, </p>
        <p className=''> Ihren Termin wurde erfolgreich gebucht. </p>
        <div className='inline-flex grid grid-cols-4 mt-6 ml-6'>
          <CalendarIcon className='w-10 h-10 p-1 -mt-2 text-center text-blue-600 mx-auto' />
          <p className='col-span-3 text-left mb-4'>
                    Datum: {appointment.startDate.split(',', 1)}
          </p>
          <ClockIcon className='w-10 h-10 p-1 -mt-2 text-blue-600 mx-auto' />
          <p className='col-span-3 text-left mb-4'>
                    Uhrzeit: {appointment.startDate.split(',')[1].slice(0, 6)}
          </p>
          <ClockIcon className='w-10 h-10 p-1 -mt-2 text-blue-600 mx-auto' />
          <p className='col-span-3 text-left mb-4'>
            {appointment.doctor}
          </p>
          <ClockIcon className='w-10 h-10 p-1 -mt-2 text-blue-600 mx-auto' />
          <p className='col-span-3 text-left mb-4'>
            {appointment.options}
          </p>
        </div>
        <a href={`/appointments/${appointment.id}`}>
          <button
            type='button'
            className='mt-2 mb-4 flex justify-center items-center bg-red-800 py-1 px-2 mx-auto rounded text-white'
          >
            <svg
              className='w-8 h-8'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
          Termin löschen
          </button>
        </a>
      </div>
    </Link>
  )
}
