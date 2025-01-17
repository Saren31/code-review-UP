/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const noPlayer = ' ';

export class Game {
  private _lastPlayer = new Player(noPlayer);
  private _board: Board = new Board();

  public Play(playerString: string, x: number, y: number): void {
    var player: Player = new Player(playerString);
    this.validateFirstMove(player);
    this.validatePlayer(player);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(player);
    this.updateBoard(new Tile(x, y, player));
  }

  private validateFirstMove(player: Player) {
    if (this._lastPlayer.Value == noPlayer) {
      if (player.Value == playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: Player) {
    if (player.Value == this._lastPlayer.Value) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.isTilePlayedAt(x, y)) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: Player) {
    this._lastPlayer = player;
  }

  private updateBoard(tile: Tile) {
    this._board.AddTileAt(tile);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  private x: number = 0;
  private y: number = 0;
  private player: Player = new Player(noPlayer);

  constructor(x: number, y: number, player: Player) {
    this.x = x;
    this.y = y;
    this.player = player;
  }

  get Player() {
    return this.player.Value;
  }

  get isNotEmpty() {
    return this.Player !== noPlayer;
  }

  hasSamePlayerAs(other: Tile) {
    return this.Player === other.Player;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.x == other.x && this.y == other.y;
  }

  updatePlayer(newPlayer: string) {
    this.player.Value = newPlayer;
  }
}

class Player {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  get Value() {
    return this.value;
  }

  set Value(value: string) {
    this.value = value;
  }
  
  
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = firstRow; x <= thirdRow; x++) {
      for (let y = firstColumn; y <= thirdColumn; y++) {
        this._plays.push(new Tile(x, y, new Player(noPlayer)));
      }
    }
  }

  public isTilePlayedAt(x: number, y: number) {
    return this.findTileAt(new Tile(x, y, new Player(noPlayer)))!.isNotEmpty;
  }

  public AddTileAt(tile: Tile): void {
    this.findTileAt(tile)!.updatePlayer(tile.Player);
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSamePlayer(firstRow)) {
      return this.playerAt(firstRow, firstColumn);
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSamePlayer(secondRow)) {
      return this.playerAt(secondRow, firstColumn);
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSamePlayer(thirdRow)) {
      return this.playerAt(thirdRow, firstColumn);
    }

    return noPlayer;
  }

  private findTileAt(tile: Tile) {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile));
  }

  private hasSamePlayer(x: number, y: number, otherX: number, otherY: number) {
    return this.TileAt(x, y)!.hasSamePlayerAs(this.TileAt(otherX, otherY)!);
  }

  private playerAt(x: number, y: number) {
    return this.TileAt(x, y)!.Player;
  }

  private TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, new Player(noPlayer))))!;
  }

  private isRowFull(row: number) {
    return (
      this.isTilePlayedAt(row, firstColumn) &&
      this.isTilePlayedAt(row, secondColumn) &&
      this.isTilePlayedAt(row, thirdColumn)
    );
  }

  private isRowFullWithSamePlayer(row: number) {
    return (
      this.hasSamePlayer(row, firstColumn, row, secondColumn) &&
      this.hasSamePlayer(row, secondColumn, row, thirdColumn)
    );
  }
}
