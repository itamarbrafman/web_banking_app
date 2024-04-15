import { useNavigate } from 'react-router-dom';

function SignUpTab() {
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const submittedData = Object.fromEntries(formData.entries());
        const phoneNumber = submittedData.phoneNumber.trim(); 
        const phoneRegex = /^\+972\d{9}$/;

        if (!phoneRegex.test(phoneNumber)) {
            alert('Please enter a valid phone number starting with +972.');
            return;
        }
        
        fetch('http://localhost:3000/api/handle-verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submittedData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                navigate('/verification', { state: { data: submittedData } });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="DetailsBox">
            <div style={{position:'relative', top: '2rem', left: '-10rem'}}>
                <div >
                    <label className="label-text">Email:</label>
                    <input className="input-component" name="email" type="email" required />   
                </div>
                <div>
                    <label className="label-text">Password:</label>
                    <input className="input-component" name="password" type="password" required />
                </div>
                <div>
                    <label className="label-text">Phone Number:</label>
                    <input className="input-component" name="phoneNumber" type="tel" required placeholder="+972 Enter Your Phone Number" />
                <button className="blue-rec blue-rec-text" type="submit">Sign Up</button>
                </div>
            </div>
        </form>
    );
};

export default SignUpTab;
