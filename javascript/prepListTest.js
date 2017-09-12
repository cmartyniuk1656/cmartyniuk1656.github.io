/**
 * Created by Chris on 29/07/2016.
 */

//Prep List object. Holds all specs, ingredients, and required material objects.
window.preplist = {

    currentlySelected: '',
    selectedAmount: 0,
    calItems:[],
    itemsToAdd: [],
    currentArea: '',
    currentDay: 'Monday',

    ribs: 0,
    mushroomMix: 0,
    meatLoaf: 0,
    chickenTaco: 0,
    mexiBeef: 0,
    mexiRice: 0,
    basmati: 0,
    tarts: 0,
    cookies: 0,
    eggRollMix: 0,
    chickenStock: 0,
    avacadoCornSalsa: 0,
    tomatoSoup: 0,
    pomodoro: 0,
    asianVeg: 0,
    fajitaVeg: 0,
    dayVeg: 0,
    calamari: 0,
    bangShrimp: 0,
    tacoShrimp: 0,
    salmon: 0,
    chickenRolls: 0,
    bisonBurger: 0,
    bangSauce: 0,
    demiGlaze: 0,
    blackening: 0,
    tartCrust: 0,
    tartFilling: 0,
    bruschetta: 0,
    cajunButter: 0,
    twoPcChx: 0,
    fingers: 0,
    tenders: 0,
    chimi: 0,
    citrusAioli: 0,
    coleslaw: 0,
    garlicButter: 0,
    guacamole: 0,
    marinatedChx: 0,
    pico: 0,
    pineappleSalsa: 0,
    stirFrySauce: 0,
    threeCheese: 0,
    pestoMayo: 0,
    flats: 0,
    chipRanch: 0,
    cilantroLime: 0,

    dicedTom: 0,
    dicedRedOnion: 0,
    cilantro: 0,
    parsley: 0,
    carrot: 0,
    shreddedCarrots: 0,
    choppedCarrots: 0,
    choppedOnions: 0,
    choppedRedOnions: 0,
    juliennedRedPepper: 0,
    juliennedOnions:0,
    juliennedGreenPepper:0,
    choppedRedPepper:0,
    basil:0,
    limeJuice:0,
    lemonJuice:0,
    garlicPaste: 0,
    eggs:0,
    calabreseBread: 0,
    milk: 0,
    butterMilk: 0,
    garlicInOil: 0,
    chxStockBase: 0,
    dicedPineapple: 0,
    dicedMango: 0,
    dicedJaps: 0,
    dicedSpinach: 0,
    shrimp: 0,
    mayonaise: 0,
    sourCream: 0,
    garlic: 0,
    chipotlePepper: 0,
    SoySauce: 0,
    tacoSeasoning:0,
    choppedBokChoy: 0,
    snowPeas: 0,
    choppedCelery: 0,
    greenBeans: 0,
    buttonMushrooms: 0,
    cremeniMushrooms: 0,
    portebellow: 0,
    friedBacon: 0,
    groundBison: 0,
    groundBeef: 0,
    burgerPatty: 0,
    thyme: true,
    oregano: true,
    tableSalt: 0,
    groundBlackPepper: 0,
    groundWhitePepper: 0,
    garlicPowder: 0,
    paprika: 0,
    chiliPowder: 0,
    cayannePepper: 0 ,
    granulatedOnion: 0,
    burgerSpice: 0,
    oliveOil: 0,
    redVinegar: 0,
    vegetableOil: 0,
    blackBeanSauce: 0,
    chiliSauce: 0,
    sriracha: 0,
    mincedGineger: 0,
    sesameOil: 0,
    riceVinegar: 0,
    sweetChiliSauce: 0,
    searedChx: 0,
    grilledChx: 0,
    cornRelish: 0,
    friedRedOnion: 0,
    friedShreddedCarrot: 0,
    roastedRomas: 0,
    shreddedMozzarella: 0,
    shreddedJapHavarti: 0,
    sundriedTomatoes: 0,
    gratedRomano: 0,
    cannedTomato: 0,
    bullseyeSauce: 0,
    water: 0,
    rawBasmati: 0,
    parbroiledRice: 0,
    butter: 0,
    cookieDough: 0,
    jackDaniels: 0,
    dicedOnions: 0,
    ciderVinegar:0,
    flattenedChx:0,
    dethawedRibs:0,
    avacadoBag:0,
    blackeningSpice:0,
    tenderPortions: 0,

    deepHotelPan: 0,
    mediumHotelPan:0,
    shallowHotelPan: 0,

    smallRectangleInsert:0,
    smallSquareInsert:0,
    mediumSquareInsert:0,
    mediumRectangleInsert: 0,
    largeSquareInsert:0,
    largeRectangleInsert:0,
    largestSquareInsert: 0,
    largestRectangleInsert: 0,
    smallMetalBowl:0,
    largeMetalBowl: 0,
    tray:0,
    seramWrap:false,
    tinFoil: false,
    parchmentPaper:false,

    dicer:0,
    shredder:0,
    peeler:0,
    spatula:0,
    fryingpan:0,
    smallPot:0,
    largePot:0,
    measuringCup:0,
    whisk:0,
    mixer:0,
    spoon:0,
    tongs:0

};

