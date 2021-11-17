import { useState } from 'react'
import { useRouter } from 'next/router'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import DatePicker from 'react-datepicker'
import setMinutes from 'date-fns/setMinutes'
import setHours from 'date-fns/setHours'
import { de } from 'date-fns/locale'

import Swal from 'sweetalert2'

/**
 * Date Picker create a appointment in to db -> data/db.json
 *
 * @author klausdw
 * @requires JSON-Server // run on port: 8000
 * @param {Date} data - The selected day at the picker
 *
 */

const BookingPicker = () => {
  /**
   * Get value and setValue at Picker
   */

  const [startDate, setStartDate] = useState<Date>(
    setHours(setMinutes(new Date(), 0), 11)
  )
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [options, setOptions] = useState<string>('')
  const [doctor, setDoctor] = useState<string>('')
  const bookedDate = new Date()
  const router = useRouter()

  // console.log(startDate);
  // console.log(startDate.toISOString())
  // console.log(startDate.toLocaleString());

  const handleSubmit = async (e) => {
    e.preventDefault()
    const appointment = {
      startDate: startDate.toLocaleString(),
      name,
      email,
      options,
      doctor,
      bookedDate
    }
    console.log(appointment)
    fetch('https://appointmentskdw.herokuapp.com/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    }).then(() => {
      Swal.fire('Termin gebucht !', `Vielen Dank, ${name}`, 'success')
      console.log('Appointment booked !')
      router.push('/appointments')
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <div className='w-60 mb-6 -ml-4 mx-auto justify-center items-center text-center divide-y-2 divide-blue-400'>
        <h1> Neuen Termin buchen </h1>
        <hr />
      </div>
      <div className='border border-gray-200 rounded-lg min-h-full flex items-center justify-center sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='mx-auto justify-center rounded'>
          <h1 className='text-gray-600 mb-6 text-center -ml-16 mt-6'>
            Datum / Uhrzeit
          </h1>
          <DatePicker
            aria-label='Date Picker'
            inline
            locale={de}
            selected={startDate}
            onChange={(startDate: Date) => setStartDate(startDate)}
            // dateFormat="DD/MM/YYYY HH:MM"
            dateFormat='MM/dd/yyyy'
            timeCaption='Uhrzeit' // name of Time
            showTimeSelect
            filterDate={(date) => date.getDay() !== 7 && date.getDay() !== 0}
            includeTimes={[
              setHours(setMinutes(new Date(), 0), 11),
              setHours(setMinutes(new Date(), 0), 13)
            ]}
            renderCustomHeader ={({
              monthDate,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled
            }) => (
              <div className='flex items-center justify-between px-2 py-2 rounded-t-lg'>
                <span className='ml-4 text-lg text-gray-700'>
                  {monthDate.toLocaleString('de', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <div className='space-x-2 mr-1'>
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type='button'
                    className={`${prevMonthButtonDisabled &&
                      'cursor-not-allowed opacity-50'}
                        inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                      `}
                  >
                    <ChevronLeftIcon className='w-5 h-5 text-gray-600' />
                  </button>
                  <button
                    aria-label='datum'
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type='button'
                    className={`${nextMonthButtonDisabled &&
                      'cursor-not-allowed opacity-50'}
                        inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                      `}
                  >
                    <ChevronRightIcon className='w-5 h-5 text-gray-600' />
                  </button>
                </div>
              </div>
            )}
          />
          <div className='sm:mb-32 md:md-32'></div>
          {/* <DatePicker
            inline
            showTimeSelect
            selected={startDate}
            onChange={(startDate: Date) => setStartDate(startDate)}
            includeTimes={[
              setHours(setMinutes(new Date(), 0), 10),
              setHours(setMinutes(new Date(), 0), 14),
            ]}
          /> */}
        </div>
        <form
          className='mt-10 mx-auto w-3/4 px-8 pb-8 md:min-w-full'
          onSubmit={handleSubmit}
        >
          <h1 className='text-gray-600'>Terminanlass</h1>
          <p className='mt-6 -mb-6 ml-4'> Terminart </p>
          <div className='relative inline-flex rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600'>
            <svg
              className='w-2 h-2 absolute mt-10 right-2 m-4 pointer-events-none'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 412 232'
            >
              <path
                d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z'
                fill='#648299'
                fillRule='nonzero'
              />
            </svg>
            <select
              className='w-80 mt-6 mb-4 border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
              placeholder='Chose your option'
              name={options}
              onChange={(e) => setOptions(e.target.value)}
            >
              <option> Wählen Sie eine der Optionen </option>
              <option value='Erstgespräch Kinderwunsch (in der Praxis)'>
                Erstgespräch Kinderwunsch (in der Praxis){' '}
              </option>
              <option value='Erstgespräch Kinderwunsch (per Video)'>
                {' '}
                Erstgespräch Kinderwunsch (per Video){' '}
              </option>
            </select>
          </div>
          <p className='mt-6 -mb-6 ml-4'> Arzt / Behandler </p>
          <div className='relative inline-flex rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600'>
            <svg
              className='w-2 h-2 absolute mt-10 right-2 m-4 pointer-events-none'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 412 232'
            >
              <path
                d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z'
                fill='#648299'
                fillRule='nonzero'
              />
            </svg>
            <select
              className='w-80 mt-6 mb-4 border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
              placeholder='Chose your option'
              name={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option> Alle Ärzte / Behandler </option>
              <option value='Dra. Janine Stein'>Dra. Janine Stein</option>
              <option value='Dr. Jochen Wagner'>Dr. Jochen Wagner</option>
            </select>
          </div>
          <div className='mb-4 mt-2'>
            <label> Name </label>
            <input
              className='mt-2 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400'
              required
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label> E-Mail </label>
            <input
              className='mt-2 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400'
              required
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mt-10'>
            <button className='flex mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
              Termin buchen
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default BookingPicker
