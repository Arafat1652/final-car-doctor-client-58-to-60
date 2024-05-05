import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';
const Login = () => {

    const {signIn} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const handleLogin = e=>{
       
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(result =>{
          const loggedInUser = result.user
            console.log(loggedInUser, 'logged in user');
            const user = {email}
            
            //get auth api by token
          axios.post('http://localhost:5000/jwt', user, {withCredentials: true})
          .then(res=> {
            console.log(res.data);
            if(res.data.success){
              navigate(location?.state ? location.state : '/')
            }
          })
           
        })
        .catch(error => {
            console.error(error);
        })
    }

  return (
    <div className="hero my-24">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 mr-12">
          
          <img src={img} alt="" />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <h1 className="text-5xl font-bold text-center p-4">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name='email'
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name='password'
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
                <input className="btn bg-[#FF3811] text-white" type="submit" value="Login" />
            </div>
            <p className='text-center mt-2'>Have an account? <Link to='/signup' className='text-[#FF3811]'>Sign Up</Link> </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
