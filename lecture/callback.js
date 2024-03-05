let animals = ['Giraffe', 'Elephant', 'Yak'];

animals.forEach(function(animal, index){
    console.log(animal, index);
});

// arrow notation below
animals.forEach((animal, index) => {
    console.log(animal, index);
});