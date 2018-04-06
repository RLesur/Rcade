var matchingGame = matchingGame || {};
matchingGame.version = "2.0";
matchingGame.layoutTurtle = "turtle";
matchingGame.layoutFlower = "flower";
matchingGame.layoutSpider = "spider";
matchingGame.layoutCloud = "cloud";
matchingGame.layoutBug = "bug";
matchingGame.layoutFourHills = "fourHills";

matchingGame.deck = [
    'cardZahl1', 'cardZahl1', 'cardZahl1', 'cardZahl1',
    'cardZahl2', 'cardZahl2', 'cardZahl2', 'cardZahl2',
    'cardZahl3', 'cardZahl3', 'cardZahl3', 'cardZahl3',
    'cardZahl4', 'cardZahl4', 'cardZahl4', 'cardZahl4',
    'cardZahl5', 'cardZahl5', 'cardZahl5', 'cardZahl5',
    'cardZahl6', 'cardZahl6', 'cardZahl6', 'cardZahl6',
    'cardZahl7', 'cardZahl7', 'cardZahl7', 'cardZahl7',
    'cardZahl8', 'cardZahl8', 'cardZahl8', 'cardZahl8',
    'cardZahl9', 'cardZahl9', 'cardZahl9', 'cardZahl9',
    'cardBambus1', 'cardBambus1', 'cardBambus1', 'cardBambus1',
    'cardBambus2', 'cardBambus2', 'cardBambus2', 'cardBambus2',
    'cardBambus3', 'cardBambus3', 'cardBambus3', 'cardBambus3',
    'cardBambus4', 'cardBambus4', 'cardBambus4', 'cardBambus4',
    'cardBambus5', 'cardBambus5', 'cardBambus5', 'cardBambus5',
    'cardBambus6', 'cardBambus6', 'cardBambus6', 'cardBambus6',
    'cardBambus7', 'cardBambus7', 'cardBambus7', 'cardBambus7',
    'cardBambus8', 'cardBambus8', 'cardBambus8', 'cardBambus8',
    'cardBambus9', 'cardBambus9', 'cardBambus9', 'cardBambus9',
    'cardMuenze1', 'cardMuenze1', 'cardMuenze1', 'cardMuenze1',
    'cardMuenze2', 'cardMuenze2', 'cardMuenze2', 'cardMuenze2',
    'cardMuenze3', 'cardMuenze3', 'cardMuenze3', 'cardMuenze3',
    'cardMuenze4', 'cardMuenze4', 'cardMuenze4', 'cardMuenze4',
    'cardMuenze5', 'cardMuenze5', 'cardMuenze5', 'cardMuenze5',
    'cardMuenze6', 'cardMuenze6', 'cardMuenze6', 'cardMuenze6',
    'cardMuenze7', 'cardMuenze7', 'cardMuenze7', 'cardMuenze7',
    'cardMuenze8', 'cardMuenze8', 'cardMuenze8', 'cardMuenze8',
    'cardMuenze9', 'cardMuenze9', 'cardMuenze9', 'cardMuenze9',
    'cardNordwind', 'cardNordwind', 'cardNordwind', 'cardNordwind',
    'cardSuedwind', 'cardSuedwind', 'cardSuedwind', 'cardSuedwind',
    'cardOstwind', 'cardOstwind', 'cardOstwind', 'cardOstwind',
    'cardWestwind', 'cardWestwind', 'cardWestwind', 'cardWestwind',
    'cardDracheGruen', 'cardDracheGruen', 'cardDracheGruen', 'cardDracheGruen',
    'cardDracheRot', 'cardDracheRot', 'cardDracheRot', 'cardDracheRot',
    'cardDracheWeiss', 'cardDracheWeiss', 'cardDracheWeiss', 'cardDracheWeiss',
    'cardFruehling', 'cardSommer', 'cardHerbst', 'cardWinter',
    'cardBambus', 'cardPflaume', 'cardOrchidee', 'cardChrysantheme'
];

matchingGame.undoList = [];

matchingGame.selectableCards = {};

matchingGame.matchingCards = {};

matchingGame.elapsedSeconds = 0;
matchingGame.timer = null;
matchingGame.undoUsed;
matchingGame.hintsUsed = false;
matchingGame.gameEnded;
matchingGame.points;

//matchingGame.gameScreenShown = false;

matchingGame.resolution = null;

if (cordovaUsed()) {
// This is the event that fires when Cordova is fully loaded
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
// This is the event that then the browser window is loaded
    window.onload = onDeviceReady;
}

matchingGame.theme = 0;

matchingGame.themes = ["fruits", "classic", "highvisibility"];
matchingGame.resolution = null;

