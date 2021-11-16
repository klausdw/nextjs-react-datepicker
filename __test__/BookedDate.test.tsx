/* eslint-disable indent */
/**
 * https://mswjs.io/
 */

import { setupServer } from 'msw/node'
import { DefaultRequestBody, rest } from 'msw'

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { Appointment } from '../models/Appointment'
import BookedDate from '../components/BookedDate'

const server = setupServer(rest.get<DefaultRequestBody, Appointment[]>('http://localhost:8000/appointments', (req, res, ctx) => {
    return res(
    // ctx.delay(1000),
    ctx.json([
        // Data
    // {
    //     id: 1,
    //     startDate: '10.11.2021, 11:00:39',
    //     name: 'Klaus Dantas Wagner',
    //     email: 'klausdw@outlook.com',
    //     options: 'Erstgespräch Kinderwunsch (in der Praxis)',
    //     doctor: 'Dr. Jochen Wagner'
    //   }
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
        expect(screen.getByText('Dra. Janine Stein')).toBeInTheDocument()
    })
})
