import Link from 'next/link'

import { CalendarIcon, ClockIcon } from '@heroicons/react/outline'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:8000/appointments/')
  const data = await res.json()

  return {
    props: { appointments: data }
  }
}

// const appointments = ({ appointments }: any) => {
const appointments = ({ appointments }: any) => {
  console.log(appointments)

  // const { startDate, name, email, options, doctor } = appointment;
  // const { error, isPending, data: appointments } = useFetch<any> ('http://localhost:8000/appointments/' )

  // console.log(appointments);

  // const deleteAppointment = () => {
  //     try {
  //         fetch('http://localhost:8000/appointments/' + appointments.id, {
  //           method: 'DELETE'
  //     }). then(() => {
  //         setTimeout(() => {
  //             Swal.fire('Termin gebucht !', `Vielen Dank`, 'success')
  //             console.log("DELETED !");
  //             // router.push("/appointments");
  //           }, 0);
  //     })
  //     } catch (error) {
  //         console.log(error);
  //     }
  //   }

  // const editAppointment = () => {
  //     Router.push({
  //         pathname: "/appointments/[id]",
  //         query: { id: appointments.id }
  //     })
  // }

  Swal.fire({
    title: `${appointment.name}, Wollen Sie den Termin wirklich stornieren ?`,
    text: 'Sie können diese Aktion nicht rückgängig machen !',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Abbrechen',
    confirmButtonText: 'Ja, Termin stornieren!',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`http://localhost:8000/appointments/${appointment.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Fehler: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Storniert!', 'Dieser Termin wurde storniert.', 'success')
      console.log('DELETED !')
      router.push('/')
    }
  })

  return (
    <div>
      <h1 className='mt-6 mb-4 text-center text-4xl font-bold'>
        {' '}
        Meine Termine{' '}
      </h1>
      <main className='grid grid-cols-1 justify-center w-full flex-1 px-2 text-center items-center md:grid-cols-2 gap-2 align-top'>
        {/* <BookedDate /> */}
        {appointments.map((appointment: any) => {
          return (
            <Link
              href={`/appointments/${appointment.id}`}
              passHref
              key={appointment.id}
            >
              <div className='grid justify items-center w-full max-w-sm mx-auto border border-blue-600 p-4 px-auto rounded-xl mt-10 mb-10'>
                <p className=''>Sehr geehrte(r) Frau / Herrn</p>
                <p className='font-bold'> {appointment.name}, </p>
                <p className=''> Ihren Termin wurde erfolgreich gebucht. </p>
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
                    </svg>{' '}
                    Termin löschen
                  </button>
                </a>
              </div>
            </Link>
          )
        })}
        {/* <DeleteButton /> */}
        {/* <DeleteButton appointment={appointment} /> */}
      </main>
    </div>
  )
}

export default appointments
