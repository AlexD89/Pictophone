import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount(){
        this.props.clearErrors();
    }

    handleSubmit(e){
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.login(user);
    }

    update(field) {
        return e => this.setState({[field]: e.currentTarget.value});
    }

    render() {

        return(
            <div className='login-form-container'>
                <form
                    className='login-form'
                    onSubmit={this.handleSubmit}
                >   <div className="login-header">
                        <h2>LOG IN TO PICTOPHONE</h2>
                    </div>
                    <div className='username-input-container'>
                        <input
                            type="text"
                            onChange={this.update('username')} placeholder="Username"/>
                        {this.props.errors.username ? this.props.errors.username : ""}
                    </div>
                    <div className='password-input-container'>
                        <input
                            type="password"
                            onChange={this.update('password')} placeholder="Password"/>
                            {this.props.errors.password ? this.props.errors.password : ""}
                    </div>
                    <button>Sign In</button>
                </form>

            </div>
        )
     
    }
}

export default LoginForm;