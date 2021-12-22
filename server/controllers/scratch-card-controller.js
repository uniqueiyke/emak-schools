const pinGen = require('serial-pin-generator');
const CardDetails = require('../models/card-details');

exports.create_scratch_cards = async (req, res) => {
    const newCards = [];
    const {pin_length, serial_num_prefix, serial_num_length, num_of_cards, max_usage} = req.body;
    try {
        const cards = await pinGen({
            pinLength: parseInt(pin_length),
            serialNumLength: parseInt(serial_num_length),
            prefixCharacters: serial_num_prefix,
            numberRequired: parseInt(num_of_cards)
        });

        for(let card of cards){
            const newCard = new CardDetails({
                pin: card.pin,
                serial_number: card.serial_num,
                max_usage,
            });
            await newCard.save();
            newCards.push(newCard);
        }
        
        res.json(newCards);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
}

exports.fetch_scratch_cards = async (req, res) => {
    try {
        const allCards = await CardDetails.find();
        res.json(allCards);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
}