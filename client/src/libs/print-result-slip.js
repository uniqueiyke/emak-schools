import { resultHtml } from "./result-html";

const printResultSlip = (resultDetails, state, schLogo) => {
    var mywindow = window.open('', 'print student result', 'height=700,width=1000');
    mywindow.document.write(resultHtml(resultDetails, state, schLogo));
    mywindow.print();
    mywindow.close();
    return true;
}

export default printResultSlip;