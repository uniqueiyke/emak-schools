const staffRegRequestEmail = (link, codeKey) => {

    return (`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .container{
            margin: 20px 40px;
        }
        .title{
            color: #14a0ca;
            font-size: 3rem;
            text-align: center;
            
        }
        .body{
            font-size: 1.5rem;
        }
        .flex-container{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .reg-token{
            background-color: #d6d4cf;
            font-size: 1.8rem;
            font-style: italic;
            z-index: -4;
        }
        .em{
            font-weight: 900;
            color: green;
        }
    </style>
</head>
<body>
    <div class="container">
        
       <div class="flex-container">
        <div>
           <img src="https://emakgodsownschools.herokuapp.com/static/media/sch-logo-250x180.5eeed096.png" alt="school logo" >
        </div>
        <div class="title">
            Registration Link
        </div>
       </div>
        <div class="body">
           <p> 
               <em>Please click on this <a href="${link}" target="_blank">link</a> to complete the on line registration.</em>
               Your registration <em class="em">key code</em> is <span class="reg-token">${codeKey}</span><br />
               You will require this <em class="em">key</em> to proceed with the registration. <br />
               <em>Note that the token is case sensitive. Therefore you have to enter 
                   every character as the appear.
               </em>
            </p>
            <p>
                Your recieved this message because you were recruited as staff
                in Emak God's Own Schools. You have to complete the your registration
                on the school website so to make you a full staff and for you to discharge your 
                duty efficiently. The link expire after 72 hours.
            </p>
            <p>
                if you have never apply to the school or never accept any offer from the school, 
                please do well to follow this <a href="" target="_blank">link</a> opt out.  
            </p>
        </div>
    </div>
</body>
</html>
    `);
}

module.exports = staffRegRequestEmail;