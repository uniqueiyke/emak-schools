const passwordResetEamil = (resetCode ) => (`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .container {
            margin: 20px 40px;
        }

        .title {
            color: #14a0ca;
            font-size: 3rem;
            text-align: center;

        }

        .body {
            font-size: 1.5rem;
        }

        .flex-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .reg-token {
            background-color: #d6d4cf;
            font-size: 1.8rem;
            font-style: italic;
            z-index: -4;
        }
    </style>
</head>

<body>
    <div class="container">

        <div class="flex-container">
            <div class="img-contener">
            <img src="https://emakgodsownschools.herokuapp.com/static/media/sch-logo-250x180.5eeed096.png" alt="" srcset="">
        </div>
        <div class="title">
            Password reset request
        </div>
    </div>
    <div class="body">
        <p>
            Use this code to reset your password <span class="reg-token">${resetCode} </span><br />
            You will require to provid new strong password. <br />
        </p>
        <p>
            Your recieved this message because you requested for password reset. The code will expire after 20 minutes.
        </p>
        <p>
            if you have never apply to the school or never accept any offer from the school,
            please do well to follow this ignore the message.
        </p>
    </div>
    </div>
</body>

</html>
`);

module.exports = passwordResetEamil;