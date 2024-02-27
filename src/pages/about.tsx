import React from 'react';
import Layout from '@/components/Layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">About This Site</h1>
        <p className="mb-4">
          This site was created by <strong>James DeMarco</strong>.
        </p>
        <p className="mb-4">
          For more information, you can contact me at:
          <a href="mailto:jedemarco1030@yahoo.com" className="text-blue-600 hover:underline"> jedemarco1030@yahoo.com</a>.
        </p>
        <p>
          Visit my site at:
          <a href="https://jedemarco1030.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> https://jedemarco1030.github.io/</a>.
        </p>
      </div>
    </Layout>
  );
};

export default About;
