const successfulPasswordReset = () => (`
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
            <img src="${process.env.domainName}/server/public/img/sch_logo-200x144.png" alt="" srcset="">
        </div>
        <div class="title">
            password Reset Successful
        </div>
    </div>
    <div class="body">
        <p>
            You have successfully reseted your password
        </p>
        <p>
            if you never perform this action please call the admin immediately. Thanks
        </p>
    </div>
    </div>
</body>

</html>
`);


module.exports = successfulPasswordReset;