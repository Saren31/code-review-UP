/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const emptyPlay = ' ';

export class Game {
  private _lastSymbol = emptyPlay;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptyPlay) {
      if (player == playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.isTilePlayed(x, y)) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(new Tile(x,y,player));
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  private x: number;
  private y: number;
  private symbol: string;

  constructor(x: number, y: number, symbol: string) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
  }

  getSymbol() {
    return this.symbol;
  }

  setSymbol(symbol: string) {
    this.symbol = symbol;
  }

  isNotEmpty() {
    return this.symbol != emptyPlay;
  }

  hasSamePlayer(tile: Tile) {
    return this.getSymbol() == tile.getSymbol();
  }

  hasSameCoordinates(tile: Tile) {
    return this.x == tile.x && this.y == tile.y
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstColumn; j <= thirdColumn; j++) {
        this._plays.push(new Tile(x,y,emptyPlay));
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(tile: Tile): void {
    this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile))!.updateSymbol(tile.getSymbol());
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this.playedAt(firstRow, firstColumn);
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this.playedAt(secondRow, firstColumn);
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this.playedAt(thirdRow, firstColumn);
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
      this.isTilePlayed(row, firstColumn) &&
      this.isTilePlayed(row, secondColumn) &&
      this.isTilePlayed(row, thirdColumn)
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this.hasSamePlayer(row, firstColumn, row, secondColumn) &&
      this.hasSamePlayer(row, secondColumn, row, thirdColumn)
    );
  }

  private hasSamePlayer(x1: number, x2: number, y1: number, y2: number) {
    return this.TileAt(x1,y1).hasSamePlayer(this.tileAt(x2,y2));
  }

  private isTilePlayed(x: number, y: number) {
    return this._plays.find((t: Tile) => t.hasSameCoordinates(new Tile(x,y, emptyPlay))).isNotEmpty();
  }

  private playerAt(x: number, y: number) {
    return this.TileAt(x, y)!.getSymbol();
  }
}