//Spec objects,hold spec data
ribs = {

    dethawedRibs: 9,
    choppedCarrots: 5,
    choppedCelery: 5,
    choppedOnions: 5,
    bullseyeSauce: 16,
    water: 64,
    deepHotelPan:1,
    seramWrap:true,
    tinFoil:false

};

mushroomMix= {

    cremeniMushrooms:12,
    portebellow: 12,
    dicedOnions: 4,
    thyme: true,
    garlicInOil: 2,
    friedBacon: 30,
    jackDaniels: 1.5

};

bisonMeatloaf = {
    groundBeef: 32,
    groundBison: 32,
    chipotle: 3,
    eggs: 2,
    calabreseBread: 3,
    milk: 4,
    garlicInOil: 2,
    paprika: 0.5,
    bacon:17,
    burgerSpice:1,
    dicedCelery: 3,
    dicedCarrot: 3,
    dicedRedOnion: 3,
    butter: 2,
    parchmentPaper:1,
    tinFoil:true

};

chickenTaco = {
    chickenBreasts: 18,
    choppedOnion: 48,
    poblano:16,
    cilantro:1,
    chickenStock:24,
    chiliPowder: 1.5,
    tableSalt: 1.5,
    garlicInOil: 2,
    seramWrap: true,
    tinFoil:true,
    mediumHotelPan:1

};

mexiBeef = {
    groundBeef: 5,
    largePot: 1,
    garlicButter:2,
    tacoSeasoning: 10,
    water: 4

};

basmati = {
    basmatiRice: 32,
    shallowHotelPan:1,
    water:64,
    butter:2,
    salt:0.25

};

tarts = {
    tartCrust: 1,
    tartFilling: 1
};

cookies = {
    brownieMix: 1,
    cookieDough:24
};

eggRollMix = {
    cornRelish:40,
    shreddedJapHavarti:40,
    garlicPaste:2,
    grilledChx:8,
    sundriedTomatoes: 4,
    choppedRedOnions: 20,
    largeMetalBowl: 1,
    largestSquareInsert:1

};

chickenStock = {
    water: 128,
    chxStockBase: 1,
    largePot: 1
};

avacadoCornSalsa = {
    avacadoBag: 0.5,
    roastedCorn:24,
    dicedJaps:1,
    dicedTom:12,
    cilantro: 1,
    limeJuice:2,
    smallRectangleInsert: 1
};

tomatoSoup = {
    roastedRomas: 160,
    friedShreddedCarrot: 10,
    choppedOnions: 10,
    thyme: 0.5,
    garlicInOil: 2,
    chickenStock:100,
    cannedTomato:1,
    shreddedMozzarella: 12,
    gratedRomano:6,
    basil:1,
    largePot:1,
    largeMetalBowl: 1,
    oliveOil: 10
};

pomodoro = {
    choppedOnions: 8,
    garlicInOil:2,
    cannedTomato: 1,
    smallPot: 1,
    smallRectangleInsert:1
};

asianVeg = {
    choppedCarrots: 2,
    choppedBokChoy: 2,
    chopped: 2,
    choppedRedOnions: 1,
    choppedCelery: 1,
    snowPeas: 1,
    smallMetalBowl: 1

};

fajitaVeg= {
    juliennedGreenPepper: 2,
    juliennedRedPepper: 1,
    juliennedOnions:5,
    smallMetalBowl: 1

};

dayVeg = {
    choppedRedPepper:1,
    choppedButtonMushrooms: 1,
    greenBeans:2,
    smallMetalBowl: 1
};

calimari = {
    choppedCali: 7,
    butterMilk: 2,
    blackeningSpice: 0.25

};

