import React, {useEffect} from 'react'
import firebaseConfig  from '../../firebaseConfig';
import * as firebaseui from "firebaseui";
import firebase from "firebase/app";


function PhoneOtp() {

    useEffect (() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
         }else {
            firebase.app(); // if already initialized, use that one
         }
        const uiConfig = {
        signInSuccessUrl: "https://netflix-clone-ankur.herokuapp.com/", //This URL is used to return to that page when we got success response for phone authentication.
        signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
        tosUrl: "https://netflix-clone-ankur.herokuapp.com/"
        };
        if(firebaseui.auth.AuthUI.getInstance()) {
            const ui = firebaseui.auth.AuthUI.getInstance()
            ui.start('#firebaseui-auth-container', uiConfig)
          } else {
            const ui = new firebaseui.auth.AuthUI(firebase.auth())
            ui.start('#firebaseui-auth-container', uiConfig)
          }
    });
    return (
        <div>
            <>
            <div id="firebaseui-auth-container"></div>
            </>
        </div>
    )
}

export default PhoneOtp
