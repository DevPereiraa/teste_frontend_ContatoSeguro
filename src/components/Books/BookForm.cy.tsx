import React from 'react'
import { BookForm } from './BookForm'

describe('<BookForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BookForm />)
  })
})