bangShrimp = {
  shrimp: 7
};

tacoShrimp = {
    shrimp: 4
};

chickenRolls = {
    eggRollMix: 1,
    smallRectangleInsert:1
};

bisonBurgers = {
    burgerPatty: 8,
    mushroomMix: 16,
    groundBison: 1,
    largeMetalBowl:1
};


bangSauce = {
    mayonaise: 64,
    sweetChiliSauce: 48,
    sriracha: 8,
    riceVinegar: 8,
    spatula:1,
    largeRectangleInsert:1
};

demiGlaze = {
    water: 64,
    choppedButtonMushrooms: 2,
    blueberries: 2,
    choppedOnions: 2,
    demiGlazePowder: 8.8,
    smallMetalBowl: 1,
    smallPot:1
};

blackening = {
    paprika: 12,
    tableSalt: 11,
    granulatedOnion: 5,
    garlicPowder: 4,
    groundWhitePepper: 2.5,
    groundBlackPepper: 2.5,
    cayannePepper: 1.5,
    thyme: 0.8,
    oregano: 0.8
};

tartCrust = {
  butter: 40,
    flour: 60,
    koshurSalt: 2.5,
    sugar: 25,
    largeMetalBowl: 1
};

tartFilling = {
  brownSugar: 0,
    eggYolks: 0,
    liquidHoney: 0,
    cornSyrup: 0,
    butter: 0,
    vanillaExtract: 0,
    largeBowl: 2

};

bruschetta = {
    dicedTomato: 24,
    dicedRedOnion: 2,
    basil: 0.5,
    garlicInOil: 1,
    balsalmicVinegar: 0.5,
    oliveOil: 1.5,
    smallMetalBowl: 1,
    smallRectangleInsert: 1,
    salt: 0.3
};

cajunButter = {
    butter: 64,
    garlicInOil: 8,
    garlicPaste: 4,
    parsley: 0.5,
    blackeningSpice: 4,
    crushedChiliFlakes: 0.3,
    largeBowl: 1,
    mediumSquareInsert: 1
};

twoPcChx = {
  chickenBreasts: 1
};

fingers = {
    tenders: 1,
    butterMilk: 1,
    mediumRectangleInsert: 1
};

tenderPortions = {
    tenders: 4
};

chimi = {
    parsley: 4.5,
    cilantro: 4.5,
    garlicCloves: 12,
    lemonJuice: 3,
    redVinegar: 3,
    burgerSpice: 1,
    oliveOil: 12,
    mediumRectangleInsert: 1
};

citrusAioli = {
    mayonaise: 32,
    lemon: 1,
    garlicPaste: 2,
    groundBlackPepper: 1,
    mediumRectangleInsert: 1
};

coleslaw = {
    shreddedCabbage: 1,
    parsley: 2.5,
    mayonaise: 32,
    sugar: 6,
    horseradish: 2,
    ciderVinegar: 1.3,
    celerySeed: 0.3,
    largestRectangleInsert:1
};

garlicButter = {
    butter: 64,
    garlicInOil: 8,
    garlicPaste: 4,
    parsley: 0.5,
    largeBowl: 1,
    mediumSquareInsert: 1
};

guacamole = {
    avacadoBag: 2,
    dicedTomato: 12,
    garlicInOil: 2,
    cilantro: 1,
    limeJuice: 2,
    burgerSpice: 1,
    mediumRectangleInsert: 1,
    smallMetalBowl: 1
};

marinatedChx = {
    flattenedChx: 40,
    soySauce: 8,
    tacoSeasoning: 8,
    vegetableOil: 32,
    mediumRectangleInsert: 1,
    seramWrap: true
};

pico = {
  dicedTomato: 48,
    dicedRedOnion: 12,
    dicedJaps: 4,
    limeJuice: 2,
    cilantro: 1,
    tableSalt: 0.3,
    garlicInOil: 1,
    mediumSquareInsert: 1,
    smallMetalBowl: 1

};

pineappleSalsa = {
    pineapple: 12,
    dicedMango: 1,
    dicedRedPepper: 6,
    dicedjaps: 1,
    dicedRedOnion: 4,
    cilantro: 0.3,
    limeJuice: 2,
    mediumSquareInsert: 1,
    smallMetalBowl: 1
};

stirFrySauce = {
    chickenStock: 24,
    soySauce: 12,
    blackBeanSauce: 8,
    cookingSherry: 6,
    sugar: 2,
    chiliSauce: 2,
    choppedGinger: 2,
    sesameOil: 2,
    riceVinegar: 2,
    cornStarch: 2,
    smallSquareInsert: 1,
    seramWrap: true

};

