var currentTurn = '';
var oldTurn = '';

function isWhiteTurn() {
    return currentTurn === 'white';
}

var isSelected = false;

var Environment = {
    gameOver: false,
    winner: '',
    Black: {
        pieces: 0,
        pawns: 0,
        rooks: 0,
        knights: 0,
        bishops: 0,
        queens: 0,
        kings: 0
    },
    White: {
        pieces: 0,
        pawns: 0,
        rooks: 0,
        knights: 0,
        bishops: 0,
        queens: 0,
        kings: 0
    },

    Add: function (piece) {
        if (piece.team === 'black') {
            this.Black.pieces++;

            if (piece instanceof (Pawn))
                this.Black.pawns++;

            else if (piece instanceof (Rook))
                this.Black.rooks++;

            else if (piece instanceof (Knight))
                this.Black.knights++;

            else if (piece instanceof (Bishop))
                this.Black.bishops++;

            else if (piece instanceof (Queen))
                this.Black.queens++;

            else if (piece instanceof (King))
                this.Black.kings++;
        }

        else if (piece.team === 'white') {
            this.White.pieces++;

            if (piece instanceof (Pawn))
                this.White.pawns++;

            else if (piece instanceof (Rook))
                this.White.rooks++;

            else if (piece instanceof (Knight))
                this.White.knights++;

            else if (piece instanceof (Bishop))
                this.White.bishops++;

            else if (piece instanceof (Queen))
                this.White.queens++;

            else if (piece instanceof (King))
                this.White.kings++;
        }
    },

    BuildScore: function () {
        $('#black-pieces').html(Environment.Black.pieces);
        $('#black-pawns').html(Environment.Black.pawns);
        $('#black-rooks').html(Environment.Black.rooks);
        $('#black-knights').html(Environment.Black.knights);
        $('#black-bishops').html(Environment.Black.bishops);
        $('#black-queens').html(Environment.Black.queens);
        $('#black-kings').html(Environment.Black.kings);

        $('#white-pieces').html(Environment.White.pieces);
        $('#white-pawns').html(Environment.White.pawns);
        $('#white-rooks').html(Environment.White.rooks);
        $('#white-knights').html(Environment.White.knights);
        $('#white-bishops').html(Environment.White.bishops);
        $('#white-queens').html(Environment.White.queens);
        $('#white-kings').html(Environment.White.kings);
    },

    Remove: function (name, team) {
        if (team === 'white') {
            this.White.pieces--;
            switch (name) {
                case 'pawn_white':
                    this.White.pawns--;
                    break;
                case 'rook':
                    this.White.rooks--;
                    break;
                case 'knight':
                    this.White.knights--;
                    break;
                case 'bishop':
                    this.White.bishops--;
                    break;
                case 'queen':
                    this.White.queens--;
                    break;
                case 'king':
                    this.White.kings--;
                    break;
            }
        }
        else if (team === 'black') {
            this.Black.pieces--;
            switch (name) {
                case 'pawn_black':
                    this.Black.pawns--;
                    break;
                case 'rook':
                    this.Black.rooks--;
                    break;
                case 'knight':
                    this.Black.knights--;
                    break;
                case 'bishop':
                    this.Black.bishops--;
                    break;
                case 'queen':
                    this.Black.queens--;
                    break;
                case 'king':
                    this.Black.kings--;
                    break;
            }
        }
        this.BuildScore();
        if (this.isGameOver()) {
            this.EndGame();
        }
    },

    isGameOver: function () {
        if (this.White.kings < 1) {
            this.gameOver = true;
            this.winner = 'black';
        }

        else if (this.Black.kings < 1) {
            this.gameOver = true;
            this.winner = 'white';
        }

        return this.gameOver;
    },

    EndGame: function () {
        $('body').append('<div class="endScreen">' + this.winner + ' is the winner</div>');
    }
}

function setTurnLabel() {
    oldTurn = isWhiteTurn() ? 'black' : 'white';
    $('#turn').html(oldTurn);
}

