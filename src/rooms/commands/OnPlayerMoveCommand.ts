import { Command } from "@colyseus/command";
import { MainRoomState, Player } from "../schema/MainRoomState";

export class OnPlayerMoveCommand extends Command<
  MainRoomState,
  { playerId: string; x: number; y: number }
> {
  async execute({
    playerId,
    x,
    y,
  }: {
    playerId: string;
    x: number;
    y: number;
  }) {
    const player = new Player(this.state.players.get(playerId)).assign({
      x,
      y,
    });

    this.state.players.set(playerId, player);

    await this.room.presence.setex(playerId, JSON.stringify(player), 21000);
  }
}