threeCheese = {
  creamCheese: 1,
    sourCream: 64,
    choppedSpinach: 10,
    salsa: 2,
    tobasco: 0.5,
    groundBlackPepper: 1,
    shreddedMozzarella: 12,
    gratedRomano: 6,
    largestRectangleInsert: 1
};

pestoMayo = {
  mayonaise: 32,
    pesto: 2,
    mediumSquareInsert: 1
};

flats = {
  chickenBreasts: 1,
    deepHotelPan: 1
};

chipRanch = {
  paprika: 1,
    chipotlePepper: 5,
    ranchDressing: 1
};

//Array of spec names to iterate over and add event listeners to using loops.
prepListStrings = [
    'ribs', 'mushroomMix', 'meatLoaf', 'chickenTaco', 'mexiBeef', 'basmati', 'tarts', 'cookies', 'eggRollMix',
    'chickenStock', 'avacadoCornSalsa', 'tomatoSoup', 'pomodoro', 'mexiRice', 'asianVeg', 'fajitaVeg', 'dayVeg',
    'calamari', 'bangShrimp', 'tacoShrimp', 'salmon', 'chickenRolls', 'bisonBurgers', 'bigBangSauce', 'bisonDemiGlaze',
    'blackeningSpice', 'butterTartCrust', 'butterTartFilling', 'bruschetta', 'cajunButter', 'twoPcChx', 'fingers',
    'tenders', 'chimi', 'citrusAioli', 'coleslaw', 'garlicButter', 'guacamole', 'marinatedChx', 'pico',
    'pineappleSalsa', 'stirFrySauce', 'threeCheese', 'pestoMayo', 'flats', 'chipRanch', 'cilantroLime'];

