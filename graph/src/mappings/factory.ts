import { Club } from "../../generated/schema";
import { NewClub } from "../../generated/Factory/Factory";
import { Club as ClubTemplate } from "../../generated/templates";
import { BigDecimal, DataSourceContext } from "@graphprotocol/graph-ts";

export function handleNewClub(event: NewClub): void {
  let club = Club.load(event.transaction.hash.toHex());
  if (club == null) {
    club = new Club(event.transaction.hash.toHex());

    club.address = event.params.clubAddress;
    club.totalDeposited = BigDecimal.zero();
    club.totalMinted = BigDecimal.zero();
    club.owner = event.params.owner;
    club.clubName = event.params.clubName;
    club.clubSymbol = event.params.clubSymbol;
    club.depositToken = event.params.depositToken;
    club.depositEndDate = event.params.depositEndDate;
    club.depositLimit = event.params.depositLimit;
    club.treasureAddress = event.params.treasureAddress;
    club.createdAt = event.block.timestamp;
    club.save();

    let context = new DataSourceContext();
    context.setString("clubAddress", event.params.clubAddress.toHex());
    ClubTemplate.createWithContext(event.params.clubAddress, context);
  }
}
