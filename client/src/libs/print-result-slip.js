import { resultHtml } from "./result-html";

const printResultSlip = (resultDetails, state, schLogo) => {
    const mywindow = window.open('', 'print student result', 'height=100,width=100');
    const document = mywindow.document.open();
    document.write(resultHtml(resultDetails, state, schLogo));
    document.close();
    mywindow.moveTo(0, 0);
    mywindow.resizeTo(mywindow.screen.width, mywindow.screen.height);

    mywindow.onload = function() { // wait until all resources loaded 
        mywindow.focus(); // necessary for IE >= 10
        mywindow.print();  // change window to mywindow
        mywindow.close();// change window to mywindow
    };
    return true;
}

export default printResultSlip;