function Game(view, board, pieces) {
    this.view = $('#' + view);
    this.board = board;

    this.buildBoard = function () {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                this.view.append('<div id="' + String.fromCharCode(j + 65) + (i + 1) + '" class="step ' + board[i][j] + '"></div>');
            }
        }
    };

    this.placePieces = function () {
        for (var i = 0; i < pieces.length; i++) {
            for (var j = 0; j < pieces[i].length; j++) {
                switch (pieces[i][j]) {
                    case "pawn_black":
                        new Pawn(String.fromCharCode(j + 65), (i + 1), 'black').put();
                        break;
                    case "rook_black":
                        new Rook(String.fromCharCode(j + 65), (i + 1), 'black').put();
                        break;
                    case "knight_black":
                        new Knight(String.fromCharCode(j + 65), (i + 1), 'black').put();
                        break;
                    case "bishop_black":
                        new Bishop(String.fromCharCode(j + 65), (i + 1), 'black').put();
                        break;
                    case "queen_black":
                        new Queen(String.fromCharCode(j + 65), (i + 1), 'black').put();
                        break;
                    case "king_black":
                        new King(String.fromCharCode(j + 65), (i + 1), 'black').put();
                        break;

                    case "pawn_white":
                        new Pawn(String.fromCharCode(j + 65), (i + 1), 'white').put();
                        break;
                    case "rook_white":
                        new Rook(String.fromCharCode(j + 65), (i + 1), 'white').put();
                        break;
                    case "knight_white":
                        new Knight(String.fromCharCode(j + 65), (i + 1), 'white').put();
                        break;
                    case "bishop_white":
                        new Bishop(String.fromCharCode(j + 65), (i + 1), 'white').put();
                        break;
                    case "queen_white":
                        new Queen(String.fromCharCode(j + 65), (i + 1), 'white').put();
                        break;
                    case "king_white":
                        new King(String.fromCharCode(j + 65), (i + 1), 'white').put();
                        break;
                }
            }
        }
    };

    this.setBindings = function () {
        $('.white-team').on('click', function () {
            onMove($(this));
        });
    }
    this.start = function () {
        this.buildBoard();
        this.placePieces();
        this.setBindings();
    };


}

function Piece(posX, posY, team) {
    this.posX = posX;
    this.posY = posY;
    this.team = team;
    this.name = '';
    this.image = {
        x: 0,
        y: 0
    };

    this.movement = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        diagonal: {
            downToUp: 0,
            upToDown: 0
        }
    };

    this.put = function () {
        var element = $('#' + this.posX + this.posY);
        if (this.team === 'black')
            element.append('<div class="piece black-team" data-team="' + this.team + '" name="' + this.name + '" style=" background-position-x:' + this.image.x + 'px ; background-position-y:' + parseInt(this.image.y - 60) + 'px"></div>');

        else if (this.team === 'white')
            element.append('<div class="piece white-team" data-team="' + this.team + '" name="' + this.name + '" style=" background-position-x:' + this.image.x + 'px ; background-position-y:' + this.image.y + 'px"></div>');

        Environment.Add(this);
    }


}

function Pawn(posX, posY, team) {
    Piece.call(this, posX, posY, team);
    this.name = 'pawn_' + team;
    this.image = {
        x: 58,
        y: -3
    };

    this.movement = this.team === 'white' ? {
        up: 1,
        down: 0,
        left: 0,
        right: 0,
        diagonal: {
            downToUp: 0,
            upToDown: 0
        }
    } : {
            up: 0,
            down: 1,
            left: 0,
            right: 0,
            diagonal: {
                downToUp: 0,
                upToDown: 0
            }
        }
}

function Rook(posX, posY, team) {
    Piece.call(this, posX, posY, team);
    this.name = 'rook';
    this.image = {
        x: 116,
        y: -3
    }
    this.movement = {
        up: 7,
        down: 7,
        left: 7,
        right: 7,
        diagonal: {
            downToUp: 0,
            upToDown: 0
        }
    };
}

function Knight(posX, posY, team) {
    Piece.call(this, posX, posY, team);
    this.name = 'knight';
    this.image = {
        x: 173,
        y: -3
    }
    this.movement = {
        up: 2,
        down: 2,
        left: 2,
        right: 2,
        diagonal: {
            downToUp: 0,
            upToDown: 0
        }
    }
}

function Bishop(posX, posY, team) {
    Piece.call(this, posX, posY, team);
    this.name = 'bishop';
    this.image = {
        x: 234,
        y: -3
    }
    this.movement = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        diagonal: {
            downToUp: 7,
            upToDown: 7
        }
    }
}

function Queen(posX, posY, team) {
    Piece.call(this, posX, posY, team);
    this.name = 'queen';
    this.image = {
        x: 293,
        y: -3
    }
    this.movement = {
        up: 7,
        down: 7,
        left: 7,
        right: 7,
        diagonal: {
            downToUp: 7,
            upToDown: 7
        }
    };
}

function King(posX, posY, team) {
    Piece.call(this, posX, posY, team);
    this.name = 'king';
    this.image = {
        x: 354,
        y: -3
    }
    this.movement = {
        up: 1,
        down: 1,
        left: 1,
        right: 1,
        diagonal: {
            downToUp: 1,
            upToDown: 1
        }
    };

}