window.prepPars = {
    ['ribs']: {
        ['Monday']: 5, ['Tuesday']: 6, ['Wednesday']: 6, ['Thursday']: 6, ['Friday']: 6,
        ['Saturday']: 7, ['Sunday']: 5, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['mushroomMix']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['meatLoaf']: {
        ['Monday']: 6, ['Tuesday']: 6, ['Wednesday']: 7, ['Thursday']: 8, ['Friday']: 10,
        ['Saturday']: 10, ['Sunday']: 5, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['chickenTaco']: {
        ['Monday']: 12, ['Tuesday']: 12, ['Wednesday']: 12, ['Thursday']: 15, ['Friday']: 17,
        ['Saturday']: 17, ['Sunday']: 12, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['mexiBeef']: {
        ['Monday']: 6, ['Tuesday']: 6, ['Wednesday']: 6, ['Thursday']: 7, ['Friday']: 8,
        ['Saturday']: 8, ['Sunday']: 5, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['basmati']: {
        ['Monday']: 7, ['Tuesday']: 8, ['Wednesday']: 8, ['Thursday']: 9, ['Friday']: 11,
        ['Saturday']: 11, ['Sunday']: 8, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['tarts']: {
        ['Monday']: 5, ['Tuesday']: 5, ['Wednesday']: 6, ['Thursday']: 6, ['Friday']: 6,
        ['Saturday']: 6, ['Sunday']: 6, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['cookies']: {
        ['Monday']: 16, ['Tuesday']: 16, ['Wednesday']: 16, ['Thursday']: 20, ['Friday']: 24,
        ['Saturday']: 24, ['Sunday']: 6, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['eggRollMix']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['chickenStock']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['chickenStock']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['avacadoCornSalsa']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['tomatoSoup']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['pomodoro']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['mexiRice']: {
        ['Monday']: 10, ['Tuesday']: 10, ['Wednesday']: 12, ['Thursday']: 14, ['Friday']: 15,
        ['Saturday']: 15, ['Sunday']: 9, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['fajitaVeg']: {
        ['Monday']: 7, ['Tuesday']: 7, ['Wednesday']: 8, ['Thursday']: 10, ['Friday']: 12,
        ['Saturday']: 12, ['Sunday']: 7, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['asianVeg']: {
        ['Monday']: 7, ['Tuesday']: 7, ['Wednesday']: 8, ['Thursday']: 10, ['Friday']: 12,
        ['Saturday']: 12, ['Sunday']: 7, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['dayVeg']: {
        ['Monday']: 7, ['Tuesday']: 7, ['Wednesday']: 8, ['Thursday']: 10, ['Friday']: 12,
        ['Saturday']: 12, ['Sunday']: 7, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['calamari']: {
        ['Monday']: 7, ['Tuesday']: 7, ['Wednesday']: 8, ['Thursday']: 10, ['Friday']: 12,
        ['Saturday']: 12, ['Sunday']: 7, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['bangShrimp']: {
        ['Monday']: 5, ['Tuesday']: 6, ['Wednesday']: 6, ['Thursday']: 7, ['Friday']: 7,
        ['Saturday']: 8, ['Sunday']: 5, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['tacoShrimp']: {
        ['Monday']: 5, ['Tuesday']: 6, ['Wednesday']: 6, ['Thursday']: 7, ['Friday']: 7,
        ['Saturday']: 8, ['Sunday']: 5, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['salmon']: {
        ['Monday']: 6, ['Tuesday']: 6, ['Wednesday']: 7, ['Thursday']: 8, ['Friday']: 8,
        ['Saturday']: 8, ['Sunday']: 5, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['chickenRolls']: {
        ['Monday']: 8, ['Tuesday']: 8, ['Wednesday']: 8, ['Thursday']: 9, ['Friday']: 11,
        ['Saturday']: 12, ['Sunday']: 7, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['chickenRolls']: {
        ['Monday']: 8, ['Tuesday']: 8, ['Wednesday']: 8, ['Thursday']: 9, ['Friday']: 11,
        ['Saturday']: 12, ['Sunday']: 7, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['bisonBurgers']: {
        ['Monday']: 8, ['Tuesday']: 8, ['Wednesday']: 8, ['Thursday']: 9, ['Friday']: 10,
        ['Saturday']: 10, ['Sunday']: 6, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['bigBangSauce']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['bisonDemiGlaze']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['blackeningSpice']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['butterTartCrust']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['butterTartFilling']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['bruschetta']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['cajunButter']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['garlicButter']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['twoPcChx']: {
        ['Monday']: 15, ['Tuesday']: 15, ['Wednesday']: 15, ['Thursday']: 20, ['Friday']: 20,
        ['Saturday']: 20, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['fingers']: {
        ['Monday']: 2, ['Tuesday']: 2, ['Wednesday']: 2, ['Thursday']: 2, ['Friday']: 3,
        ['Saturday']: 3, ['Sunday']: 2, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['tenders']: {
        ['Monday']: 5, ['Tuesday']: 5, ['Wednesday']: 6, ['Thursday']: 6, ['Friday']: 6,
        ['Saturday']: 7, ['Sunday']: 5, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['chimi']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['citrusAioli']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['coleslaw']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['guacamole']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['marinatedChx']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['pico']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['pineappleSalsa']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['stirFrySauce']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['threeCheese']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['pestoMayo']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['garlicAioli']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['flats']: {
        ['Monday']: 80, ['Tuesday']: 80, ['Wednesday']: 80, ['Thursday']: 80, ['Friday']: 100,
        ['Saturday']: 100, ['Sunday']: 80, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['chipRanch']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    },
    ['cilantroLime']: {
        ['Monday']: 1, ['Tuesday']: 1, ['Wednesday']: 1, ['Thursday']: 1, ['Friday']: 1,
        ['Saturday']: 1, ['Sunday']: 1, ['qty']: 0, ['qty2']: 0, ['par']: false
    }
};

var localScrollPos;
var countTitle = jC('#prepCountTitle').ret();

var openInputBox = function() {
    jC('#prepSelectors').hide();
    jC('#inputPanel').showElement();
    window.scrollTo(0,0);
};

var closeInputBox = function() {
    jC('#prepSelectors').showElement();
    jC('#inputPanel').hide();
    window.scrollTo(0,localScrollPos);
};

addInputEvents();
addListEvents();

function addInputEvents() {

    var resetInputs = function() {
        countBox.value = '';
        window.lastInputValue = [''];
    };

    //Hide / Show element events for the main interface.
    jC('#kitchenAreas, #walkInBtns, #inputPanel, #lineBtns, #prepDaySelect, #prepList').hide();

    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];

    var addDaySelectorEvents = function() {

            [].forEach.call(days, function (day) {
                jC('#prep' + day).click(function () {
                    preplist.currentDay = day;
                    jC('#prepDaySelect').hide();
                    jC('#kitchenAreas').showElement();
                });
            });
        }();

    jC('#newList').click(function() {
        jC('#mainMenuBtns').hide();
        jC('#prepDaySelect').showElement();
    });

    jC('#prevList').click(function() {
        jC('#mainMenuBtns').hide();
        retrievePrepListObjects();
    });

    jC('#prepDaySelectReturn').click(function() {
        jC('#mainMenuBtns').showElement();
        jC('#prepDaySelect').hide();
    });

    jC('#walkIn').click(function() {
        jC('#kitchenAreas').hide();
        jC('#walkInBtns').showElement();
        jC('#homeTitle').hide();
        preplist.currentArea = 'W';
    });

    jC('#line').click(function() {
        jC('#kitchenAreas').hide();
        jC('#lineBtns').showElement();
        jC('#homeTitle').hide();
        preplist.currentArea = 'L';
    });

    jC('.prepListReturn').click(function() {
        jC('#lineBtns, #prepList, #walkInBtns').hide();
        jC('#kitchenAreas').showElement();
        jC('#homeTitle').showElement();
        storePrepListObjects();

    });

    jC('#prepListDisplay').click(function() {
        jC('#kitchenAreas').hide();
        jC('#prepList').showElement();
        preplist.currentArea = 'P';
    });


    //Logic for adding user input numberpad event listeners and functionality
    var counter = 0;
    var countBox = jC('#prepCountBox').ret();
    window.lastInputValue = [''];

    for (var i = 0; i < 10; i++) {
        jC('#prepDigit' + counter).click(function() {
            if(countBox.value.length < 3){
                countBox.value += this.getAttribute('data-digit');
                window.lastInputValue.push(countBox.value);
            }
        });
        counter++;
    }

    jC('#prepDigitB').click(function() {
        if(window.lastInputValue.length > 1){
            countBox.value = window.lastInputValue[window.lastInputValue.length-2];
            window.lastInputValue.pop();
        }
    });

    jC('#prepDigitCal').click(function() {
        var indicator = jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').ret();
        preplist.calItems[preplist.currentlySelected] = true;
        jC('#' + preplist.currentlySelected + preplist.currentArea).addClass('CAL');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').addClass('CAL');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('prepCountedNeedMore');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCountedNeedMore');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('prepCountedNotNeeded');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('prepCounted');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCountedNotNeeded');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCounted');
        indicator.innerHTML = 'CAL';
        resetInputs();
        closeInputBox();
        console.info(preplist.itemsToAdd);
    });

    jC('#prepDigitSave').click(function() {

        //Get Quantity Button Element
        var indicator = jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').ret();

        var amount;

        //Check if nothing was input
        if (countBox.value == '') {
            amount = 0;
        }
        else {
            amount = countBox.value;
        }
        preplist.itemsToAdd[preplist.currentlySelected] = amount;

        //Add line count with walk-in count for total quantity


        //If in Walk-in interface
        if (preplist.currentArea == 'W') {

            //Set Walk-in quantity
            prepPars[preplist.currentlySelected]['qty'] = amount;
        }
        else if (preplist.currentArea == 'L') {
            prepPars[preplist.currentlySelected]['qty2'] = amount;
        }

        var totalQty = parseInt(prepPars[preplist.currentlySelected]['qty'])
            + parseInt(prepPars[preplist.currentlySelected]['qty2']);

        console.info(amount);
        console.info('QTY 1: ');
        console.info(prepPars[preplist.currentlySelected]['qty']);
        console.info('QTY 2: ');
        console.info(prepPars[preplist.currentlySelected]['qty2']);
        console.info('TOTAL QTY: ');
        console.info(totalQty);

        jC('#' + preplist.currentlySelected + 'L')
            .addClass(chooseClassColor(preplist.currentlySelected, totalQty));
        jC('#' + preplist.currentlySelected + 'LX')
            .addClass(chooseClassColor(preplist.currentlySelected, totalQty));
        jC('#' + preplist.currentlySelected + 'W')
            .addClass(chooseClassColor(preplist.currentlySelected, totalQty));
        jC('#' + preplist.currentlySelected + 'WX')
            .addClass(chooseClassColor(preplist.currentlySelected, totalQty));

        indicator.innerHTML = totalQty.toString();
        preplist.itemsToAdd[preplist.currentlySelected] = totalQty;

        resetInputs();
        closeInputBox();
        storePrepListObjects();
    });

    jC('#prepBtnCountNeed').click(function() {
        var indicator = jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').ret();
        var indicator2;
        preplist.calItems[preplist.currentlySelected] = true;
        jC('#' + preplist.currentlySelected + preplist.currentArea).addClass('prepCountedNeedMore');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').addClass('prepCountedNeedMore');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCountedNotNeeded');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('prepCountedNotNeeded');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCounted');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('prepCounted');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('CAL');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('CAL');
        if (preplist.currentArea == 'W') {
            jC('#' + preplist.currentlySelected + 'L').removeClass('CAL');
            jC('#' + preplist.currentlySelected + 'LX').removeClass('CAL');
            jC('#' + preplist.currentlySelected + 'L').addClass('prepCountedNeedMore');
            jC('#' + preplist.currentlySelected + 'LX').addClass('prepCountedNeedMore');
            jC('#' + preplist.currentlySelected + 'L').removeClass('prepCountedNotNeeded');
            jC('#' + preplist.currentlySelected + 'LX').removeClass('prepCountedNotNeeded');
            jC('#' + preplist.currentlySelected + 'L').removeClass('prepCounted');
            jC('#' + preplist.currentlySelected + 'LX').removeClass('prepCounted');
            indicator2 = jC('#' + preplist.currentlySelected + 'LX').ret();
        }
        else if (preplist.currentArea == 'L') {
            jC('#' + preplist.currentlySelected + 'W').removeClass('CAL');
            jC('#' + preplist.currentlySelected + 'WX').removeClass('CAL');
            jC('#' + preplist.currentlySelected + 'W').addClass('prepCountedNeedMore');
            jC('#' + preplist.currentlySelected + 'WX').addClass('prepCountedNeedMore');
            jC('#' + preplist.currentlySelected + 'W').removeClass('prepCountedNotNeeded');
            jC('#' + preplist.currentlySelected + 'WX').removeClass('prepCountedNotNeeded');
            jC('#' + preplist.currentlySelected + 'W').removeClass('prepCounted');
            jC('#' + preplist.currentlySelected + 'WX').removeClass('prepCounted');
            indicator2 = jC('#' + preplist.currentlySelected + 'WX').ret();
        }
        indicator.innerHTML = '<' + prepPars[preplist.currentlySelected][preplist.currentDay];
        indicator2.innerHTML = '<' + prepPars[preplist.currentlySelected][preplist.currentDay];
        resetInputs();
        closeInputBox();
        console.info(preplist.itemsToAdd);
    });
    jC('#prepBtnCountDontNeed').click(function() {
        var indicator = jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').ret();
        preplist.calItems[preplist.currentlySelected] = true;
        jC('#' + preplist.currentlySelected + preplist.currentArea).addClass('prepCounted');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').addClass('prepCounted');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCountedNotNeeded');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('prepCountedNotNeeded');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCountedNeedMore');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('prepCountedNeedMore');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('CAL');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('CAL');
        if (preplist.currentArea == 'W') {
            prepPars[preplist.currentlySelected]['qty'] = prepPars[preplist.currentlySelected][preplist.currentDay];
        }
        else if (preplist.currentArea == 'L') {
            prepPars[preplist.currentlySelected]['qty2'] = prepPars[preplist.currentlySelected][preplist.currentDay];
        }
        indicator.innerHTML = prepPars[preplist.currentlySelected][preplist.currentDay] + '+';
        resetInputs();
        closeInputBox();
        console.info(preplist.itemsToAdd);
    });


}

function addListEvents() {
    [].forEach.call(prepListStrings, function (specName) {

        if (jC('#' + specName + 'W').defined()) {
            jC('#' + specName + 'W').click(function() {
                localScrollPos = window.pageYOffset;
                preplist.currentlySelected = specName;
                countTitle.value = specName.toUpperCase();
                openInputBox(specName);
            });
        }
        else {
            console.info('Could not find ' + specName + 'W');
        }

        if (jC('#' + specName + 'WX').defined()) {
            jC('#' + specName + 'WX').click(function() {
                localScrollPos = window.pageYOffset;
                preplist.currentlySelected = specName;
                var qty = parseInt(prepPars[preplist.currentlySelected]['qty']) +
                    parseInt(prepPars[preplist.currentlySelected]['qty2']);
                this.innerHTML = qty;
                jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCounted');
                jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCountedNeedMore');
                jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('prepCounted');
                jC('#' + preplist.currentlySelected + preplist.currentArea + "X").removeClass('prepCountedNeedMore');
                jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('CAL');
                jC('#' + preplist.currentlySelected + preplist.currentArea + "X").removeClass('CAL');
                jC('#' + preplist.currentlySelected + preplist.currentArea)
                    .addClass(chooseClassColor(preplist.currentlySelected, qty));
                jC('#' + preplist.currentlySelected + preplist.currentArea + 'X')
                    .addClass(chooseClassColor(preplist.currentlySelected, qty));
                if (preplist.currentArea == 'W') {
                    prepPars[preplist.currentlySelected]['qty']
                        = prepPars[preplist.currentlySelected][preplist.currentDay];
                }
                else if (preplist.currentArea == 'L') {
                    prepPars[preplist.currentlySelected]['qty2']
                    = prepPars[preplist.currentlySelected][preplist.currentDay];
                }
                preplist.itemsToAdd[preplist.currentlySelected] = 'NULL';
                storePrepListObjects();
            });
        }
        else {
                console.info('Could not find ' + specName + 'WX');
        }

        if (jC('#' + specName + 'L').defined()) {
            jC('#' + specName + 'L').click(function() {
                localScrollPos = window.pageYOffset;
                preplist.currentlySelected = specName;
                countTitle.value = specName.toUpperCase();
                openInputBox(specName);
            });
        }
        else {
            console.info('Could not find ' + specName + 'L');
        }
        if (jC('#' + specName + 'LX').defined()) {
            jC('#' + specName + 'LX').click(function() {
                localScrollPos = window.pageYOffset;
                preplist.currentlySelected = specName;
                var qty = parseInt(prepPars[preplist.currentlySelected]['qty']) +
                    parseInt(prepPars[preplist.currentlySelected]['qty2']);
                this.innerHTML = qty;
                jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCounted');
                jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCountedNeedMore');
                jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('prepCounted');
                jC('#' + preplist.currentlySelected + preplist.currentArea + "X").removeClass('prepCountedNeedMore');
                jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('CAL');
                jC('#' + preplist.currentlySelected + preplist.currentArea + "X").removeClass('CAL');
                jC('#' + preplist.currentlySelected + preplist.currentArea)
                    .addClass(chooseClassColor(preplist.currentlySelected, qty));
                jC('#' + preplist.currentlySelected + preplist.currentArea + 'X')
                    .addClass(chooseClassColor(preplist.currentlySelected, qty));
                preplist.itemsToAdd[preplist.currentlySelected] = 'NULL';
                storePrepListObjects();
            });
        }




    });

}

function chooseClassColor(specName, quantity) {

    if(prepPars[specName][preplist.currentDay] > quantity) {
        var listItem = jC('#' + preplist.currentlySelected + 'PX').ret();
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('prepCountedNotNeeded');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('prepCounted');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCountedNotNeeded');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCounted');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('CAL');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('CAL');
        jC('#' + preplist.currentlySelected + 'P').showElement();
        jC('#' + preplist.currentlySelected + 'PX').showElement();
        listItem.innerHTML = parseInt(prepPars[specName][preplist.currentDay]) - parseInt(quantity);
        return 'prepCountedNeedMore';
    }
    else {
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('prepCountedNeedMore');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('prepCountedNeedMore');
        jC('#' + preplist.currentlySelected + preplist.currentArea + 'X').removeClass('CAL');
        jC('#' + preplist.currentlySelected + preplist.currentArea).removeClass('CAL');
        jC('#' + preplist.currentlySelected + 'P').hide();
        jC('#' + preplist.currentlySelected + 'PX').hide();
        return 'prepCounted';
    }




}

function storePrepListObjects() {
    // Put list objects into storage
    var content = jC('#pageContent').ret();
    localStorage.setItem('prepList', JSON.stringify(preplist));
    localStorage.setItem('prepPars', JSON.stringify(prepPars));
    localStorage.setItem('pageContent', JSON.stringify(content.innerHTML));
}

function retrievePrepListObjects() {

    var content = document.getElementById('pageContent');
    var contentString = jC.formatAjaxResponse(localStorage.getItem('pageContent'));
    content.innerHTML = contentString;
    var oldPrepList = JSON.parse(localStorage.getItem('prepList'));
    var oldPrepPars = JSON.parse(localStorage.getItem('prepPars'));

    //// Retrieve the object from storage

    window.prepList = oldPrepList;
    window.prepPars = oldPrepPars;


    if (document.getElementById('kitchenAreas') != null) {
        console.info('kitchen areas defined')
    }
    else {
        console.info('kitchen areas null')
    }

    addInputEvents();
    addListEvents();
    jC('#kitchenAreas').showElement();
}


