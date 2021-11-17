/* eslint-disable indent */
/**
 * https://mswjs.io/
 */

import { setupServer } from 'msw/node'
import { DefaultRequestBody, rest } from 'msw'

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { Appointment } from '../models/Appointment'
import BookedDate from '../components/BookedDate'

const server = setupServer(rest.get<DefaultRequestBody, Appointment[]>('https://appointmentskdw.herokuapp.com/appointments', (req, res, ctx) => {
    return res(
    // ctx.delay(1000),
    ctx.json([
        {
            startDate: '18.11.2021, 11:00:49',
            name: 'Test',
            email: 'test@test.de',
            options: 'Erstgespräch Kinderwunsch (per Video)',
            doctor: 'Dr. Jochen Wagner',
            bookedDate: '2021-11-17T17:25:26.755Z',
            id: 2
          }
    ]))
}))

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('renders after the application is loaded', () => {
    beforeEach(async () => {
        render(<BookedDate />)
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    })
    it('renders the newly loaded data', () => {
        expect(screen.getByText('Dr. Jochen Wagner')).toBeInTheDocument()
    })
})
