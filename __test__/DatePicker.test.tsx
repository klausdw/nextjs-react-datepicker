/* eslint-disable indent */
import React from 'react'
import DatePicker from '../components/DatePicker'
import { fireEvent, render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'

describe('DatePicker', () => {
    describe('initialize the page and look some values', () => {
        beforeEach(async () => {
            render(<DatePicker />)
        })
        it('find Text', () => {
            expect(screen.getByText('Neuen Termin buchen')).toBeInTheDocument()
            expect(screen.getByText('Datum / Uhrzeit')).toBeInTheDocument()
        })
        it('default Appointment Date', () => {
            expect(screen.queryByPlaceholderText('2021-11-13T10:00:44.747Z'))
        })
        it('button form submit', () => {
            expect(screen.getByRole('button', {
                name: /buchen/i
              })).toBeInTheDocument()
        })
    })
})
        // beforeEach(() => {
        //     render(<DatePicker />)
        // })
        // it('renders Text', () => {
        //     expect(screen.getByText('Neuen Termin buchen')).toBeInTheDocument()
        //     expect(screen.getByText('Datum / Uhrzeit')).toBeInTheDocument()
        // })
        // describe('when book ist cliked', () => {
        //     beforeEach(() => {
        //         fireEvent.click(screen.getByRole('button', { name: 'buchen' }))
        //     })
        //     it('renders Appointment, click on Date()', () => {
        //         expect(screen.getByText('2021-11-13T10:00:44.747Z')).toBeInTheDocument()
        //     })
        // })
        // describe('select Date', () => {
        //     beforeEach(() => {
        //         user.type(screen.getByText(/Mo/), '{click}Montag')
        //         // user.click(screen.getByRole('button', { name: 'datum' }))
        //     })
        //     it('should booking', () => {
        //         expect(screen.getByText('Montag')).toBeChecked()
        //     })
        // })
// it('default Appointment, click on Date()', () => {
//   render(<DatePicker />)
//   expect(screen.getByText('Neuen Termin buchen')).toBeInTheDocument()
//   expect(screen.getByText('Datum / Uhrzeit')).toBeInTheDocument()
// })

// it('default Appointment, click on Date()', () => {
//   render(<DatePicker />)
//   fireEvent.click(screen.getByRole('button', { name: 'Sonntag' }))
//   expect(screen.getByText('So')).toBeInTheDocument()
// })
