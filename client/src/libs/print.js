export const printCards = async (cardsToPrint, cards, brandMsg) => {
    var mywindow = window.open('', 'print cards', 'height=700,width=1000');
    mywindow.document.write('<html><head><title>Print Pards</title>');
    mywindow.document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">');
    mywindow.document.write('</head><body >');
    for (let cardID of cardsToPrint) {
        const card = cards.filter(card => card._id === cardID)
        mywindow.document.write(formatCardForPrinting(card[0], brandMsg));
    }
    mywindow.document.write('</body></html>');

    mywindow.print();
    mywindow.close();

    return true;
}




export function formatCardForPrinting(card, brandMsg) {
    const addElement = (value, key='') => {

        // if(!isNotEmptyObject(brandMsg)) return '';
        
        if(brandMsg.brief_description){
            let msg = value.split('\n').join('<br />')
            return `<div><em>${key} </em><span> ${msg}</span></div>`
        }
        return `<div><em>${key} </em><span> ${value}</span></div>`
    }
    return (
        `<div class="row">
            <div class="col s12 m6">
                <div class="card green lighten-3">
                    <div class="card-content">
                        ${addElement(brandMsg.brand_name)}
                        ${addElement(brandMsg.brief_description)}
                        <div><em>Pin: </em><span> ${card.card_pin}</span></div>
                        <div><em>Serial Number: </em> <span>${card.card_ser_num}</span></div>
                    </div>
                    <div class="card-action">
                        <div><em>Number Of Usage: </em><span> ${card.max_usage}</span></div>
                        ${addElement(brandMsg.website, 'Website')}
                        ${addElement(brandMsg.email, 'Email')}
                    </div>
                </div>
            </div>
            <hr />
        </div>`
    )
}