matchingGame.resolutions = {
    verysmallscreen: {borderWidthRight: 2,
        borderWidthBelow: 2,
        cardWidth: 38,
        cardHeight: 48,
        shiftValue: 2},
    smallscreen: {borderWidthRight: 3,
        borderWidthBelow: 3,
        cardWidth: 45,
        cardHeight: 59,
        shiftValue: 3},
    bigscreen: {borderWidthRight: 8,
        borderWidthBelow: 7,
        cardWidth: 79,
        cardHeight: 99,
        shiftValue: 4},
    verybigscreen: {borderWidthRight: 12,
        borderWidthBelow: 11,
        cardWidth: 113,
        cardHeight: 140,
        shiftValue: 4}
};

function registerMediaQueryListListener() {

    var verybigScreenMediaQueryList = window.matchMedia("(min-width:1600px) and (min-height:1100px)");
    var bigScreenMediaQueryList = window.matchMedia("(min-width: 1130px) and (max-width:1599px) and (min-height:780px),(min-height:780px) and (max-height:1129px) and (min-width:1130px)");
    var smallScreenMediaQueryList = window.matchMedia("(min-width:640px) and (max-width:1129px) and (min-height:460px),(min-height:460px) and (max-height:779px) and (min-width:640px)");
    var verysmallScreenMediaQueryList = window.matchMedia("(max-height:459px), (max-width:639px)");

    checkAndSetResolution();

// Listen for orientation changes
    window.addEventListener("orientationchange", function () {
        checkAndSetResolution();
        redrawGame();
    }, false);

    verybigScreenMediaQueryList.addListener(function (mediaquerylist) {
        if (mediaquerylist.matches) {
            matchingGame.resolution = matchingGame.resolutions.verybigscreen;
            redrawGame();
        }
    });

    bigScreenMediaQueryList.addListener(function (mediaquerylist) {
        if (mediaquerylist.matches) {
            matchingGame.resolution = matchingGame.resolutions.bigscreen;
            redrawGame();
        }
    });

    smallScreenMediaQueryList.addListener(function (mediaquerylist) {
        if (mediaquerylist.matches) {
            matchingGame.resolution = matchingGame.resolutions.smallscreen;
            redrawGame();
        }
    });

    verysmallScreenMediaQueryList.addListener(function (mediaquerylist) {
        if (mediaquerylist.matches) {
            matchingGame.resolution = matchingGame.resolutions.verysmallscreen;
            redrawGame();
        }
    });


    function checkAndSetResolution() {
        if (verybigScreenMediaQueryList.matches) {
            matchingGame.resolution = matchingGame.resolutions.verybigscreen;
        }
        if (bigScreenMediaQueryList.matches) {
            matchingGame.resolution = matchingGame.resolutions.bigscreen;
        }

        if (smallScreenMediaQueryList.matches) {
            matchingGame.resolution = matchingGame.resolutions.smallscreen;
        }
        if (verysmallScreenMediaQueryList.matches) {
            matchingGame.resolution = matchingGame.resolutions.verysmallscreen;
        }
    }
}
/**
 * Entry point to the app. It initializes the Ubuntu SDK HTML5 theme
 * and connects events to handlers
 */
function onDeviceReady() {

//    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
//    }
    var router = sparouter.init(function () {
        return "start";
    }).onpage("game", function (event) {
        if (event.options === "turtle") {
            $("#cards").attr("data-layout", matchingGame.layoutTurtle);
            loadBoardData(matchingGame.turtle);
        }
        if (event.options === "flower") {
            $("#cards").attr("data-layout", matchingGame.layoutFlower);
            loadBoardData(matchingGame.flower);
        }
        if (event.options === "spider") {
            $("#cards").attr("data-layout", matchingGame.layoutSpider);
            loadBoardData(matchingGame.spider);
        }
        if (event.options === "cloud") {
            $("#cards").attr("data-layout", matchingGame.layoutCloud);
            loadBoardData(matchingGame.cloud);
        }
        if (event.options === "bug") {
            $("#cards").attr("data-layout", matchingGame.layoutBug);
            loadBoardData(matchingGame.bug);
        }
        if (event.options === "fourHills") {
            $("#cards").attr("data-layout", matchingGame.layoutFourHills);
            loadBoardData(matchingGame.fourHills);
        }

        if (event.options === "resumeGame")
            resumeTimer();
        else if (event.options === "resumeFinishedGame")
            // do noting
            ;
        else
            startNewGame();

        router.allPagesInvisible();
        router.page("game").style.display = "table";
    }).onpage("menu", function () {
        stopTimer();
        router.hidePage("gamestatistics");
        router.hidePage("about");
        router.showPage("menu");
    }).onpage("about", function () {
        router.showPage("about");
    }).onpage("gamestatistics", function (event) {
        showStatisticsInPauseScreen();
        router.showPage("gamestatistics");
    }).onpage("gamestatisticswin", function (event) {
        showStatisticsInPauseScreen();
        return "gamestatisticswin";
    }).onpage("gamestatisticslose", function (event) {
        showStatisticsInPauseScreen();
        return "gamestatisticslose";
    }).onpage("start", function (event) {
        hideMessages();
        hideGameButtons();
        if (event.options === "startNewGame") {
            stopTimer();
            if (!matchingGame.gameEnded) {
                calculatePoints();
            }
        }
        return "start";
    });
    router.start();

    function loadBoardData(board) {
        matchingGame.positionX = board.positionX;
        matchingGame.positionY = board.positionY;
        matchingGame.shift = board.shift;
        matchingGame.selectable = board.selectable;
    }

    var version = localStorage.getItem("version");
    if (version !== matchingGame.version) {
        localStorage.setItem("version", matchingGame.version);
    }

    var theme = localStorage.getItem("theme");
    if (theme) {
        matchingGame.theme = parseInt(theme);
        changeTheme(matchingGame.theme);
    } else {
        matchingGame.theme = 0;
        changeTheme(matchingGame.theme);
    }

    matchingGame.gameState = "startScreen";
    $('#pauseButton').fastClick(function (e) {
        e.stopImmediatePropagation();
        stopTimer();
        $("#pauseScreen").show();
    });

    $('#undoButton').fastClick(function (e) {
        e.stopImmediatePropagation();
        hideMessages();
        resumeTimer();
        undo();
    });
    $('#themeButton').fastClick(function (e) {
        e.stopImmediatePropagation();
        changeTheme();
    });
    $("#activateHints").fastClick(function (e) {
        e.stopImmediatePropagation();
        $("body").toggleClass("hint-on");
        updateHintsUsed();
    });

//    $("#gameScene").hide();

    registerMediaQueryListListener();
}

