
const tileVide = ' ';
const tilePleine = 'O';
const nbTilesMax = 3;
const col1 = 0;
const col2 = 1;
const col3 = 2;
const lig1 = 0;
const lig2 = 1;
const lig3 = 2;


export class Game {
  private _board: Board = new Board();
  private _lastSymbol = tileVide;

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == tileVide) {
      if (player == tilePleine) {
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
    if (this._board.TileAt(x, y).Symbol != tileVide) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(col1, lig1)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(col2, lig1)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(col3, col1)!.Symbol;
    }

    return tileVide;
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(col1, lig1)!.Symbol != tileVide &&
      this._board.TileAt(col1, lig2)!.Symbol != tileVide &&
      this._board.TileAt(col1, lig3)!.Symbol != tileVide
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(col1, lig1)!.Symbol == this._board.TileAt(0, 1)!.Symbol &&
      this._board.TileAt(col1, lig3)!.Symbol == this._board.TileAt(0, 1)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(col2, lig1)!.Symbol != tileVide &&
      this._board.TileAt(col2, lig2)!.Symbol != tileVide &&
      this._board.TileAt(col2, lig3)!.Symbol != tileVide
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(col2, lig1)!.Symbol == this._board.TileAt(col2, lig2)!.Symbol &&
      this._board.TileAt(col2, lig3)!.Symbol == this._board.TileAt(col2, lig2)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(col3, lig1)!.Symbol != tileVide &&
      this._board.TileAt(col3, lig2)!.Symbol != tileVide &&
      this._board.TileAt(col3, lig3)!.Symbol != tileVide
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(col3, lig1)!.Symbol == this._board.TileAt(col3, lig2)!.Symbol &&
      this._board.TileAt(col3, lig3)!.Symbol == this._board.TileAt(col3, lig2)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < nbTilesMax ; i++) {
      for (let j = 0; j < nbTilesMax; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: tileVide };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }


}
