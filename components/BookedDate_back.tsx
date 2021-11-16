import useFetch from '../data/useFetch'

import { CalendarIcon, ClockIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { Appointment } from '../models/Appointment'

// const BookedDate = ({ appointment, startDate, name, email }: any) => {
const BookedDate = () => {
  const [data, setData] = useState<Appointment[]>(null)
  const [loading, setLoading] = useState(0)
  const [error, setError] = useState('')

  // const {
  //   error,
  //   isPending,
  //   data: appointments
  // } = useFetch('http://localhost:8000/appointments')

  useEffect(() => {
    async function load () {
      setLoading(l => l + 1)

      try {
        const res = await fetch('http://localhost:8000/appointments')
        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.message)
        }
        setData(json)
        setError('')
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(l => l - 1)
      }
    }
    // void load()
  }, [])
  // console.log(appointments)

  return (
    <>
      {error ? <div>{error}</div> : null }
      {loading ? <div>Loading...</div> : null}
      {data.map(
        (appointment: {
            id: number | null | undefined;
            name: string;
            startDate: string;
          }) => {
          return (
            <div
              key={appointment.id}
              className='grid place-items-center w-full max-w-sm mx-auto border border-blue-600 p-4 px-auto rounded-xl mt-10'
            >
              <p className='mb-2 mt-2 items-center justify-center text-center'>
                  Sehr geehrte(r) Frau / Herrn
                <p className='my-4'>{appointment.name}</p>
                  Ihren Termin wurde erfolgreich gebucht.
              </p>
              <div className='inline-flex justify-center mt-6'>
                <CalendarIcon className='w-10 h-10 p-1 -mt-2 text-blue-600' />
                <p className=''>
                    Datum: {appointment.startDate.split(',', 1)}
                </p>
              </div>
              <div className='inline-flex justify-center mt-6 mb-2 -ml-5'>
                <ClockIcon className='w-10 h-10 p-1 -mt-2 text-blue-600' />
                <p className=''>
                    Uhrzeit: {appointment.startDate.split(',')[1].slice(0, 6)}
                </p>
              </div>
            </div>
          )
        }
      )}
    </>
  )
}
export default BookedDate
