export const imposterCategories = {
  standard: [
    { word: 'Apple', hint: 'Fruit' },
    { word: 'Banana', hint: 'Fruit' },
    { word: 'Car', hint: 'Vehicle' },
    { word: 'Bicycle', hint: 'Vehicle' },
    { word: 'Laptop', hint: 'Electronics' },
    { word: 'Smartphone', hint: 'Electronics' },
    { word: 'Dog', hint: 'Animal' },
    { word: 'Cat', hint: 'Animal' },
    { word: 'Guitar', hint: 'Musical Instrument' },
    { word: 'Piano', hint: 'Musical Instrument' },
    { word: 'Pizza', hint: 'Food' },
    { word: 'Burger', hint: 'Food' },
    { word: 'Coffee', hint: 'Drink' },
    { word: 'Tea', hint: 'Drink' }
  ],
  bollywood: [
    { word: 'Sholay', hint: 'Movie' },
    { word: 'DDLJ', hint: 'Movie' },
    { word: 'Amitabh', hint: 'Actor' },
    { word: 'SRK', hint: 'Actor' },
    { word: 'Kabir Singh', hint: 'Movie' },
    { word: '3 Idiots', hint: 'Movie' },
    { word: 'Ranbir Kapoor', hint: 'Actor' }
  ],
  anime: [
    { word: 'Naruto', hint: 'Anime' },
    { word: 'One Piece', hint: 'Anime' },
    { word: 'Goku', hint: 'Character' },
    { word: 'Luffy', hint: 'Character' },
    { word: 'Death Note', hint: 'Anime' },
    { word: 'Attack on Titan', hint: 'Anime' }
  ],
  adult18: [
    { word: 'Vodka', hint: 'Alcohol' },
    { word: 'Beer', hint: 'Alcohol' },
    { word: 'Strip Club', hint: 'Place' },
    { word: 'Hangover', hint: 'Condition' },
    { word: 'Condom', hint: 'Item' },
    { word: 'Tinder', hint: 'App' }
  ]
};

export const getRandomImposterWord = (category = 'standard', customWords = []) => {
  let list = imposterCategories[category] || imposterCategories.standard;
  
  if (category === 'custom' && customWords && customWords.length > 0) {
     list = customWords.map(w => ({ word: w, hint: 'Custom Word' }));
  }

  const index = Math.floor(Math.random() * list.length);
  return list[index];
};
