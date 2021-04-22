import { Command } from "@colyseus/command";
import { MainRoomState } from "../schema/MainRoomState";

export class OnDisconnectCommand extends Command<
  MainRoomState,
  { sessionId: string }
> {
  execute({ sessionId }: { sessionId: string }) {
    this.state.players.delete(sessionId);
  }
}