function hideGameButtons() {
    $("div.game-buttons").hide();
}

function redrawGame() {
    matchingGame.cardWidth = matchingGame.resolution.cardWidth;
    matchingGame.cardWidthWithoutBorder = matchingGame.cardWidth - matchingGame.resolution.borderWidthRight;
//    matchingGame.cardHeight = parseInt($(".card").css('height'));
    matchingGame.cardHeight = matchingGame.resolution.cardHeight;
    matchingGame.cardHeightWithoutBorder = matchingGame.cardHeight - matchingGame.resolution.borderWidthBelow;
    var zIndexBase = 8;

    var positionXShadow;
    var positionYShadow;
    var zIndexShadow;

    var shadowShift = matchingGame.cardWidthWithoutBorder / 8;
    $(".card").each(function (index) {

        var positionX = matchingGame.cardWidthWithoutBorder * (matchingGame.positionX[index] - 1) - getShiftValueX(matchingGame.shift[index]);
        var positionY = (matchingGame.cardHeightWithoutBorder + matchingGame.cardHeightWithoutBorder * (matchingGame.positionY[index] - 1)) - getShiftValueY(matchingGame.shift[index]);
        var zIndex = zIndexBase + matchingGame.shift[index];

        $(this).css({
            "left": positionX,
            "top": positionY,
            "z-index": zIndex
        });

        positionXShadow = positionX - shadowShift;
        positionYShadow = positionY - shadowShift;
        zIndexShadow = zIndex - 1;

        $(".shadow").eq(index).css({
            "left": positionXShadow,
            "top": positionYShadow,
            "z-index": zIndexShadow
        });
    });

    setSpriteImageForTiles();
}
function startGame() {
    $("div.game-buttons").show();
    startTimer();
    resetPoints();
    initHintsUsed();
    matchingGame.gameEnded = false;
    matchingGame.undoUsed = false;

    shuffleCards();

    var numberOfCards = matchingGame.deck.length;
    matchingGame.cardWidth = matchingGame.resolution.cardWidth;
    matchingGame.cardWidthWithoutBorder = matchingGame.cardWidth - matchingGame.resolution.borderWidthRight;
    matchingGame.cardHeight = matchingGame.resolution.cardHeight;
    matchingGame.cardHeightWithoutBorder = matchingGame.cardHeight - matchingGame.resolution.borderWidthBelow;
    var zIndexBase = 8;

    for (var i = 0; i < (numberOfCards - 1); i++) {
        $("#cards").append('<div class="card"></div>');
        $("#cards").append('<div class="shadow"></div>');
    }


    var thirdDate = new Date();

    var positionX;
    var cardPositionX;
    var positionY;
    var cardPositionY;
    var shift;
    var cardZIndex;
    var selectable;
    var positionXShadow;
    var positionYShadow;
    var zIndexShadow;
    var pattern;
    var shadowShift = matchingGame.cardWidthWithoutBorder / 7;
    $(".card").each(function (index) {

        shift = matchingGame.shift[index];
        positionX = matchingGame.positionX[index];
        positionY = matchingGame.positionY[index];
        selectable = matchingGame.selectable[index];
        cardPositionX = matchingGame.cardWidthWithoutBorder * (positionX - 1) - getShiftValueX(shift);
        cardPositionY = (matchingGame.cardHeightWithoutBorder + matchingGame.cardHeightWithoutBorder * (positionY - 1)) - getShiftValueY(shift);
        cardZIndex = zIndexBase + shift;

        positionXShadow = cardPositionX - shadowShift;
        positionYShadow = cardPositionY - shadowShift;
        zIndexShadow = cardZIndex - 1;

        $(this).css({
            "left": cardPositionX,
            "top": cardPositionY,
            "z-index": cardZIndex
        });

        $(".shadow").eq(index).css({
            "left": positionXShadow,
            "top": positionYShadow,
            "z-index": zIndexShadow
        });

        pattern = matchingGame.deck[index];
        $(this).addClass(pattern);
        pattern = getCardPattern(pattern);
//        console.log("pattern: " + pattern);
        $(this).attr("data-pattern", pattern);
        $(this).attr("data-position-x", positionX);
        $(this).attr("data-position-y", positionY);
        $(this).attr("data-shift", shift);
        $(this).attr("data-selectable", selectable);
        $(this).fastClick(selectCard);
    });

    initMatchingCards();

    var fourthDate = new Date();
    console.log("time for painting position and shadow: " + (fourthDate - thirdDate));
    setSpriteImageForTiles();
}

