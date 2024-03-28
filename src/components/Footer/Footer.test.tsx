import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import React from 'react'

import Footer from './Footer'

describe('Footer Component', () => {
  it('renders correctly', () => {
    render(<Footer />)
    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} Game Search. All rights reserved.`
      )
    ).toBeInTheDocument()
  })
})
