import { Group } from "../types/schema";
import { NewGroup } from "../types/Factory/Factory";
import { Group as GroupTemplate } from "../types/templates";
import { BigDecimal, DataSourceContext } from "@graphprotocol/graph-ts";

export function handleNewGroup(event: NewGroup): void {
  let group = new Group(event.params.groupAddress.toHex());
  group.address = event.params.groupAddress;
  group.totalDeposited = BigDecimal.zero();
  group.totalMinted = BigDecimal.zero();
  group.owner = event.params.owner;
  group.groupName = event.params.groupName;
  group.groupSymbol = event.params.groupSymbol;
  group.depositToken = event.params.depositToken;
  group.depositEndDate = event.params.depositEndDate;
  group.depositLimit = event.params.depositLimit;
  group.treasureAddress = event.params.treasureAddress;
  group.createdAt = event.block.timestamp;
  group.save();

  let context = new DataSourceContext();
  context.setString("groupAddress", event.params.groupAddress.toHex());
  GroupTemplate.createWithContext(event.params.groupAddress, context);
}
