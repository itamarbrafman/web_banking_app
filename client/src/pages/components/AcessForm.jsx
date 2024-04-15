import React, { useState } from 'react';
import SignUpTab from './SignUpTab';
import SignInTab from './SignInTab';

function AcessForm() {
  const [activeTab, setActiveTab] = useState('signup');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
    <div id="AcessForm" />
      <div id="AcessFormText">Let's Get Started</div>
      <div style={{ position: 'absolute', top: '20rem', left: '83rem',  display: 'flex'}}>
        <div >
          <button className={`signUpText signUpBox ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => handleTabChange('signup')}>Sign Up</button>
        </div> 
        <div > 
          <button className={`signUpText signUpBox ${activeTab === 'signin' ? 'active' : ''}`} onClick={() => handleTabChange('signin')}>Sign In</button>
          {activeTab === 'signup' && <SignUpTab />}
          {activeTab === 'signin' && <SignInTab />}
        </div> 
      </div>
    </>
  );
}

export default AcessForm;
