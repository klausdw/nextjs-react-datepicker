import BookedDate from '../../components/BookedDate'
import { Appointment } from '../models/Appointment'

const AppointmentHome = ({ appointment }: { appointment: Appointment }) => {
  return (
    <div className='px-10'>
      <h1 className='mt-6 mb-4 text-center text-4xl font-bold'>
        Meine Termine
      </h1>
      <BookedDate />
      <div className='flex flex-inline grid grid-cols-1 justify-center w-full flex-1 px-2  items-center md:grid-cols-2 gap-2'>
        {/* <DeleteButton /> */}
        {/* <DeleteButton appointment={appointment} /> */}
      </div>
    </div>
  )
}

export default AppointmentHome
