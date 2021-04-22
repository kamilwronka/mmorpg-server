import { Schema, MapSchema, type } from "@colyseus/schema";

export class Player extends Schema {
  @type("string")
  id: string;

  @type("number")
  x: number;

  @type("number")
  y: number;

  @type("string")
  spriteUrl: string;

  @type("string")
  name: string;
}

export class MainRoomState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();
}