function initMatchingCards() {

    var selectable;
    var pattern;
    var selectableCardsByPattern = [];

    matchingGame.selectableCards = {};
    matchingGame.matchingCards = {};

    $(".card").each(function () {
        selectable = $(this).data("selectable");
        if (selectable) {
            pattern = $(this).data("pattern");
            if (matchingGame.selectableCards[pattern] !== undefined) {
                selectableCardsByPattern = matchingGame.selectableCards[pattern];
                selectableCardsByPattern.push($(this));
            } else {
                selectableCardsByPattern = [$(this)];
                matchingGame.selectableCards[pattern] = selectableCardsByPattern;
            }
        }
    });

    updateMatchingCards();
}

function getNumberOfOverlappingCards(positionX, positionY, shift) {
    var overlappingCards = $(".card[data-position-x=" + positionX + "][data-position-y=" + positionY + "]");
    overlappingCards = overlappingCards.filter(function () {
        return (parseInt($(this).data("shift")) > shift);
    });

    return overlappingCards.length;
}

function getExistBlockingNeighbours(positionX, positionY, shift) {
    var positionXOfNeighbour;

    var blockingNeighboursWithSamePositionY = $(".card[data-position-y=" + positionY + "][data-shift=" + shift + "]");
    blockingNeighboursWithSamePositionY = blockingNeighboursWithSamePositionY.filter(function () {
        positionXOfNeighbour = $(this).data("position-x");
        return (positionXOfNeighbour < positionX || positionXOfNeighbour > positionX);
    });
    if (blockingNeighboursWithSamePositionY.length > 0) {
        return true;
    }

    return false;
}

function getCardPattern(cardName) {

    var cardJahreszeiten = ["cardFruehling", "cardSommer", "cardHerbst", "cardWinter"];
    var cardBlumen = ["cardBambus", "cardPflaume", "cardOrchidee", "cardChrysantheme"];

    if (cardJahreszeiten.indexOf(cardName) >= 0) {
        return "cardJahreszeiten";
    } else if (cardBlumen.indexOf(cardName) >= 0) {
        return "cardBlumen";
    }

    return cardName;
}

function shuffleCards() {
    matchingGame.deck = _.shuffle(matchingGame.deck);
}

function selectCard(e) {
    e.stopPropagation();
    if (!isCardSelectable($(this))) {
        return;
    }

    if ($(this)[0] === $(".card-selected")[0]) {
        $(".card-selected").removeClass("card-selected");
        return;
    }

    $(this).addClass("card-selected");
    if ($(".card-selected").size() === 2) {
        //setTimeout(checkPattern, 20);
        checkPattern();
    }
}

function isCardSelectable(selectedElement) {
    var positionX = selectedElement.data("position-x");
    var positionY = selectedElement.data("position-y");
    var shift = selectedElement.data("shift");

    var numberOfLeftNeighbors = getNumberOfLeftNeighbors(positionX, positionY, shift);
    var numberOfRightNeighbors = getNumberOfRightNeighbors(positionX, positionY, shift);
    var numberOfHigherOverlaps = getNumberOfHigherOverlaps(positionX, positionY, shift);

    return ((numberOfLeftNeighbors === 0 || numberOfRightNeighbors === 0) && numberOfHigherOverlaps === 0);
}

function getShiftValueX(zIndex) {
    return zIndex * matchingGame.resolution.borderWidthRight;
}

function getShiftValueY(zIndex) {
    return zIndex * matchingGame.resolution.borderWidthBelow;
}

function getNumberOfAboveNeighbors(positionX, positionY, zIndex) {
    return $(".card").filter(function () {
        return (($(this).css("visibility") === "visible") && ((parseInt($(this).css("top")) + matchingGame.cardHeightWithoutBorder) === positionY) && (parseInt($(this).css("z-index")) === zIndex) && (parseInt($(this).css("left")) === positionX));
    }).length;
}

