import { useNavigate } from 'react-router-dom'

function SignInTab() {
    const navigate = useNavigate();
    
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const submittedData = Object.fromEntries(formData.entries());
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submittedData)
        })
        .then(response => response.json())
        .then(data => {
            navigate('/');

            if (data.error) {
                alert(data.error);
            } else {
                if (data.authToken) {
                    
                    localStorage.setItem('token', data.authToken);
                    navigate('/');
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    
    return (
        <form onSubmit={handleSubmit} className="DetailsBox">
            <div style={{position:'relative', top: '2rem', left: '-10rem'}}>
                <div>
                    <label className="label-text">Email:</label>
                    <input className="input-component" name="email" type="email" required />   
                </div>
                <div>
                    <label className="label-text">Password:</label>
                    <input className="input-component" name="password" type="password" required />
                </div>
            </div>
            <button style={{position:'relative', top: '2rem', left: '-10rem'}} className="blue-rec blue-rec-text" type="submit">Sign In</button>
        </form>
    );
};

export default SignInTab;
