import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { CalendarIcon, ClockIcon } from '@heroicons/react/outline'

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const appointmentId: number = params.id
  const res = await fetch(
    `http://localhost:8000/appointments/${appointmentId}`
  )
  const appointment: any = await res.json()
  console.log(appointment)

  return {
    props: { appointment }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '' } }],
    fallback: true
  }
}

const EditAppointment = ({ appointment }: any) => {
  console.log(appointment)

  const router = useRouter()

  const deleteAppointment = () => {
    Swal.fire({
      title: `${appointment.name}, Wollen Sie den Termin wirklich stornieren ?`,
      text: 'Sie können diese Aktion nicht rückgängig machen !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Abbrechen',
      confirmButtonText: 'Ja, Termin stornieren!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          fetch(`http://localhost:8000/appointments/${appointment.id}`, {
            method: 'DELETE'
          }).then(async () => {
            router.push('/')
            console.log('DELETED !')
          })
          Swal.fire('Storniert!', 'Dieser Termin wurde storniert.', 'success')
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  return (
    <>
      <h1 className='mt-6 mb-4 text-center text-4xl font-bold'>
        Termin bearbeiten
      </h1>
      <div className='items-center w-full max-w-sm mx-auto border border-blue-600 p-4 px-auto rounded-xl mt-10'>
        <p className='text-center'>Sehr geehrte(r) Frau / Herrn</p>
        <p className='font-bold text-center'> {appointment.name}, </p>
        <p className='text-center'>
          Sie haben am
          <span className='font-bold'>
            {appointment.bookedDate.split('T', 1)}
          </span>
          Ihren Termin gebucht.
        </p>
        <div className='inline-flex grid grid-cols-3 gap-0 mt-6 ml-6'>
          <CalendarIcon className='w-10 h-10 p-1 -mt-2 text-blue-600' />
          <p className='col-span-2 text-left -ml-14 mb-4'>
            Datum: {appointment.startDate.split(',', 1)}
          </p>
          <ClockIcon className='w-10 h-10 p-1 -mt-2 text-blue-600' />
          <p className='col-span-2 text-left -ml-14 mb-4'>
            Uhrzeit: {appointment.startDate.split(',')[1].slice(0, 6)}
          </p>
          <ClockIcon className='w-10 h-10 p-1 -mt-2 text-blue-600' />
          <p className='col-span-2 text-left -ml-14 mb-4'>
            {appointment.doctor}
          </p>
          <ClockIcon className='w-10 h-10 p-1 -mt-2 text-blue-600' />
          <p className='col-span-2 text-left -ml-14 mb-4'>
            {appointment.options}
          </p>
        </div>
        <button
          type='button'
          className='mb-2 mt-4 flex justify-center items-center bg-red-800 py-1 px-2 mx-auto rounded text-white'
          onClick={() => deleteAppointment()}
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
      </div>
    </>
  )
}

export default EditAppointment
