import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBrAVy-BKI_8IdPBDBPUbibDlb96fLIRzs",
    authDomain: "bcc-counter-86d9b.firebaseapp.com",
    databaseURL: "https://bcc-counter-86d9b.firebaseio.com",
    projectId: "bcc-counter-86d9b",
    storageBucket: "bcc-counter-86d9b.appspot.com",
    messagingSenderId: "695752326289",
    appId: "1:695752326289:web:1e5bf53079d6c392679330",
    measurementId: "G-L9028GXXHT"
};

const fire = firebase.initializeApp(config);
export default fire;
