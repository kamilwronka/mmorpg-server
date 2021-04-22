import { Command } from "@colyseus/command";
import { MainRoomState, Player } from "../schema/MainRoomState";

export class OnDisposeCommand extends Command<MainRoomState> {
  execute() {
    this.state.players.clear();
  }
}
