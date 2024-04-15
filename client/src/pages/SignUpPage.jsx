import AcessForm from './components/AcessForm';
import SymbolIcon from './components/SymbolIcon'; 
import background from '../signUpStyles.module.css';
import { useEffect } from 'react';

function SignUpPage() {
  useEffect(() => {
    
    document.body.classList.add(background.signUpBody);

    return () => {
      document.body.classList.remove(background.signUpBody);
    };
  }, []);

  return (
    <>
      <SymbolIcon position = {{ position: 'relative', left: '8.12rem', top: '5.62rem' }}/> 
      <div className="mybank-text">myBank</div>
      <div className="text-gradient">Experience the Future of Banking</div>
      <AcessForm />
    </>
  );
}

export default SignUpPage;
