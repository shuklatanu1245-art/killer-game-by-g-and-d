export const PictionaryWords = [
  "Apple", "Banana", "Cat", "Dog", "Elephant", "Fish", "Guitar", "House", "Ice Cream", 
  "Jellyfish", "Kite", "Lion", "Monkey", "Ninja", "Octopus", "Pizza", "Queen", "Robot", 
  "Snake", "Tree", "Umbrella", "Vampire", "Watermelon", "X-ray", "Yoyo", "Zebra",
  "Spider", "Ghost", "Car", "Airplane", "Bicycle", "Train", "Boat", "Sun", "Moon", 
  "Star", "Cloud", "Rain", "Snowman", "Mountain", "River", "Flower", "Grass", 
  "Computer", "Phone", "Television", "Book", "Pencil", "Chair", "Table", "Bed",
  "Clock", "Shoe", "Hat", "Shirt", "Pants", "Glasses", "Watch", "Ring", "Diamond",
  "Fire", "Water", "Earth", "Wind", "Coffee", "Tea", "Milk", "Burger", "Fries",
  "Hotdog", "Taco", "Sushi", "Cake", "Cookie", "Chocolate", "Candy", "Balloon",
  "Camera", "Key", "Lock", "Door", "Window", "Mirror", "Toothbrush", "Soap",
  "Towel", "Comb", "Brush", "Scissors", "Knife", "Fork", "Spoon", "Plate", "Cup"
];

export const getRandomWord = () => {
  return PictionaryWords[Math.floor(Math.random() * PictionaryWords.length)];
};
