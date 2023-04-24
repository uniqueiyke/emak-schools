const { getOneClass } = require("../../../../libs/utility-function");

const transferResults = async (session, term, class_name, results) => {
    const [oneClass, termGradeBook] = await getOneClass(session, term, class_name);
    oneClass.results = results;
    await termGradeBook.save();
    console.log(`result for ${class_name} ${term}, ${session} academic session Result Inserted`);
    console.log('');
}

module.exports = transferResults;