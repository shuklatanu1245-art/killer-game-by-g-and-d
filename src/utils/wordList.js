export const sketchCategories = {
  standard: [
    'Cat', 'Dog', 'House', 'Tree', 'Car', 'Sun', 'Moon', 'Star', 'Book',
    'Phone', 'Computer', 'Coffee', 'Pizza', 'Guitar', 'Bicycle', 'Airplane'
  ],
  bollywood: [
    'Salman Khan', 'SRK Pose', 'Samosa', 'Rickshaw', 'Taj Mahal', 'Thali'
  ],
  anime: [
    'Goku Hair', 'Naruto Run', 'Pikachu', 'Pokeball', 'Ninja', 'Ramen'
  ],
  adult18: [
    'Beer Glass', 'Cigarette', 'Wine', 'Handcuffs', 'Kiss', 'Hangover'
  ]
};

export const getRandomWord = (category = 'standard', customWords = []) => {
  let list = sketchCategories[category] || sketchCategories.standard;
  
  if (category === 'custom' && customWords && customWords.length > 0) {
     list = customWords;
  }
  
  const index = Math.floor(Math.random() * list.length);
  return list[index];
};
