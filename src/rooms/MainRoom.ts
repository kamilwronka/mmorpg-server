import { Room, Client } from "colyseus";
import { Dispatcher } from "@colyseus/command";

import { MainRoomState, Player } from "./schema/MainRoomState";
import { OnJoinCommand } from "./commands/OnJoinCommand";
import { OnDisconnectCommand } from "./commands/OnDisconnectCommand";
import { OnDisposeCommand } from "./commands/OnDisposeCommand";
import { OnPlayerMoveCommand } from "./commands/OnPlayerMoveCommand";

export class MyRoom extends Room {
  players: any[] = [];
  dispatcher = new Dispatcher(this);

  onCreate(options: any) {
    this.setState(new MainRoomState());

    this.onMessage("playerMoving", (client, data) => {
      this.dispatcher.dispatch(new OnPlayerMoveCommand(), {
        x: data.x,
        y: data.y,
        playerId: "wildstylez",
      });
    });
  }

  async onJoin(client: Client, options: any) {
    console.log(options.id, "joined");
    console.log(options);

    let playerData: any;

    try {
      const value = await this.presence.get(options.id);
      playerData = JSON.parse(value);

      console.log(value);

      if (!value) {
        playerData = {
          name: "Wildstylez",
          x: 5,
          y: 23,
          id: options.id,
          spriteUrl:
            "https://mmorpg-frontend.s3.eu-central-1.amazonaws.com/spritesheet2.png",
        };
      }
    } catch (error) {
      console.log(error);

      playerData = {
        name: "Wildstylez",
        x: 5,
        y: 23,
        id: options.id,
        spriteUrl:
          "https://mmorpg-frontend.s3.eu-central-1.amazonaws.com/spritesheet2.png",
      };
    }

    console.log(playerData);

    this.dispatcher.dispatch(
      new OnJoinCommand(),
      new Player({
        name: playerData.name,
        x: playerData.x,
        y: playerData.y,
        id: options.id,
        spriteUrl: playerData.spriteUrl,
      })
    );
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "disconnected");

    this.dispatcher.dispatch(new OnDisconnectCommand(), {
      sessionId: "wildstylez",
    });
  }

  onDispose() {
    this.dispatcher.dispatch(new OnDisposeCommand());
  }
}
