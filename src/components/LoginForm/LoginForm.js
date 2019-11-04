import React from "react";
import TextField from '@material-ui/core/TextField';

import './LoginForm.css';
import { LoginButton } from "../buttons";

const initialState = {
    error: null, 
    person: {
        username: "",
        password: ""
    }
};

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        // Update the state everytime a value in the usename or password field changes
        // Also display errors from the state if they exist
        return (
            <div class="loginContainer">
                <div id="loginInterface">
                    <LoginHeader />
                    <div id="inputContainer">
                        <UsernameField onChange={ this.handleChange } /> 
                        <br/>
                        <PasswordField onChange={ this.handleChange } />
                    </div>
                    <ErrorMessage error={ this.state.error } />
                    <div id="loginButtonContainer">
                        <LoginButton className="login" onClick={this.onClick} />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Updates the state based on the event
     */
    handleChange(event, newValue) {
        event.persist(); 

        // Update the state based on the text field that changed
        this.setState((state) => {
            // state.person[event.target.name] = newValue; // newValue is undefined?, below line works though
            state.person[event.target.name] = event.target.value;
        });

    }

    /**
     * Verifies values in username and password fields. If there is a problem, update the state with the error.
     */
    onClick() {
        if(this.state.person['username'] === "" || this.state.person['password'] === "") {
            
            // Have the error message in state
            const errorState = {
                error: "Invalid username or password", 
                person: {
                    username: this.state.person['username'],
                    password: this.state.person['password']
                }
            };
            
            // Set state to new errored state
            this.setState(errorState);
        }
        else {
            // Attempt to login by calling the login method provided by props.onSubmit
            // Calls the method "login" in App.js
            let attemptLogin = this.props.onSubmit(this.state.person['username'], this.state.person['password']);

            if( attemptLogin === false ){
                // Have the error message in state
                const errorState = {
                    error: "Invalid username or password", 
                    person: {
                        username: this.state.person['username'],
                        password: this.state.person['password']
                    }
                };
                
                // Set state to new errored state
                this.setState(errorState);
            }
        } 
    }

}


/**
 * 
 */
function LoginHeader() {
    return (
        <div id="loginHeader">
            <h1>Boston Code Camp</h1>
            <h2>Administrator Login</h2>
        </div>
    );
}

/**
 * A username text field
 * 
 * @param   {{
 *              onChange: Function;
 *          }} props 
 */
function UsernameField(props) {
    return (
        <TextField
            name="username"
            id="outlined-username-input"
            label="Email"
            margin="normal"
            variant="outlined"
            className="fullWidth"
            onChange={ props.onChange }
        />
    );
}

/**
 * A password text field
 * 
 * @param   {{
 *              onChange: Function;
 *          }} props 
 */
function PasswordField(props) {
    return (
        <TextField
            name="password"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            className="fullWidth"
            onChange={ props.onChange }
        />
    );
}

/**
 * Displays error message
 * 
 * @param   {{
 *              error: string
 *          }} props 
 */
function ErrorMessage(props){
    return (
        <div id="errorContainer">
            <p className="noPadding noMargin">
                { props.error }
            </p>
        </div>
    );
}