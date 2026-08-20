export const imposterCategories = {
  standard: [
    { word: 'Apple', hint: 'Doctor' },
    { word: 'Banana', hint: 'Monkey' },
    { word: 'Car', hint: 'Wheels' },
    { word: 'Bicycle', hint: 'Pedal' },
    { word: 'Laptop', hint: 'Keyboard' },
    { word: 'Smartphone', hint: 'Screen' },
    { word: 'Dog', hint: 'Bark' },
    { word: 'Cat', hint: 'Meow' },
    { word: 'Guitar', hint: 'Strings' },
    { word: 'Piano', hint: 'Keys' },
    { word: 'Pizza', hint: 'Slice' },
    { word: 'Burger', hint: 'Bun' },
    { word: 'Coffee', hint: 'Caffeine' },
    { word: 'Tea', hint: 'Leaves' }
  ],
  bollywood: [
    { word: 'Sholay', hint: 'Gabbar' },
    { word: 'DDLJ', hint: 'Train' },
    { word: 'Amitabh', hint: 'Angry' },
    { word: 'SRK', hint: 'Romance' },
    { word: 'Kabir Singh', hint: 'Anger' },
    { word: '3 Idiots', hint: 'College' },
    { word: 'Ranbir Kapoor', hint: 'Animal' }
  ],
  anime: [
    { word: 'Naruto', hint: 'Ninja' },
    { word: 'One Piece', hint: 'Pirate' },
    { word: 'Goku', hint: 'Saiyan' },
    { word: 'Luffy', hint: 'Rubber' },
    { word: 'Death Note', hint: 'Book' },
    { word: 'Attack on Titan', hint: 'Giants' }
  ],
  adult18: [
    { word: 'Vodka', hint: 'Russia' },
    { word: 'Beer', hint: 'Mug' },
    { word: 'Strip Club', hint: 'Pole' },
    { word: 'Hangover', hint: 'Headache' },
    { word: 'Condom', hint: 'Protection' },
    { word: 'Tinder', hint: 'Swipe' }
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
