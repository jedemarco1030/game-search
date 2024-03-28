import { render, screen } from '@testing-library/react'
import React from 'react'

import About from './About'

describe('About Component', () => {
  it('should display the heading', () => {
    render(<About />)
    expect(screen.getByText('About This Site')).toBeInTheDocument()
  })

  it('should display the creator name', () => {
    render(<About />)
    expect(screen.getByText('James DeMarco')).toBeInTheDocument()
  })

  it('should have a mailto link with the correct email', () => {
    render(<About />)
    const mailtoLink = screen.getByText('jedemarco1030@yahoo.com')
    expect(mailtoLink).toHaveAttribute('href', 'mailto:jedemarco1030@yahoo.com')
  })

  it('should have a link to the creator’s personal site', () => {
    render(<About />)
    const personalSiteLink = screen.getByText(
      'https://jedemarco1030.vercel.app'
    )
    expect(personalSiteLink).toHaveAttribute(
      'href',
      'https://jedemarco1030.vercel.app'
    )
  })
})
