import { getSchoolFromClass } from './students-data';


const parseRows = (subjects) => {
    let rows = '';
    for (const subject of subjects) {
        rows += `<tr class="tr" >
        <th class="thr" scope="row">${subject.title}</th>
        <td class="td">${subject.c_a}</td>
        <td class="td">${subject.exam}</td>
        <td class="td">${subject.total}</td>
        <td class="td">${subject.position}</td>
        <td class="td"></td>
    </tr>`
    }
    return rows;
}

export const resultHtml = (resultDetails, state) => {
    return (`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emak God's Own Schools</title>
    <style>
    @media print and (max-width: 767px) { 
        .thead {
            background-color: #3f87a6;
            color: #fff;
        }
        .tbody {
            background-color: #e4f0f5;
        }
        .caption {
            padding: 10;
            caption-side: bottom;
        }
        .table {
            border-collapse: collapse;
            border: 2px solid rgb(200, 200, 200);
            letter-spacing: 1;
            font-family: sans-serif;
            font-size: .8rem;
        }
        .th {
            border: 1px solid rgb(190, 190, 190);
            padding: 5px 10px;
        }
        .thr {
            border: 1px solid rgb(190, 190, 190);
            padding: 5px 10px;
            text-align: left;
        }
        .td {
            text-align: center;
            border: 1px solid rgb(190, 190, 190);
            padding: 5px 10px;
        }
        .titleDiv {
            display: flex;
            justify-content: space-between;
        }
        .titleP {
            text-align: center;
            font-family: Algerian, Arial, Helvetica, sans-serif;
            font-size: 1rem;
            padding-top: 10;
            text-transform: uppercase;
        }
        .stuImgDiv {
            border: solid 1px;
            height: 100;
            text-align: center;
            max-height: 100;
        }
        .cap {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bolder;
            text-transform: uppercase;
        }
        .lowerCap {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
        }
        .subTitle {
            font-weight: bolder;
            color: goldenrod;
            display: grid;
            justify-content: center;
            align-items: center;
            text-transform: uppercase;
        }
        .nameSpan {
            color: #1d5a1d;
            font-family: "Verdana; Geneva; Tahoma; sans-serif";
            text-transform: uppercase;
            font-weight: bold;
        }
        .regSpan {
            color: #076374;
            font-weight: bold;
        }
        .otherSpan {
            text-transform: uppercase;
        }
        .outerGroup {
            display: grid;
            grid-template-columns: auto auto;
        }
        .outerGroup1 {
            display: grid;
            grid-template-columns: auto auto auto;
        }
        .innerGroup {
            justify-self: end;
        }
        .centerGroup {
            justify-self: center;
        }
        .signSpan {
            font-weight: bolder;
        }
        .mottoDiv {
            display: grid;
            justify-content: center;
            font-weight: bolder;
            text-transform: uppercase;
            color: #ffc0cbd2;
            font-size: 1.1rem
        
        }
     }
        .thead {
            background-color: #3f87a6;
            color: #fff;
        }

        .tbody {
            background-color: #e4f0f5;
        }

        .caption {
            padding: 10;
            caption-side: bottom;
        }

        .table {
            border-collapse: collapse;
            border: 2px solid rgb(200, 200, 200);
            letter-spacing: 1;
            font-family: sans-serif;
            font-size: .8rem;
        }

        .th {
            border: 1px solid rgb(190, 190, 190);
            padding: 5px 10px;
        }

        .thr {
            border: 1px solid rgb(190, 190, 190);
            padding: 5px 10px;
            text-align: left;
        }

        .td {
            text-align: center;
            border: 1px solid rgb(190, 190, 190);
            padding: 5px 10px;
        }

        .titleDiv {
            display: flex;
            justify-content: space-between;
        }

        .titleP {
            text-align: center;
            font-family: Algerian, Arial, Helvetica, sans-serif;
            font-size: 1rem;
            padding-top: 10;
            text-transform: uppercase;
        }

        .stuImgDiv {
            border: solid 1px;
            height: 100;
            text-align: center;
            max-height: 100;
        }

        .cap {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bolder;
            text-transform: uppercase;
        }

        .lowerCap {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
        }

        .subTitle {
            font-weight: bolder;
            color: goldenrod;
            display: grid;
            justify-content: center;
            align-items: center;
            text-transform: uppercase;
        }

        .nameSpan {
            color: #1d5a1d;
            font-family: "Verdana; Geneva; Tahoma; sans-serif";
            text-transform: uppercase;
            font-weight: bold;
        }

        .regSpan {
            color: #076374;
            font-weight: bold;
        }

        .otherSpan {
            text-transform: uppercase;
        }

        .outerGroup {
            display: grid;
            grid-template-columns: auto auto;
        }

        .outerGroup1 {
            display: grid;
            grid-template-columns: auto auto auto;
        }

        .innerGroup {
            justify-self: end;
        }

        .centerGroup {
            justify-self: center;
        }

        .signSpan {
            font-weight: bolder;
        }

        .mottoDiv {
            display: grid;
            justify-content: center;
            font-weight: bolder;
            text-transform: uppercase;
            color: #ffc0cbd2;
            font-size: 1.1rem
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="titleDiv">
            <div>
                <img src='https://emakgodsownschools.herokuapp.com/static/media/sch-logo-250x180.5eeed096.png' alt='school logo' height='100' />
            </div>
            <p class="titleP">
                EMAK GOD'S OWN SCHOOLS
                <br />
                20 OJIKE STREET, UMUAHIA, ABIA STATE
            </p>
            <div class="stuImgDiv" >
                <img src="" alt='Student passport' height='100' />
            </div>
        </div>
        <p class="container">
            <span class="subTitle">Student Result Slip for ${getSchoolFromClass(state.class_name)}</span>

            <span class="cap">Addmission Number:</span>  <em class="regSpan">${resultDetails.student.reg_number}</em>
            <br />
            <span class="cap">Name:</span>  <em class="nameSpan" >${resultDetails.student.name.last_name}, ${resultDetails.student.name.first_name} ${resultDetails.student.name.other_names}</em>
            <span class="outerGroup">
                <span>
                    <span class="cap">Gender:</span>
                    <em class="otherSpan">${resultDetails.student.gender}</em>
                </span>
                <span class="innerGroup">
                    <span class="cap">Class:    </span>
                    <span class="otherSpan">${state.class_name}${state.class_stream}</span>
                </span>
            </span>
            <span class="outerGroup1">
                <span>
                    <span class="cap">Term:    </span>
                    <span>${state.term}</span>
                </span>
                <span class="centerGroup">
                    <span class="cap">Academic Year:    </span>
                    <span class="otherSpan">${state.session}</span>
                </span>
                <span class="innerGroup">
                    <span class="cap">ED. Zone:    </span>
                    <span class="otherSpan">Umuahia North</span>
                </span>
            </span>
        </p>
        <table class="table" >
            <thead class="thead">
                <tr class="tr">
                    <th class="th" scope="col"></th>
                    <th class="th" scope="col">Continious Assessment</th>
                    <th class="th" scope="col">Exam</th>
                    <th class="th" scope="col">Total</th>
                    <th class="th" scope="col">Subject Position</th>
                    <th class="th" scope="col">Remark</th>
                </tr>
            </thead>
            <tbody class="tbody">
                ${parseRows(resultDetails.subjects)}
            </tbody>
        </table>
        <p class="container">
            <span class="outerGroup">
                <span>
                    <span class="lowerCap">Total Mark:</span>
                    <em class="otherSpan">${resultDetails.total}</em>
                </span>
                <span class="innerGroup">
                    <span class="lowerCap">Average:    </span>
                    <em class="otherSpan">${resultDetails.average}</em>
                </span>
            </span>
            <span class="outerGroup">
                <span>
                    <span class="lowerCap">Class Position:    </span>
                    <em>${resultDetails.position}         </em>
                    <span class="lowerCap">out of    </span>
                    <em>${resultDetails.number_of_students + 10}</em>
                </span>
                <span class="innerGroup">
                    <span class="lowerCap">Status:  </span>
                    <span class="otherSpan">${resultDetails.average >= 40 ? 'Passed' : 'Failed'}</span>
                </span>
            </span>
        </p>
        <p class="signSpan">Approved and Signed by the Proprietress, Deaconess Mercy Kalu</p>
        <p class="mottoDiv">Encourage and build you child up in the he should go</p>
    </div>
</body>
</html>
    `)
}