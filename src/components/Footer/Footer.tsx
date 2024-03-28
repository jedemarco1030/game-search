'use client'

const Footer = () => {
  return (
    <footer className="mt-8 bg-blue-500 p-4 text-center text-white">
      <div className="container mx-auto">
        <p>
          &copy; {new Date().getFullYear()} Game Search. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