function getRightNeigbors(positionX, positionY, shift) {
    return $(".card").filter(function () {
        return (($(this).css("visibility") === "visible")
                && ($(this).data("position-x") - positionX === 1)
                && (Math.abs($(this).data("position-y") - positionY) < 1)
                && ($(this).data("shift") === shift));
    });
}

function getNumberOfRightNeighbors(positionX, positionY, shift) {
    return getRightNeigbors(positionX, positionY, shift).length;
}

function getLeftNeighbours(positionX, positionY, shift) {
    return $(".card").filter(function () {
        var isNeighbour = (($(this).css("visibility") === "visible")
                && (($(this).data("position-x") - positionX) === -1)
                && (Math.abs($(this).data("position-y") - positionY) < 1)
                && ($(this).data("shift") === shift));
        return isNeighbour;
    });
}

function getNumberOfLeftNeighbors(positionX, positionY, shift) {
    return getLeftNeighbours(positionX, positionY, shift).length;
}

function getBeneathNeighbors(positionX, positionY, zIndex) {
    return $(".card").filter(function () {
        return (($(this).css("visibility") === "visible") && ((parseInt($(this).css("top")) - matchingGame.cardHeightWithoutBorder) === positionY) && (parseInt($(this).css("z-index")) === zIndex) && (parseInt($(this).css("left")) === positionX));
    });
}

function getUnderlayingNeighbours(positionX, positionY, shift) {
    return $(".card").filter(function () {
        var isUnderlayingNeighbour = (($(this).css("visibility") === "visible")
                && (Math.abs($(this).data("position-y") - positionY) < 1)
                && ($(this).data("shift") - shift === -1)
                && (Math.abs($(this).data("position-x") - positionX) < 1));
        return isUnderlayingNeighbour;
    });
}

function getNumberOfHigherOverlaps(positionX, positionY, shift) {
    return $(".card").filter(function () {
        var isHigherOverlap = (($(this).css("visibility") === "visible")
                && (Math.abs($(this).data("position-y") - positionY) < 1)
                && ($(this).data("shift") > shift)
                && (Math.abs($(this).data("position-x") - positionX) < 1));
        return isHigherOverlap;
    }).length;
}

function checkPattern() {
    if (isMatchPattern()) {
        $(".card-selected").removeClass("card-selected").addClass("card-removed");
        updatePoints(true);
        removeTookCards();
    } else {
        $(".card-selected").removeClass("card-selected");
    }
}

function isMatchPattern() {
    var cards = $(".card-selected");
    var pattern = $(cards[0]).data("pattern");
    var anotherPattern = $(cards[1]).data("pattern");
    return (pattern === anotherPattern);
}

function removeTookCards() {
    var index;
    $(".card-removed").each(function (index) {
        index = $(".card").index($(this));
        $(".shadow").eq(index).css({"visibility": "hidden"});
    });

    var removedCards = $(".card-removed");
    removeCardsFromSelectableCards(removedCards);
    matchingGame.undoList.unshift(removedCards);

    var animatedDivs = $(".card-removed").clone().removeAttr("data-pattern data-position-x data-position-y data-shift data-selectable")
            .css("z-index", 20).removeClass("card-removed");
    $("#cards").append(animatedDivs);
    animatedDivs.fadeOut({complete:function(){
    		animatedDivs.remove();
    }});
//    animatedDivs.addClass('animated hinge');
//    animatedDivs.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
//        $(this).remove();
//    });

    $(".card-removed").css({"visibility": "hidden"});
    $(".card-removed").removeClass("card-removed");
    updateSelectableAndMatchingCards(removedCards);
    if (isWinningGame()) {
        showWinningMessage();
    }
}

function isWinningGame() {
    return (matchingGame.undoList.length * 2) === ($(".card").length - 2);
}
function removeCardsFromSelectableCards(removedCards) {
    var pattern;
    var selectableCardsByPattern;

    pattern = $(removedCards[0]).data("pattern");
    console.log("pattern to remove: " + pattern);

    selectableCardsByPattern = matchingGame.selectableCards[pattern];
    if (selectableCardsByPattern !== undefined) {
        selectableCardsByPattern.forEach(function (matchingCard) {
            console.log("remove class card-matching");
            matchingCard.removeClass("card-matching");
        });
    }
    selectableCardsByPattern = removeCardsFromArray(removedCards, selectableCardsByPattern);
    matchingGame.selectableCards[pattern] = selectableCardsByPattern;
}

