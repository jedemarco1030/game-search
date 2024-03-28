'use client'

import React from 'react'

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">About This Site</h1>
      <p className="mb-4">
        This site was created by <strong>James DeMarco</strong>.
      </p>
      <p className="mb-4">
        For more information, you can contact me at:
        <a
          href="mailto:jedemarco1030@yahoo.com"
          className="text-blue-600 hover:underline"
        >
          {' '}
          jedemarco1030@yahoo.com
        </a>
        .
      </p>
      <p>
        Visit my site at:
        <a
          href="https://jedemarco1030.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {' '}
          https://jedemarco1030.vercel.app
        </a>
        .
      </p>
    </div>
  )
}

export default About