function reset() {
    setTurnLabel();
    $('.step').css('background-color', '')
        .unbind('click');

    $('.white-team').unbind('click');
    $('.black-team').unbind('click');

    if (isWhiteTurn()) {
        $('.black-team').bind('click', function () {
            onMove($(this));
        });
    }


    else {
        $('.white-team').bind('click', function () {
            onMove($(this));
        });
    }
}

function makeMove(caller, $piece) {
    if (hasPieceOn(caller)) {
        var team = $(caller.children()[0]).attr('data-team');
        var name = $(caller.children()[0]).attr('name');
        Environment.Remove(name, team);
    }
    $(caller).html($($piece.prop('outerHTML')));
    $piece.remove();
    currentTurn = isWhiteTurn() ? 'black' : 'white';

    reset();
}

function getMoveNumber(id, add) {
    var letter = id[0];
    var number = parseInt(id[1]) + add;

    return letter + number;
}

function getMoveLetter(id, add) {
    if (id.length > 2) {
        return id;
    }

    var resp = String.fromCharCode((id[0].charCodeAt(0) + add));

    if ((id[0].charCodeAt(0) + add) < 65) {
        return '';
    }

    var letter = resp;
    var number = parseInt(id[1]);

    return letter + number;
}

function getMoveDiagonalRightToLeft(id, add) {
    var resp = String.fromCharCode((id[0].charCodeAt(0) + add));

    if ((id[0].charCodeAt(0) + add) < 65) {
        return '';
    }

    var letter = resp;
    var number = parseInt(id[1]) + add;
    return letter + number;
}

function getMoveDiagonalLeftToRight(id, add) {
    var resp = String.fromCharCode((id[0].charCodeAt(0) + add));

    if ((id[0].charCodeAt(0) + add) < 65) {
        return '';
    }

    var letter = resp;
    var number = parseInt(id[1]) - add;
    return letter + number;
}

function getInstance(name) {
    switch (name) {
        case 'pawn_white':
            return new Pawn('', '', 'white');
        case 'pawn_black':
            return new Pawn('', '', 'black');
        case 'rook':
            return new Rook();
        case 'knight':
            return new Knight();
        case 'bishop':
            return new Bishop();
        case 'queen':
            return new Queen();
        case 'king':
            return new King();
    }
    return new Piece();
}

function setPaddle(element, $piece, color) {
    element.css('background-color', color);

    element.bind('click', function () {
        makeMove($(this), $piece);
        isSelected = false;
    });
}

function hasPieceOn(step) {
    if (step.children().length > 0) {
        return true;
    }
    return false;
}

function isEnemy(piece, child) {
    return piece.attr('data-team') !== child.attr('data-team');
}

function highlightUp(element, piece) {
    var $piece = element;
    var $block = $piece.parent();
    var movable = null;
    var up = piece.movement.up;
    var isKnight = piece instanceof (Knight);
    var isPawn = piece instanceof (Pawn)
    var color = 'rgb(225, 245, 219)';


    if (isKnight) {
        for (var i = up; i == up; i++) {

            movable = $('#' + getMoveLetter(getMoveNumber($block.attr('id'), (i) * (-1)), -1));

            if (!hasPieceOn(movable) || isEnemy($piece, $(movable.children()[0]))) {
                if (hasPieceOn(movable))
                    color = 'red';

                setPaddle(movable, $piece, color);
            }

            color = 'rgb(225, 245, 219)';
            movable = $('#' + getMoveLetter(getMoveNumber($block.attr('id'), (i) * (-1)), 1));
            if (!hasPieceOn(movable) || isEnemy($piece, $(movable.children()[0]))) {
                if (hasPieceOn(movable))
                    color = 'red';

                setPaddle(movable, $piece, color);
            }
        }
    }


    else if (isPawn) {
        for (var i = 0; i < up; i++) {

            movable = $('#' + getMoveNumber($block.attr('id'), (i + 1) * (-1)));
            var old = movable.attr('id');


            if (i < 1) {
                if (hasPieceOn($('#' + getMoveLetter(old, 1))) && isEnemy($piece, $($('#' + getMoveLetter(old, 1)).children()[0]))) {
                    setPaddle($('#' + getMoveLetter(old, 1)), $piece, 'red');
                }

                if (hasPieceOn($('#' + getMoveLetter(old, -1))) && isEnemy($piece, $($('#' + getMoveLetter(old, -1)).children()[0]))) {
                    setPaddle($('#' + getMoveLetter(old, -1)), $piece, 'red');
                }
            }
            if (hasPieceOn(movable)) {
                break;
            }
            if (hasPieceOn(movable)) {
                if (isEnemy($piece, $(movable.children()[0]))) {
                    i = up;
                    color = 'red';
                }
                else {
                    break;
                }
            }

            setPaddle(movable, $piece, color);
        }
    }

    else {
        for (var i = 0; i < up; i++) {

            movable = $('#' + getMoveNumber($block.attr('id'), (i + 1) * (-1)));

            if (hasPieceOn(movable)) {
                if (isEnemy($piece, $(movable.children()[0]))) {
                    i = up;
                    color = 'red';
                }
                else {
                    break;
                }
            }

            setPaddle(movable, $piece, color);
        }
    }
}

