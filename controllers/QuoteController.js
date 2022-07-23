import QuoteModel from "../models/Quote.js";

export const create = async (req, res) => {
  const { quote, character, anime, animePhotoURL } = req.body;
  try {
    const doc = new QuoteModel({ quote, character, anime, animePhotoURL });
    const createdQuote = await doc.save();
    res.json(createdQuote);
  } catch (err) {
    console.log(err);
    res.json({ message: "error in server" });
  }
};

export const getRandom = async (req, res) => {
  try {
    QuoteModel.findRandom()
      .limit(10)
      .exec(function (err, quotes) {
        res.json(
          quotes.map((quote) => {
            const { r, __v, ...all } = quote._doc;
            return all;
          }),
        );
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить цитаты" });
  }
};

export const getByAnimeTitle = async (req, res) => {
  try {
    const quotes = await QuoteModel.find({
      anime: req.query.title,
    }).limit(10);
    res.json(
      quotes.map((quote) => {
        const { r, __v, ...all } = quote._doc;
        return all;
      }),
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить цитаты" });
  }
};

export const getByCharacterName = async (req, res) => {
  try {
    const quotes = await QuoteModel.find({
      character: req.query.name,
    }).limit(10);
    res.json(
      quotes.map((quote) => {
        const { r, __v, ...all } = quote._doc;
        return all;
      }),
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить цитаты" });
  }
};
