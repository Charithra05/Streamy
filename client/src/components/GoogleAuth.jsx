import React from 'react';
import {connect} from 'react-redux';
import {signIn,signOut}from '../actions';

class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'756671861523-vh5eg5kjjplcrsjd6q7ic8smrjtq94b9.apps.googleusercontent.com',
                scope:'email',
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);

            })

        })
    }
    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().Ea);
        }else{
            this.props.signOut();
        }
    }

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null;
        }else if (this.props.isSignedIn){
            return (
                <button onClick={() => this.auth.signOut()} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        }else{
            return (
                <button onClick={() => this.auth.signIn()} className="ui red google button">
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            );
        }
    }

    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        );
    }

}
const mapStateToProps=(state)=>{
    return {isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);