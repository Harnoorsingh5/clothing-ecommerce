import React from 'react';
import FormInput from '../form-input/form-input.component.jsx';
import CustomButtom from '../custom-button/custome-button.component.jsx';
import './sign-up.styles.scss';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils.js';

class SignUp extends React.Component{

    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmpassword: '',
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmpassword} = this.state;

        if(password !== confirmpassword){
            alert("Passwords don't match!");
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmpassword: '',
            })
        }
        catch(error){
            console.log(error);
        }
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]:value})
    }

    render(){
        const {displayName, email, password, confirmpassword} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I do not have an account </h2>
                <span> Sign Up with your email and password </span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput name="displayName" type="text" value={displayName} handleChange={this.handleChange} label="Display Name" required/>
                    <FormInput name="email" type="email" value={email} handleChange={this.handleChange} label="Email" required/>
                    <FormInput name="password" type="password" value={password} handleChange={this.handleChange} label="Password" required/>
                    <FormInput name="confirmpassword" type="password" value={confirmpassword} handleChange={this.handleChange} label="Confirm Password" required/>
                    <div className="buttons">
                        <CustomButtom type="submit"> Sign Up </CustomButtom>
                    </div>
                </form>

            </div>
        )
    }
}

export default SignUp;