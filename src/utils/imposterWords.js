export const ImposterWords = [
  { word: "Titanic", hint: "Famous Movie" },
  { word: "Eiffel Tower", hint: "Monument / Landmark" },
  { word: "Harry Potter", hint: "Book / Movie Character" },
  { word: "Superman", hint: "Superhero" },
  { word: "Pizza", hint: "Fast Food" },
  { word: "Apple", hint: "Fruit & Tech Company" },
  { word: "Elon Musk", hint: "Billionaire / CEO" },
  { word: "Youtube", hint: "Social Media / Website" },
  { word: "Guitar", hint: "Musical Instrument" },
  { word: "Doctor", hint: "Profession" },
  { word: "Kangaroo", hint: "Animal" },
  { word: "Cricket", hint: "Sport" },
  { word: "Chess", hint: "Board Game" },
  { word: "Doraemon", hint: "Cartoon Character" },
  { word: "Mona Lisa", hint: "Famous Painting" },
  { word: "Mount Everest", hint: "Geographical Feature" },
  { word: "Bluetooth", hint: "Technology" },
  { word: "Pikachu", hint: "Anime Character" },
  { word: "Burj Khalifa", hint: "Famous Building" },
  { word: "Gold", hint: "Precious Metal" },
  { word: "Taj Mahal", hint: "Monument in India" },
  { word: "Spider-Man", hint: "Superhero" },
  { word: "Netflix", hint: "Streaming Service" },
  { word: "Coffee", hint: "Beverage" },
  { word: "Lion", hint: "Wild Animal" },
  { word: "Dinosaur", hint: "Extinct Creature" },
  { word: "Vampire", hint: "Mythical Creature" },
  { word: "Helicopter", hint: "Vehicle" },
  { word: "Winter", hint: "Season" },
  { word: "Brain", hint: "Human Body Part" }
];

export const getRandomImposterWord = () => {
  return ImposterWords[Math.floor(Math.random() * ImposterWords.length)];
};
