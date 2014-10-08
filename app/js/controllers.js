'use strict';

/* Controllers */

// Global because both controllers need to share it:
var scores = new Array();


angular.module('myApp.controllers', [])
  .controller('GameCtrl', ['$scope', function($scope) {
    $scope.letters = new Array(26);
    for (var i=0; i<26; ++i)
        $scope.letters[i] = String.fromCharCode(64+i);
    $scope.guesses = new Array();
    $scope.solution = "";
    $scope.message = "";
    $scope.lettersGuessed = new Array();
    $scope.playing = false;

    $scope.languages = [ "English", "Nederlands" ];
    $scope.language = $scope.languages[0];

    $scope.scores = scores;
    
    // uncomment if you need to test layout of the scores without having to guess a word:
    //$scope.scores.push({"word":"DOG", "nrTries": 5, "lang": "English"});

    var unsortedWords = new Array();
    unsortedWords[0] = [
        "ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN",
        "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "NINETEEN", "TWENTY",
        "HUNDRED", "THOUSAND", "MILLION", "BILLION", "TRILLION",
        "RED", "ORANGE", "PURPLE", "YELLOW", "BLUE", "GREEN", "WHITE", "BLACK", "GREY", "BROWN", "PINK",
        "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY", "TOMORROW", "YESTERDAY",
        "MORNING", "NOON", "AFTERNOON", "EVENING", "NIGHT", "BREAKFAST", "LUNCH", "DINNER",
        "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "SEMESTER", "YEAR", "CENTURY",
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST",
        "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
        "SEASON", "SPRING", "SUMMER", "AUTUM", "WINTER",
        "FRUIT", "APPLE", "PEAR", "BANANA", "LEMON", "BERRY", "BLUEBERRY", "RASPBERRY", "PINEAPPLE", "KIWI",
        "VEGETABLE", "CARROT", "TOMATO", "BROCCOLI", "PEA", "EGGPLANT", "SALAD", "CUCUMBER", "ONION", "SOY",
        "MEAT", "BREAD", "WATER", "ICE", "STEAM", "SODA", "JUICE", "WINE", "BEER", "WHISKY",
        "PROTEIN", "FAT", "VITAMIN", "MINERAL", "FIBRE", "SUGAR", "SALT", "SWEET", "SOUR", "BITTER",
        "VINEGAR", "COFFEE", "CHOCOLATE",
        "ANIMAL", "PLANT", "BACTERIA", "VIRUS", "MUSHROOM", "INSECT", "REPTILE", "SPIDER",
        "CAT", "DOG", "PIG", "BIRD", "HORSE", "COW", "CHICKEN", "DEER", "WHALE", "DOLPHIN", "MOUSE", "RAT",
        "FISH", "TIGER", "LION", "PUMA", "ELEPHANT", "APE", "MONKEY", "SNAKE", "FLY", "BEE", "WASP",
        "SCORPION", "BUTTERFLY", "WORM", "LIZARD", "DINOSAUR", "FOX", "WOLF",
        "EYE", "EAR", "HEAD", "LIP", "MOUTH", "NOSE", "CHEEK", "HAIR", "BEARD", "NECK", "ARM",
        "HAND", "FINGER", "THUMB", "ELBOW", "ARMPIT", "LEG", "KNEE", "FOOT", "TOE", "NAIL",
        "EYEBROW", "BACK", "BRAIN", "LUNG", "HEART", "STOMACH", "LIVER", "VEIN", "TOOTH", "TEETH",
        "CAR", "TRUCK", "PLANE", "BOAT", "BIKE", "BICYCLE", "BUS", "SUBWAY", "STEP",
        "WALK", "RUN", "SWIM", "DRIVE", "HIKE", "JUMP", "FALL",
        "AS", "AT", "IN", "IF", "IT", "IS", "BE", "GO", "TO", "DO", "SO", "NO", "YES", "UP", "DOWN", "ON", "OF",
        "OFF", "OR", "AND", "NOT", "NOR", "NEITHER", "LOW", "HIGH",
        "EARTH", "MOON", "LAND", "SEA", "RIVER", "LAKE", "MOUNTAIN", "HILL", "SUN", "STAR", "SKY", "COMET",
        "RAIN", "SNOW", "FOG", "WIND", "HOT", "COLD", "LUKEWARM",
        "MUSIC", "GUITAR", "PIANO", "VIOLIN", "CELLO", "TRUMPET", "HORN", "SAXOPHONE", "BASS", "DRUM",
        "SING", "SINGER", "PLAY", "RECORD", "VINYL", "TAPE", "CONCERT", "ORCHESTRA", "SYMPHONY", "SONG",
        "SERENADE", "PERFORMER", "CONDUCTOR", "MUSICIAN", "COMPOSER", "TENOR", "SOPRANO",
        "HOUSE", "ROOM", "DOOR", "KITCHEN", "BASEMENT", "ATTIC", "BEDROOM", "STAIRS", "CARPET", "LIGHT",
        "LAMP", "FLOOR", "CEILING", "WALL", "CHIMNEY", "ROOF", "WINDOW", "TOILET", "BATHROOM", "BATH",
        "TABLE", "CHAIR", "CLOSET", "CUPBOARD", "SOFA", "RADIO", "CURTAIN", "DRAPE", "SHEET",
        "KNIFE", "FORK", "SPOON", "PLATE", "GLASS", "BOTTLE", "KETTLE", "STOVE", "OVEN", "DESK", "DRAWER",
        "LAUNDRY", "KNOB", "HANDLE", "POWDER", "SOAP", "SHAMPOO", "COMB", "RAZOR", "KEY", "LOCK", "CLOCK",
        "METAL", "IRON", "GOLD", "COPPER", "SILVER", "BRONZE", "ALUMINUM", "LEAD", "WOOD", "PLASTIC", "PAPER",
        "CARDBOARD", "MATERIAL",
        "COMPUTER", "KEYBOARD", "SCREEN", "HARDDISK", "TABLET", "PHONE", "CELLPHONE", "MOBILE",
        "LAPTOP", "PRINTER", "CABLE", "WIRELESS", "BUTTON", "CLICK", "PRESS", "INSTALL",
        "FILE", "FOLDER", "DIRECTORY",
        "INTERNET", "WEBSITE", "MEDIA", "EMAIL", "CHAT", "GAME", "BLOG", "READER", "PROGRAM", "APP",
        "DOWNLOAD", "DOCUMENT", "LINK",
        "HAMMER", "SAW", "SCREW", "DRILL", "SCISSORS", "THUMBTACK", "NEEDLE", "THREAD", "STRING", "ROPE",
        "PEN", "PENCIL", "MARKER",
        "BUTCHER", "NURSE", "DOCTOR", "POLICE", "SALESMAN", "FIREMAN", "SURGEON", "BAKER", "AGENT",
        "FARMER", "COWBOY", "TEACHER", "STUDENT", "CLIENT", "CUSTOMER", "PATIENT", "THIEF", "CRIMINAL",
        "COOK", "WAITER", "WAITRESS", "BARTENDER", "WRITER", "AUTHOR", "ACTOR", "ACTRESS", "PRODUCER", "DIRECTOR",
        "MAYOR", "PRESIDENT", "LAWYER", "SOLDIER", "GENERAL", "CORPORAL", "ADMIRAL", "CAPTAIN", "OFFICER",
        "COLONEL", "MARSHAL", "COMMODORE", "COMMANDER", "LEADER", "SQUADRON", "SERGEANT", "MILITARY", "ARMY",
        "ROBBER", "CLEANER", "JANITOR", "PROFESSOR", "PRIEST", "BISHOP", "PROPHET",
        "GHOST", "GOD", "GODDESS", "DIVINE", "DEMON", "DAEMON", "FIEND", "DEVIL", "VAMPIRE", "ZOMBIE", "WEREWOLF", "VISION",
        "SIN", "SAINT", "HELL", "HEAVEN", "CURSE", "WITCH", "MAGIC", "BIBLE", "RITUAL", "RELIGION", "RELIGIOUS", "OCCULT", "MYTH",
        "ANGEL", "ATHEIST", "ATHEISM", "MYTHOLOGY", "SPIRIT", "SPIRITUAL", "GHOUL", "HOLY", "SATANISM", "FAITH", "MYTHIC",
        "CHRISTMAS", "EASTER"
    ];

    unsortedWords[1] = [
        "NUL", "EEN", "TWEE", "DRIE", "VIER", "VIJF", "ZES", "ZEVEN", "ACHT", "NEGEN", "TIEN",
        "ELF", "TWAALF", "DERTIEN", "VEERTIEN", "VIJFTIEN", "ZESTIEN", "ZEVENTIEN", "ACHTTIEN", "NEGENTIEN", "TWINTIG",
        "HONDERD", "DUIZEND", "MILJOEN", "MILJARD", "BILJOEN",
        "ROOD", "ORANJE", "PURPER", "PAARS", "GEEL", "BLAU>", "GROEN", "WIT", "ZWART", "GRIJS", "BRUIN", "ROZE",
        "MAANDAG", "DINSDAG", "WOENSDAG", "DONDERDAG", "VRIJDAG", "ZATERDAG", "ZONDAG", "MORGEN", "GISTEREN",
        "OCHTEND", "MIDDAG", "NAMIDDAG", "AVOND", "NACHT", "ONTBIJT", "LUNCH", "DINER",
        "SECONDE", "MINUUT", "UUR", "DAG", "WEEK", "MAAND", "SEMESTER", "JAAR", "EEUW",
        "JANUARI", "FEBRUARI", "MAART", "APRIL", "MEI", "JUNI", "JULI", "AUGUSTUS",
        "SEPTEMBER", "OKTOBER", "NOVEMBER", "DECEMBER",
        "SEIZOEN", "LENTE", "ZOMER", "HERFST", "WINTER",
        "FRUIT", "APPEL", "PEER", "BANAAN", "CITROEN", "BES", "FRAMBOOS", "ANANAS", "KIWI", "AARDBEI", "BRAAMBES",
        "GROENTE", "WORTEL", "TOMAAT", "BROCCOLI", "ERWT", "BOON", "AUBERGINE", "SALADE", "SLA", "KOMKOMMER", "UI", "AJUIN", "SOJA",
        "VLEES", "BROOD", "WATER", "IJS", "STOOM", "FRISDRANK", "SAP", "FRUITSAP", "WIJN", "BIER", "WHISKY",
        "PROTEINE", "VET", "VITAMINE", "MINERAAL", "VEZEL", "SUIKER", "ZOUT", "ZOET", "ZUUR", "BITTER",
        "AZIJN", "KOFFIE", "CHOCOLADE",
        "DIER", "PLANT", "BACTERIE", "VIRUS", "INSECT", "REPTIEL", "SPIN",
        "KAT", "HOND", "VARKEN", "VOGEL", "PAARD", "KOE", "KIP", "HERT", "WALVIS", "DOLFIJN", "MUIS", "RAT",
        "VIS", "TIJGER", "LEEUW", "POEMA", "OLIFANT", "AAP", "SLANG", "VLIEG", "BIJ", "WESP",
        "SCHORPIOEN", "VLINDER", "WORM", "HAGEDIS", "DINOSAURUS", "VOS", "WOLF",
        "OOG", "OOR", "HOOFD", "LIP", "MOND", "NEUS", "KAAK", "WANG", "HAAR", "BAARD", "NEK", "HALS", "ARM",
        "HAND", "VINGER", "DUIM", "ELLEBOOG", "OKSEL", "BEEN", "KNIE", "VOET", "TEEN", "NAGEL",
        "WENKBRAUW", "RUG", "BREIN", "HERSENEN", "LONG", "HART", "MAAG", "LEVER", "ADER", "TAND",
        "AUTO", "VLIEGTUIG", "BOOT", "FIETS", "BROMFIETS", "MOTOR", "BUS", "METRO", "STEP",
        "WANDELEN", "LOPEN", "ZWEMMEN", "RIJDEN", "LIFTEN", "SPRINGEN", "VALLEN",
        "ALS", "AAN", "IN", "HET", "ZIJN", "GAAN", "NAAR", "DOEN", "ZO", "NEE", "NEEN", "JA", "OP", "NEER", "AF",
        "WEG", "OF", "EN", "NIET", "NOCH", "LAAG", "HOOG",
        "AARDE", "MAAN", "LAND", "ZEE", "RIVIER", "MEER", "BERG", "HEUVEL", "ZON", "STER", "HEMEL", "KOMEET",
        "REGEN", "SNEEUW", "MIST", "WIND", "HEET", "KOUD", "WARM", "LAUW",
        "MUZIEK", "GITAAR", "PIANO", "VIOOL", "CELLO", "TROMPET", "HOORN", "SAXOFOON", "BAS", "DRUM",
        "ZINGEN", "ZANGER", "SPELEN", "PLAAT", "VINYL", "CASSETTE", "BAND", "CONCERT", "ORKEST", "SYMFONIE", "LIED",
        "SERENADE", "DIRIGENT", "MUZIKANT", "COMPONIST", "TENOR", "SOPRAAN",
        "HUIS", "KAMER", "DEUR", "KEUKEN", "KELDER", "ZOLDER", "SLAAPKAMER", "TRAP", "TAPIJT", "LICHT",
        "LAMP", "VLOER", "PLAFOND", "MUUR", "SCHOORSTEEN", "DAK", "VENSTER", "RAAM", "TOILET", "BADKAMER", "BAD",
        "TAFEL", "STOEL", "CUPBOARD", "SOFA", "ZETEL", "RADIO", "GORDIJN", "LAKEN",
        "MES", "VORK", "LEPEL", "BORD", "GLAS", "FLES", "KETEL", "STOOF", "OVEN", "BUREAU", "SCHUIF",
        "WAS", "KLINK", "KNOP", "POEDER", "ZEEP", "SHAMPOO", "KAM", "SCHEERMES", "SLEUTEL", "SLOT", "KLOK",
        "METAAL", "IJZER", "GOUD", "KOPER", "ZILVER", "BRONS", "ALUMINIUM", "LOOD", "HOUT", "PLASTIC", "PAPIER",
        "KARTON", "MATERIAAL",
        "COMPUTER", "SCHERM", "HARDDISK", "TABLET", "TELEFOON", "MOBIEL",
        "LAPTOP", "PRINTER", "KABEL", "DRAADLOOS", "KLIK", "INSTALLEREN",
        "BESTAND", "FOLDER",
        "INTERNET", "WEBSITE", "MEDIA", "EMAIL", "CHAT", "SPEL", "BLOG", "LEZER", "PROGRAMMA", "APP",
        "DOWNLOADEN", "DOCUMENT", "LINK",
        "HAMER", "ZAAG", "SCHROEF", "BOOR", "SCHAAR", "DUIMSPIJKER", "NAALD", "DRAAD", "TOUW",
        "PEN", "POTLOOD", "STIFT",
        "SLAGER", "DOKTER", "POLITIE", "VERKOPER", "BRANDWEER", "CHIRURG", "BAKKER", "AGENT",
        "BOER", "COWBOY", "LERAAR", "MEESTER", "JUFFROUW", "STUDENT", "KLIENT", "KLANT", "PATIENT", "DIEF", "CRIMINEEL",
        "KOK", "OBER", "BARMAN", "SCHRIJVER", "AUTEUR", "ACTEUR", "ACTRICE", "PRODUCER", "REGISSEUR",
        "PRESIDENT", "ADVOCAAT", "SOLDAAT", "GENERAAL", "KORPORAAL", "ADMIRAAL", "KAPITEIN", "OFFICIER",
        "KOLONEL", "MAARSCHALK", "COMMANDANT", "LEIDER", "TROEP", "SERGEANT", "MILITAIR", "LEGER",
        "OVERVALLER", "KUISVROUW", "CONCIERGE", "PROFESSOR", "PRIESTER", "BISSCHOP", "PROFEET",
        "GEEST", "GOD", "GODIN", "GODDELIJK", "DUIVEL", "VAMPIER", "ZOMBIE", "WEERWOLF", "VISIOEN",
        "ZONDE", "HEILIG", "HEL", "HEMEL", "VLOEK", "HEKS", "MAGIE", "BIJBEL", "RITUEEL", "RELIGIE", "RELIGIEUS", "OCCULT", "MYTHE",
        "ENGEL", "ATHEIST", "ATHEISME", "MYTHOLOGIE", "SPIRITUEEL", "HEILIG", "SATANISME", "GELOOF", "MYTHISCH",
        "KERSTMIS", "PASEN"
    ];

    $scope.words = new Array();

    var sortWords = function(unsortedWords) {
        var words = new Array();
        for (var i=0; i<unsortedWords.length; ++i) {
            var word = unsortedWords[i];
            var length = word.length;
            while (words.length-1<length)
                words.push(new Array());
            words[length].push(word);
        }
        return words;
    };

    for (var i=0; i<unsortedWords.length; ++i) {
        $scope.words[i] = sortWords(unsortedWords[i]);
    }

    $scope.usedWords = new Array();
    for (var lang=0; lang<$scope.words.length; ++lang) {
        var usedWordsOfALanguage = new Array();
        for (var i=0; i<$scope.words[lang].length; ++i) {
            usedWordsOfALanguage.push(new Array());
        }
        $scope.usedWords.push(usedWordsOfALanguage);
    }

    $scope.start = function() {
        var langIdx = $scope.languages.indexOf($scope.language);
        var wordsOfChosenLanguage = $scope.words[langIdx];

        var minLength = 0;
        for (var i=0; i<wordsOfChosenLanguage.length; ++i) {
            if (wordsOfChosenLanguage[i].length>0) {
                minLength = i;
                break;
            }            
        }
        var maxLength = wordsOfChosenLanguage.length-1;

        var wordLength = parseInt($scope.nrLetters, 10);
        $scope.solution = "";
        if (wordLength<minLength) {
            $scope.message = "minimum length is "+minLength;
            return;
        }
        if (wordLength>maxLength) {
            $scope.message = "maximum length is "+maxLength;
            return;
        }

        if (wordsOfChosenLanguage[wordLength].length===0) {
            wordsOfChosenLanguage[wordLength] = $scope.usedWords[langIdx][wordLength];
            $scope.usedWords[langIdx][wordLength] = new Array();
        }
        var wordsOfChosenLength = wordsOfChosenLanguage[wordLength];
        var nrWords = wordsOfChosenLength.length;
        var wordIdx = Math.floor(Math.random()*nrWords);
        $scope.solution = wordsOfChosenLength[wordIdx];
        wordsOfChosenLength.splice(wordIdx, 1);
        $scope.usedWords[langIdx][wordLength].push($scope.solution);

        $scope.guesses = new Array(wordLength);
        for (var i=0; i<wordLength; ++i)
            $scope.guesses[i] = { letter: "." };
        $scope.lettersGuessed = new Array();
        $scope.message = "";
        $scope.playing = true;
    };

    $scope.guess = function() {
        var guessedLetter = $scope.guessedLetter.toUpperCase();
        $scope.guessedLetter = "";
        if (guessedLetter<'A' || guessedLetter>'Z') {
            $scope.message = "Please enter a letter";
            return;
        }
        for (var i=0; i<$scope.lettersGuessed.length; ++i) {
            if ($scope.lettersGuessed[i]===guessedLetter) {
                $scope.message = "This letter was already tried";
                return;
            }
        }
        $scope.lettersGuessed.push(guessedLetter);
        var complete = true;
        for (var i=0; i<$scope.solution.length; ++i) {
            if ($scope.solution[i]===guessedLetter)
                $scope.guesses[i].letter = guessedLetter;
            if ($scope.guesses[i].letter==='.')
                complete = false;
        }
        if (complete) {
            $scope.playing = false;
            var nrTries = $scope.lettersGuessed.length;
            $scope.message = "You found it in "+nrTries+" tries!";
            $scope.scores.push({"word":$scope.solution, "nrTries": nrTries, "lang": $scope.language});
        } else {
            $scope.message = "";
        }
    };

    $scope.stop = function() {
        $scope.playing = false;
        $scope.message = "The word was "+$scope.solution;
    };
  }])
  .controller('ScoresCtrl', ['$scope', function($scope) {
    $scope.scores = scores;
  }]);
