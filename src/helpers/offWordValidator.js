const arrOffWords = require('../config/keys').arrOffWords;
const OffWords = require('../models/OffensiveWords');

const offWordValidator = (text, offWords) => {
    let offensiveWords= []
    for (let offWord of offWords) {
        if (text.toLowerCase().indexOf(offWord.word.toLowerCase()) !== -1) {
            let word = `${offWord.word} = level:${offWord.level}`
            offensiveWords.push(word);
        }
    }
    return offensiveWords;
};

const getOffWords = async (OffensiveWords)=> {
    const offensiveWordsBD = await OffensiveWords.find({},["word","level"]);
    let arrOffWords = [];
    for(let offWord of offensiveWordsBD) {
        let ofensiveWord = {
            word: offWord.word,
            level: offWord.level
        }
        arrOffWords.push(ofensiveWord);
    }
    return arrOffWords;
};

// Create a DataBase Middleware to check if there are offWords in DB , if its empty add offWords
const checkOffWords = async () => {
    const offWords = await OffWords.find({}); 
    if(offWords.length === 0) {
    await OffWords.insertMany(arrOffWords, function(error, docs) {
        if(error){console.log(error)}
        console.log("OffensivesWords inserted : ", arrOffWords);
    })
    } else {
        console.log("There are offWords in DB!!");
    }
};


module.exports = { offWordValidator, getOffWords, checkOffWords };