import { Command } from "@colyseus/command";
import { MainRoomState, Player } from "../schema/MainRoomState";

export class OnJoinCommand extends Command<MainRoomState, Player> {
  execute(player: Player) {
    this.state.players.set(player.id, player);
  }
}