function highlightDown(element, piece) {
    var $piece = element;
    var $block = $piece.parent();
    var movable = null;
    var down = piece.movement.down;
    var isKnight = piece instanceof (Knight);
    var isPawn = piece instanceof (Pawn)
    var color = 'rgb(225, 245, 219)';


    if (isKnight) {
        for (var i = down; i == down; i++) {

            movable = $('#' + getMoveLetter(getMoveNumber($block.attr('id'), (i)), 1));
            if (!hasPieceOn(movable) || isEnemy($piece, $(movable.children()[0]))) {
                if (hasPieceOn(movable))
                    color = 'red';
                setPaddle(movable, $piece, color);
            }

            color = 'rgb(225, 245, 219)';
            movable = $('#' + getMoveLetter(getMoveNumber($block.attr('id'), (i)), -1));
            if (!hasPieceOn(movable) || isEnemy($piece, $(movable.children()[0]))) {
                if (hasPieceOn(movable))
                    color = 'red';
                setPaddle(movable, $piece, color);
            }
        }
    }

    else if (isPawn) {
        for (var i = 0; i < down; i++) {

            movable = $('#' + getMoveNumber($block.attr('id'), (i + 1)));
            var old = movable.attr('id');

            if (hasPieceOn(movable)) {
                movable = $('#')
            }

            if (hasPieceOn($('#' + getMoveLetter(old, 1))) && isEnemy($piece, $($('#' + getMoveLetter(old, 1)).children()[0]))) {
                setPaddle($('#' + getMoveLetter(old, 1)), $piece, 'red');
            }

            if (hasPieceOn($('#' + getMoveLetter(old, -1))) && isEnemy($piece, $($('#' + getMoveLetter(old, -1)).children()[0]))) {
                setPaddle($('#' + getMoveLetter(old, -1)), $piece, 'red');
            }

            if (hasPieceOn(movable)) {
                if (isEnemy($piece, $(movable.children()[0]))) {
                    i = down;
                    color = 'red';
                }
                else {
                    break;
                }
            }

            setPaddle(movable, $piece, color);
        }
    }

    else {
        for (var i = 0; i < down; i++) {

            movable = $('#' + getMoveNumber($block.attr('id'), i + 1));

            if (hasPieceOn(movable)) {
                if (isEnemy($piece, $(movable.children()[0]))) {
                    i = down;
                    color = 'red'
                }
                else
                    break;
            }

            setPaddle(movable, $piece, color);
        }
    }
}

function highlightRight(element, piece) {
    var $piece = element;
    var $block = $piece.parent();
    var movable = null;
    var right = piece.movement.right;
    var isKnight = piece instanceof (Knight);
    var color = 'rgb(225, 245, 219)';

    if (!isKnight) {
        for (var i = 0; i < right; i++) {

            movable = $('#' + getMoveLetter($block.attr('id'), i + 1));

            if (hasPieceOn(movable)) {
                if (isEnemy($piece, $(movable.children()[0]))) {
                    i = right;
                    color = 'red';
                }
                else
                    break;
            }

            setPaddle(movable, $piece, color);

        }
    }

    else if (isKnight) {
        for (var i = right; i == right; i++) {

            movable = $('#' + getMoveNumber(getMoveLetter($block.attr('id'), (i) * (-1)), -1));
            if (!hasPieceOn(movable) || isEnemy($piece, $(movable.children()[0]))) {
                if (hasPieceOn(movable))
                    color = 'red';
                setPaddle(movable, $piece, color);
            }

            color = 'rgb(225, 245, 219)';
            movable = $('#' + getMoveNumber(getMoveLetter($block.attr('id'), (i) * (-1)), 1));
            if (!hasPieceOn(movable) || isEnemy($piece, $(movable.children()[0]))) {
                if (hasPieceOn(movable))
                    color = 'red';
                setPaddle(movable, $piece, color);
            }
        }
    }
}

