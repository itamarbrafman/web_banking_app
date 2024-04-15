import MySVG from '../../assets/logoutIcon.svg';
function SymbolIcon({ position }) {
  return (
    <div style={{ position: 'relative', ...position }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 73"
        fill="none"
        className="svg-icon"
        style={{ position: 'absolute', width: '2.93919rem', height: '4.54744rem', fill: '#0360F0' }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.8744 25.09L0 17.5999V64.0582L17.2787 72.7595V56.4683L32.1531 63.9584V47.6671L47.0275 55.1573V8.70135L29.7488 0V16.2912L14.8744 8.80112V25.09Z"
          fill="#0360F0"
        />
      </svg>
    </div>
  );
}

const styles = {
  icon: {
    width: '1.38869rem',
    height: '1.31688rem',
    flexShrink: 0,
    position:'relative',
    top: '2.5rem',
    left: '4rem',
    zIndex: '2',
    
  },
  path: {
    fillRule: 'evenodd',
    clipRule: 'evenodd',
    stroke: 'white',
    strokeWidth: '1.648px',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    
  },
};

export function OverviewIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" fill="none" style={styles.icon}>
      <path d="M15.4315 1.46631H23.3104V8.96757H15.4315V1.46631ZM1.0918 15.0353H8.97197V22.5365H1.0918V15.0353ZM1.0918 1.46631H8.97197V8.96757H1.0918V1.46631ZM15.4315 15.0353H23.3104V22.5365H15.4315V15.0353Z" style={styles.path}/>
    </svg>
  );
}


export function MySVGComponent() {
  return (
    <div style={{
      display: 'flex',
      width: '50rem',
      height: '50rem',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative', 
      top: '-39.4rem', 
      left: '78.5rem'
    }}>
      <img src={MySVG} alt="My SVG" />
    </div>
  );
}

export function BankColorRec() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23.8125rem" 
      height="100rem"     
      viewBox="0 0 381 944"
      fill="none"
      style={{ fill: 'linear-gradient(185deg, #EBF3FF 28.88%, #5095FF 103.09%)',
      position: 'relative', top: '-118rem', left: '-2rem'}} >
      <path d="M381 0H0V944H381V0Z" fill="url(#paint0_linear_1_715)"/>
      <defs>
        <linearGradient id="paint0_linear_1_715" x1="122" y1="242.5" x2="-25" y2="970.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EBF3FF"/>
          <stop offset="1" stopColor="#5095FF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default SymbolIcon;
