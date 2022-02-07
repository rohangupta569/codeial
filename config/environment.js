
const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db: 'codeial_development',
    smtp : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user:'',
            pass: ''
        }
    },
    google_client_id: "750299518198-69m2j93lnduvp177jqmqnisbjho0rnbm.apps.googleusercontent.com",
    google_client_secret: "NMreEP4Rzgpt_fQosbYbwYgl",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial'
}

const production = {
    name : 'production'
}

module.exports = development;