function removeCardsFromArray(cardsToRemove, cards) {
    var positionXCardToRemove;
    var positionYCardToRemove;
    var shiftCardToRemove;

    var positionX;
    var positionY;
    var shift;
    var cardToRemove;
    var resultingCards = [];
    var isCardToRemove;
    console.log("cards");
    console.dir(cards);
    console.log("cardsToRemove");
    console.dir(cardsToRemove);

    if (cards === undefined) {
        return [];
    }

    cards.forEach(function (card) {
        positionX = card.data("position-x");
        positionY = card.data("position-y");
        shift = card.data("shift");
        isCardToRemove = false;
        cardsToRemove.each(function () {
            cardToRemove = $(this);
            positionXCardToRemove = cardToRemove.data("position-x");
            positionYCardToRemove = cardToRemove.data("position-y");
            shiftCardToRemove = cardToRemove.data("shift");
            console.log("Positionen von cardToRemove: " + positionXCardToRemove + ", " + positionYCardToRemove + ", " + shiftCardToRemove);
            if (positionXCardToRemove === positionX && positionYCardToRemove === positionY && shiftCardToRemove === shift) {
                isCardToRemove = true;
            }
        });
        if (!isCardToRemove) {
            resultingCards.push(card);
        }
    });

    console.log("Ergebnis: ");
    console.dir(resultingCards);
    return resultingCards;
}

function updateSelectableAndMatchingCards(removedCards) {
    var neighbours;
    var leftNeighbours;
    var rightNeighbours;
    var underlayingNeighbours;

    var positionX;
    var positionY;
    var shift;

    removedCards.each(function () {
        positionX = $(this).data("position-x");
        positionY = $(this).data("position-y");
        shift = $(this).data("shift");
        leftNeighbours = getLeftNeighbours(positionX, positionY, shift);
        rightNeighbours = getRightNeigbors(positionX, positionY, shift);
        underlayingNeighbours = getUnderlayingNeighbours(positionX, positionY, shift);

        var allNeighbours = leftNeighbours.add(rightNeighbours).add(underlayingNeighbours);
        if (neighbours !== undefined) {
            neighbours = neighbours.add(allNeighbours);
        }
        else {
            neighbours = allNeighbours;
        }
    });

    var selectable;
    var pattern;
    var selectableCardsByPattern;
    neighbours.each(function () {
        selectable = isCardSelectable($(this));
        if (!selectable) {
            removeCardsFromSelectableCards($(this));
            return;
        }
        pattern = $(this).data("pattern");
        selectableCardsByPattern = matchingGame.selectableCards[pattern];
        if (selectableCardsByPattern !== undefined) {
            console.log(selectableCardsByPattern);
            console.log("index des Objekts: " + pattern + ", boolescher Wert " + cardArrayContainsCard(selectableCardsByPattern, $(this)));
        }
        if (selectableCardsByPattern === undefined) {
            selectableCardsByPattern = [$(this)];
            matchingGame.selectableCards[pattern] = selectableCardsByPattern;
        } else if (!cardArrayContainsCard(selectableCardsByPattern, $(this))) {
            selectableCardsByPattern.push($(this));
        }
    });

    updateMatchingCards();
}

function updateMatchingCards() {
    var existsMatch = false;
    matchingGame.matchingCards = {};
    for (pattern in matchingGame.selectableCards) {
        selectableCardsByPattern = matchingGame.selectableCards[pattern];
        if (selectableCardsByPattern.length > 1) {
            existsMatch = true;
            matchingGame.matchingCards[pattern] = selectableCardsByPattern;
            selectableCardsByPattern.forEach(function (matchingCard) {
                matchingCard.addClass("card-matching");
            });
//            console.log("match: " + pattern);
        }
    }

    if (!existsMatch && !isWinningGame()) {
        stopTimer();
        showLoseMessage();
    }
}

function showLoseMessage() {
    stopTimer();
    matchingGame.gameEnded = true;
    calculatePoints(false);

    hideGameButtons();
    $(".pointsReached").text(matchingGame.points);
    $("div#loseMessage").show();
    console.log("Punkte: " + matchingGame.points);
}

function cardArrayContainsCard(cards, card) {
    var positionX = card.data("position-x");
    var positionY = card.data("position-y");
    var shift = card.data("shift");
    console.log("positionX: " + positionX + ", positionY: " + positionY + ", shift: " + shift);
    if (cards === undefined || cards.length === 0) {
        return false;
    }

    var containsCard = false;
    cards.forEach(function (otherCard) {
        //console.log("Vergleichsobjekt positionX: " + otherCard.data("position-x") + ", positionY: " + otherCard.data("position-y") + ", shift: " + otherCard.data("shift"));
        if (otherCard.data("position-x") === positionX && otherCard.data("position-y") === positionY && otherCard.data("shift") === shift) {
            containsCard = true;
        }
    });
    return containsCard;
}

function showWinningMessage() {
    matchingGame.gameEnded = true;
    stopTimer();
    calculatePoints(true);
    $("div.game-buttons").hide();
//    $("div.game-buttons").slideToggle({direction: "down"}, 300);
    $(".pointsReached").text(matchingGame.points);
    $("div#winningMessage").show();
}
function startNewGame() {
    $("#cards").empty();
    $("#cards").append('<div class="card"></div>');
    $("#cards").append('<div class="shadow"></div>');
    matchingGame.undoList = [];
    hideMessages();
    startGame();
}

