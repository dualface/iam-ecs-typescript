/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponent } from "../ecs/ecs";

/**
 * 将实体标记为 NPC
 */
export class NPCComponent extends ECSComponent {
    static NAME = "NPCComponent";

    constructor() {
        super(NPCComponent.NAME);
    }
}
