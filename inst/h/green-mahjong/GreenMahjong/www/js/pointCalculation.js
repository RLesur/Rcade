var points = points || {};

points.elapsedTime = 30;
points.gameWon = true;
points.layout;
points.undoUsed;
points.hintsUsed;
points.points;

function Points(elapsedTime, gameWon, layout, undoUsed, hintsUsed, points) {
    this.elapsedTime = elapsedTime;
    this.gameWon = gameWon;
    this.layout = layout;
    this.undoUsed = undoUsed;
    this.hintsUsed = hintsUsed;
    this.points = points;
}

Points.prototype.saveGameStatistics = function() {
    console.log("saveGameStatistics");
    var gameStatistics = getGameStatistics();
    gameStatistics.updateStatistics(this.elapsedTime, this.gameWon, this.layout, this.undoUsed, this.hintsUsed, this.points);
    localStorage.setItem("gameStatistics", JSON.stringify(gameStatistics));
};

function getGameStatistics() {
    var gameStatistics = new GameStatistics(JSON.parse(localStorage.getItem("gameStatistics")));
    return gameStatistics;
}
;

var gameStatistics = gameStatistics || {};

gameStatistics.numberOfGames = 0;
gameStatistics.numberOfGamesWon = 0;
gameStatistics.layoutsPlayed = [];
gameStatistics.layoutsWon = [];
gameStatistics.shortestLosingTime = 0;
gameStatistics.longestLosingTime = 0;
gameStatistics.averageLosingTime = 0;
gameStatistics.averagePlayTime = 0;
gameStatistics.shortestWinningTime = 0;
gameStatistics.longestWinningTime = 0;
gameStatistics.averageWinningTime = 0;
gameStatistics.numberOfGamesLostWithUndo = 0;
gameStatistics.numberOfGamesLostWithHints = 0;
gameStatistics.numberOfGamesWonWithoutUndo = 0;
gameStatistics.numberOfGamesWonWithoutHints = 0;
gameStatistics.numberOfGamesWonWithoutUndoOrHints = 0;
gameStatistics.highScore = 0;

function GameStatistics(jsonObject) {
    if (!jsonObject) {
        this.numberOfGames = 0;
        this.numberOfGamesWon = 0;
        this.layoutsPlayed = [];
        this.layoutsWon = [];
        this.shortestLosingTime = 0;
        this.longestLosingTime = 0;
        this.averageLosingTime = 0;
        this.averagePlayTime = 0;
        this.shortestWinningTime = 0;
        this.longestWinningTime = 0;
        this.averageWinningTime = 0;
        this.numberOfGamesLostWithUndo = 0;
        this.numberOfGamesLostWithHints = 0;
        this.numberOfGamesWonWithoutUndo = 0;
        this.numberOfGamesWonWithoutHints = 0;
        this.numberOfGamesWonWithoutUndoOrHints = 0;
        this.highScore = 0;
    } else {
        for (var prop in jsonObject)
            this[prop] = jsonObject[prop];
    }
}



GameStatistics.prototype.updateStatistics = function(elapsedTime, gameWon, layout, undoUsed, hintsUsed, points) {
    this.numberOfGames++;

    if (gameWon) {
        this.numberOfGamesWon++;
        var sumOfElapsedSeconds = (this.numberOfGamesWon - 1) * this.averageWinningTime;
        this.averageWinningTime = (sumOfElapsedSeconds + elapsedTime) / this.numberOfGamesWon;

        if (this.layoutsWon.indexOf(layout) < 0) {
            this.layoutsWon.unshift(layout);
        }

        if (elapsedTime < this.shortestWinningTime) {
            this.shortestWinningTime = elapsedTime;
        }

        if (elapsedTime > this.longestWinningTime) {
            this.longestWinningTime = elapsedTime;
        }

        if (!undoUsed) {
            this.numberOfGamesWonWithoutUndo++;
        }

        if (!hintsUsed) {
            this.numberOfGamesWonWithoutHints++;
        }
        
        if (!undoUsed && !hintsUsed){
            this.numberOfGamesWonWithoutUndoOrHints++;
        }
        
    } else {
        var sumOfElapsedSeconds = (this.numberOfGames - this.numberOfGamesWon - 1) * this.averageLosingTime;
        this.averageLosingTime = (sumOfElapsedSeconds + elapsedTime) / (this.numberOfGames - this.numberOfGamesWon);

        if (elapsedTime < this.shortestLosingTime) {
            this.shortestLosingTime = elapsedTime;
        }

        if (elapsedTime > this.longestLosingTime) {
            this.longestLosingTime = elapsedTime;
        }

        if (undoUsed) {
            this.numberOfGamesLostWithUndo++;
        }

        if (!hintsUsed) {
            this.numberOfGamesLostWithHints++;
        }
    }

    if (points > this.highScore) {
        this.highScore = points;
    }
    
    if (this.averageWinningTime > 0 && this.averageLosingTime > 0){
        this.averagePlayTime = (this.averageWinningTime + this.averageLosingTime) / 2;
    } else {
        this.averagePlayTime = this.averageWinningTime + this.averageLosingTime;
    }
    
    if (this.layoutsPlayed.indexOf(layout) < 0) {
            this.layoutsPlayed.unshift(layout);
        }
};

