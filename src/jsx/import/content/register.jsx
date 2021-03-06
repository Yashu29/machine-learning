/**
 * register.jsx: registration form.
 *
 * @RegisterForm, must be capitalized in order for reactjs to render it as a
 *     component. Otherwise, the variable is rendered as a dom node.
 *
 * Note: this script implements jsx (reactjs) syntax.
 */

import Spinner from '../general/spinner.jsx';

var RegisterForm = React.createClass({
  // initial 'state properties'
    getInitialState: function() {
        return {
            display_spinner: false,
        };
    },
  // call back: used to return spinner
    getSpinner: function() {
        if (this.state.display_spinner) {
            return Spinner;
        }
        else {
            return 'span';
        }
    },
  // triggered when 'state properties' change
    render: function() {
        var AjaxSpinner = this.getSpinner();

        return(
            <div className='main-full-span register-form'>
                <h1>Create your account</h1>
                <form onSubmit={this.handleSubmit} ref='registerForm'>
                    <div className='form-group'>
                        <label className='form-label'>Username</label>
                        <input
                            type='text'
                            name='user[login]'
                            className='input-block'
                            placeholder='Pick a username'
                        />
                        <p className='note'>This will be your username</p>
                    </div>

                    <div className='form-group'>
                        <label className='form-label'>Email Address</label>
                        <input
                            type='text'
                            name='user[email]'
                            className='input-block'
                            placeholder='Your email address'
                        />
                        <p className='note'>
                            You will get updates regarding account changes,
                            or activitites. This email address will not be
                            shared with anyone.
                        </p>
                    </div>

 
                    <div className='form-group'>
                        <label className='form-label'>Password</label>
                        <input
                            type='password'
                            name='user[password]'
                            className='input-block'
                            placeholder='Create a password'
                        />
                        <p className='note'>
                            Use at least one letter, one numeral,
                            and seven characters.
                        </p>
                    </div>

                    <input
                        type='submit'
                        className='btn btn-primary'
                        value='Create an account'
                    />
                    <AjaxSpinner />
                </form>
            </div>
        );
    }
});

// indicate which class can be exported, and instantiated via 'require'
export default RegisterForm
