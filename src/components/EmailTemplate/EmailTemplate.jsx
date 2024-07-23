import React from 'react';

const EmailTemplate = ({ email, subject, desc }) => (
  <div>
    <h1>{subject}</h1>
    <p>Email: {email}</p>
    <p>Description: {desc}</p>
  </div>
);

export default EmailTemplate;