function restartGame() {
    hideMessages();
    var numberOfRemovedPatterns = matchingGame.undoList.length;
    for (var i = 0; i < numberOfRemovedPatterns; i++) {
        undo();
    }
}

function hideMessages() {
    $("div#winningMessage").hide();
    $("div#loseMessage").hide();
}

function displayMessages() {
    if (isWinningGame()) {
        $("div#winningMessage").show();
    } else {
        $("div#loseMessage").show();
    }
}

function changeTheme(themeid) {
    if (themeid !== undefined) {
        matchingGame.theme = themeid;
    }
    else {
        if (matchingGame.theme === matchingGame.themes.length - 1)
            matchingGame.theme = 0;
        else
            matchingGame.theme = matchingGame.theme + 1;
    }


    localStorage.setItem("theme", matchingGame.theme);
    var matchingTheme = matchingGame.themes[matchingGame.theme];
    $("body").attr("data-theme", matchingTheme);
    setSpriteImageForTiles();
}

function setSpriteImageForTiles() {

    var resolution = "";
    if (matchingGame.resolution === matchingGame.resolutions.verysmallscreen)
        resolution = "verysmallscreen";
    if (matchingGame.resolution === matchingGame.resolutions.smallscreen)
        resolution = "smallscreen";
    if (matchingGame.resolution === matchingGame.resolutions.bigscreen)
        resolution = "bigscreen";
    if (matchingGame.resolution === matchingGame.resolutions.verybigscreen)
        resolution = "verybigscreen";
    $("body").attr("data-resolution", resolution);
}

function undo() {
    matchingGame.gameEnded = false;
    matchingGame.undoUsed = true;
    if (matchingGame.undoList.length >= 1) {
        var cardsToUndo = matchingGame.undoList[0];
        var pattern = (matchingGame.undoList[0]).data("pattern");
        console.log("pattern to undo: " + pattern);

        cardsToUndo.each(function (index) {
            matchingGame.selectableCards[pattern].push($(this));
            index = $(".card").index($(this));
            $(".shadow").eq(index).css({"visibility": "visible"});
        });

        (matchingGame.undoList[0]).css({"visibility": "visible"});
        updateSelectableAndMatchingCards(cardsToUndo);
        matchingGame.undoList.shift();
        updatePoints(false);
    }
}

function showAlert(message) {
    if (cordovaUsed())
        navigator.notification.alert(message);
    else
        alert(message);
}

function cordovaUsed() {
    return navigator.notification;
}

function startTimer() {
    $("#timer").text("00:00");
    if (matchingGame.timer === null) {
        matchingGame.timer = setInterval(updateTimer, "1000");
    }
    matchingGame.elapsedSeconds = 0;
}

function stopTimer() {
    clearInterval(matchingGame.timer);
    matchingGame.timer = null;
}

function resumeTimer() {
    if (matchingGame.timer === null) {
        matchingGame.timer = setInterval(updateTimer, "1000");
    }
}


function updateTimer() {
    matchingGame.elapsedSeconds++;
    var numberOfMinutes = Math.floor(matchingGame.elapsedSeconds / 60);
    var numberOfSeconds = matchingGame.elapsedSeconds % 60;
    var timerText = "";
    if (numberOfMinutes < 10) {
        timerText += "0";
    }
    timerText += numberOfMinutes;
    timerText += ":";
    if (numberOfSeconds < 10) {
        timerText += "0";
    }
    timerText += numberOfSeconds;
    $("#timer").text(timerText);
}

function updatePoints(incrementPoints) {
    if (incrementPoints) {
        matchingGame.points = matchingGame.points + 2;
    } else {
        matchingGame.points = matchingGame.points - 2;
    }

    $("#points").text(matchingGame.points);
}

function resetPoints() {
    matchingGame.points = 0;
    $("#points").text(matchingGame.points);
}


function calculatePoints(gameWon) {
    var bonusGameWon = 200;
    var timeLimitForBonus = 480;
    var timeBonus = 2;
    var pointsLowerBound = 400;
    console.log("timeLimitForBonus: " + timeLimitForBonus);
    console.log("matchingGame.elapsedSeconds: " + matchingGame.elapsedSeconds);
    if (gameWon) {
        matchingGame.points = matchingGame.points + bonusGameWon;
        if (matchingGame.elapsedSeconds < timeLimitForBonus) {
            var timeDifference = timeLimitForBonus - matchingGame.elapsedSeconds;
            matchingGame.points = matchingGame.points + (timeDifference * timeBonus);
        } else {
            var timeDifference = matchingGame.elapsedSeconds - timeLimitForBonus;
            matchingGame.points = matchingGame.points - (timeDifference);
            if (matchingGame.points < pointsLowerBound) {
                matchingGame.points = pointsLowerBound;
            }
        }
    }

    var layout = $("#cards").attr("data-layout");
    console.log("undoUsed: " + matchingGame.undoUsed + ", matchingGame.hintsUsed: " + matchingGame.hintsUsed);
    var points = new Points(matchingGame.elapsedSeconds, gameWon, layout, matchingGame.undoUsed, matchingGame.hintsUsed, matchingGame.points);
    console.log("vor saveGameStatistics: " + points);
    points.saveGameStatistics();
}

