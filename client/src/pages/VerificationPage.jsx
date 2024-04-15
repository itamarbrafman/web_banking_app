import { useNavigate, useLocation } from 'react-router-dom'
import SymbolIcon from './components/SymbolIcon'; 
import { useRef } from 'react';

function VerificationPage() {
  
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  
  const navigate = useNavigate();
  
  const location = useLocation();
  const clientData = location.state ? location.state.data : null;

  const focusNextInput = (index) => {
    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (value.length === 1 && index < inputRefs.length - 1) {
      focusNextInput(index);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const submittedData = Object.fromEntries(data.entries());

    const combinedData = { ...submittedData, ...clientData };

    fetch('http://localhost:3000/api/check-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(combinedData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      if (data.authToken) {
        localStorage.setItem('token', data.authToken);

        navigate('/');

      } else {
        const retrySignUp = window.confirm('Verification failed. Do you want to retry signup?');
        if (retrySignUp) {
          navigate('/signup');
        }
      }  
    })
    .catch(error => {
      console.error('Error:', error);
    });    
  };

  return (
    <>
      <SymbolIcon position = {{ position: 'relative', left: '8.12rem', top: '5.62rem' }}/> 
      <div className="mybank-text">myBank</div>
      <div id="valid-square" style={{ position: 'relative', top: '15rem', left: '40rem'}}>
        <div id="auth-text1">Two-Factor Authentication</div>
        <div className="auth-text2">Enter Two-Factor </div>
        <div className="auth-text2">Authentication Passcode</div>

        <form onSubmit={handleSubmit} style={{ position: 'relative', top: '5rem', left: '4rem'}}>
          <div className="container" >
            {inputRefs.map((inputRef, index) => (
              <input
                key={index}
                ref={inputRef}
                className="valid-code-square"
                name={`code${index + 1}`}
                type="text"
                maxLength="1"
                required
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>
          <button className="blue-rec blue-rec-text" type="submit">Verify</button>
        </form>

      </div>
    </>
  );
}

export default VerificationPage;