function highlightLeft(element, piece) {
    var $piece = element;
    var $block = $piece.parent();
    var movable = null;
    var left = piece.movement.left;
    var isKnight = piece instanceof (Knight);
    var color = 'rgb(225, 245, 219)';

    if (!isKnight) {
        for (var i = 0; i < left; i++) {

            movable = $('#' + getMoveLetter($block.attr('id'), (i + 1) * (-1)));
            if (hasPieceOn(movable)) {
                if (isEnemy($piece, $(movable.children()[0]))) {
                    i = left;
                    color = 'red';
                }
                else
                    break;
            }

            setPaddle(movable, $piece, color);

        }
    }

    else if (isKnight) {
        for (var i = left; i == left; i++) {

            movable = $('#' + getMoveNumber(getMoveLetter($block.attr('id'), (i)), 1));
            if (!hasPieceOn(movable) || isEnemy($piece, $(movable.children()[0]))) {
                if (hasPieceOn(movable))
                    color = 'red';
                setPaddle(movable, $piece, color);
            }

            color = 'rgb(225, 245, 219)';
            movable = $('#' + getMoveNumber(getMoveLetter($block.attr('id'), (i)), -1));
            if (!hasPieceOn(movable) || isEnemy($piece, $(movable.children()[0]))) {
                if (hasPieceOn(movable))
                    color = 'red';
                setPaddle(movable, $piece, color);
            }
        }
    }
}

function hightlightDiagonalRightToLeft(element, piece) {
    var $piece = element;
    var $block = $piece.parent();
    var movable = null;
    var diagonalUp = piece.movement.diagonal.downToUp;
    var diagonalDown = piece.movement.diagonal.upToDown;
    var color = 'rgb(225, 245, 219)';

    for (var i = 0; i < diagonalUp; i++) {

        movable = $('#' + getMoveDiagonalRightToLeft($block.attr('id'), (i + 1) * (-1)));

        if (hasPieceOn(movable)) {
            if (isEnemy($piece, $(movable.children()[0]))) {
                i = diagonalUp;
                color = 'red';
            }
            else
                break;
        }

        setPaddle(movable, $piece, color);
    }

    color = 'rgb(225, 245, 219)';
    for (var i = 0; i < diagonalDown; i++) {

        movable = $('#' + getMoveDiagonalRightToLeft($block.attr('id'), i + 1));

        if (hasPieceOn(movable)) {
            if (isEnemy($piece, $(movable.children()[0]))) {
                i = diagonalDown;
                color = 'red';
            }
            else
                break;
        }

        setPaddle(movable, $piece, color);
    }
}

function hightlightDiagonalLeftToRight(element, piece) {
    var $piece = element;
    var $block = $piece.parent();
    var movable = null;
    var diagonalUp = piece.movement.diagonal.downToUp;
    var diagonalDown = piece.movement.diagonal.upToDown;
    var color = 'rgb(225, 245, 219)';

    for (var i = 0; i < diagonalUp; i++) {

        movable = $('#' + getMoveDiagonalLeftToRight($block.attr('id'), i + 1));

        if (hasPieceOn(movable)) {
            if (isEnemy($piece, $(movable.children()[0]))) {
                i = diagonalUp;
                color = 'red';
            }
            else
                break;
        }

        setPaddle(movable, $piece, color);
    }

    color = 'rgb(225, 245, 219)';
    for (var i = 0; i < diagonalDown; i++) {

        movable = $('#' + getMoveDiagonalLeftToRight($block.attr('id'), (i + 1) * (-1)));

        if (hasPieceOn(movable)) {
            if (isEnemy($piece, $(movable.children()[0]))) {
                i = diagonalDown;
                color = 'red';
            }
            else
                break;
        }

        setPaddle(movable, $piece, color);
    }
}

function highlight(element, pieceObj) {
    highlightUp(element, pieceObj);
    highlightDown(element, pieceObj);
    highlightRight(element, pieceObj);
    highlightLeft(element, pieceObj);
    hightlightDiagonalRightToLeft(element, pieceObj);
    hightlightDiagonalLeftToRight(element, pieceObj);

}

function highlightSteps(piece) {
    isSelected = true;
    var pieceObj = getInstance($(piece).attr('name'));


    highlight(piece, pieceObj);

    if (!isSelected && isWhiteTurn()) {
        $('.white-team').off('click');
    }

    else if (!isSelected && !isWhiteTurn()) {
        $('.white-team').off('click');
    }
}

function onMove(piece) {
    var $piece = piece;
    var $block = $piece.parent();

    reset();
    highlightSteps(piece);
}

$(document).ready(function () {
    var game = new Game('board', board, pieces);
    game.start();
    Environment.BuildScore();


});