function initHintsUsed() {
    if ($("body").hasClass('hint-on')) {
        matchingGame.hintsUsed = true;
    }
    else {
        matchingGame.hintsUsed = false;
    }
}

function updateHintsUsed() {
    if ($("body").hasClass('hint-on')) {
        matchingGame.hintsUsed = true;
    }
}

function showStatisticsInPauseScreen() {
    var gameStatistics = getGameStatistics();
    if (!gameStatistics) {
        gameStatistics = new GameStatistics();
    }

    $("[data-point='numberOfGamesInGamesWon']").text(gameStatistics.numberOfGames);
    $("[data-point='numberOfGamesWon']").text(gameStatistics.numberOfGamesWon);
    console.log("gameStatistics.numberOfGamesWonWithoutUndoOrHints: " + gameStatistics.numberOfGamesWonWithoutUndoOrHints);
    $("[data-point='numberOfGamesWonWithUndoOrHints']").text(gameStatistics.numberOfGamesWonWithoutUndoOrHints);
    $("[data-point='numberOfGamesInGamesWithoutUndoOrHints']").text(gameStatistics.numberOfGames);
    $("[data-point='highScore']").text(gameStatistics.highScore);

    console.log("if-Wert: " + (gameStatistics.layoutsWon === null || gameStatistics.layoutsWon.indexOf(matchingGame.layoutTurtle) < 0));
    console.log("gameStatistics.layoutsWon: " + gameStatistics.layoutsWon);
    console.log("gameStatistics.layoutsWon.indexOf(matchingGame.layoutTurtle) < 0: " + (gameStatistics.layoutsWon.indexOf(matchingGame.layoutTurtle) < 0));
    if (gameStatistics.layoutsWon === null || gameStatistics.layoutsWon.indexOf(matchingGame.layoutTurtle) < 0) {
        $("[data-point='layoutTurtle']").hide();
    } else {
        $("[data-point='layoutTurtle']").show();
    }

    if (gameStatistics.layoutsWon === null || gameStatistics.layoutsWon.indexOf(matchingGame.layoutFlower) < 0) {
        $("[data-point='layoutFlower']").hide();
    } else {
        $("[data-point='layoutFlower']").show();
    }

    if (gameStatistics.layoutsWon === null || gameStatistics.layoutsWon.indexOf(matchingGame.layoutSpider) < 0) {
        $("[data-point='layoutSpider']").hide();
    } else {
        $("[data-point='layoutSpider']").show();
    }

    if (gameStatistics.layoutsWon === null || gameStatistics.layoutsWon.indexOf(matchingGame.layoutCloud) < 0) {
        $("[data-point='layoutCloud']").hide();
    } else {
        $("[data-point='layoutCloud']").show();
    }

    if (gameStatistics.layoutsWon === null || gameStatistics.layoutsWon.indexOf(matchingGame.layoutBug) < 0) {
        $("[data-point='layoutBug']").hide();
    } else {
        $("[data-point='layoutBug']").show();
    }

    if (gameStatistics.layoutsWon === null || gameStatistics.layoutsWon.indexOf(matchingGame.layoutFourHills) < 0) {
        $("[data-point='layoutFourHills']").hide();
    } else {
        $("[data-point='layoutFourHills']").show();
    }

    console.log("gameStatistics.shortestWinningTime: " + gameStatistics.shortestWinningTime);
    if (gameStatistics.shortestWinningTime === 0 || gameStatistics.shortestWinningTime > 480) {
        $("[data-point='gameWonUnder8Minutes']").hide();
    } else {
        $("[data-point='gameWonUnder8Minutes']").show();
    }

    if (gameStatistics.numberOfGamesWonWithoutHints <= 0) {
        $("[data-point='gameWonWithoutHints']").hide();
    } else {
        $("[data-point='gameWonWithoutHints']").show();
    }

    if (gameStatistics.numberOfGamesWonWithoutUndo <= 0) {
        $("[data-point='gameWonWithoutUndo']").hide();
    } else {
        $("[data-point='gameWonWithoutUndo']").show();
    }

    if (gameStatistics.numberOfGamesWon >= 10) {
        $("[data-point='10gamesWon']").show();
    } else {
        $("[data-point='10gamesWon']").hide();
        if (gameStatistics.numberOfGamesWon >= 5) {
            $("[data-point='5gamesWon']").show();
        } else {
            $("[data-point='5gamesWon']").hide();
            if (gameStatistics.numberOfGamesWon >= 1) {
                $("[data-point='1gameWon']").show();
            } else {
                $("[data-point='1gameWon']").hide();
            }
        }
    }
}