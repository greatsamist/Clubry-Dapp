import {
  NewDeposit,
  NewBurn,
  NewMint,
} from "../../generated/templates/Club/Club";
import { Deposit, User, Club, UserClub } from "../../generated/schema";
import { BigInt, dataSource, BigDecimal } from "@graphprotocol/graph-ts";
import { safeDiv } from "../utils";

export function handleNewDeposit(event: NewDeposit): void {
  let user = User.load(event.transaction.from.toHex());

  if (user == null) {
    user = new User(event.transaction.from.toHex());
    user.address = event.params.user;
  }

  let deposit = new Deposit(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  deposit.user = user.id;
  deposit.quantity = event.params.quantity.toBigDecimal();
  deposit.token = event.params.token;
  deposit.time = event.block.timestamp;
  deposit.save();

  let context = dataSource.context();
  let clubAddress = context.getString("clubAddress");
  let club = Club.load(clubAddress);

  if (club != null) {
    club.totalDeposited = club.totalDeposited.plus(deposit.quantity);
    club.totalMinted = club.totalMinted.plus(deposit.quantity);

    let userClub = UserClub.load(user.id + "-" + club.id);

    if (userClub == null) {
      userClub = new UserClub(user.id + "-" + club.id);
      userClub.club = club.id;
      userClub.user = user.id;
      userClub.totalDeposited = BigDecimal.zero();
      userClub.totalMinted = BigDecimal.zero();
      userClub.deposits = new Array<string>(0);
    }

    userClub.totalDeposited = userClub.totalDeposited.plus(
      event.params.quantity.toBigDecimal()
    );
    userClub.totalMinted = userClub.totalMinted.plus(
      event.params.quantity.toBigDecimal()
    );

    let deposits = userClub.deposits;
    deposits.push(deposit.id);
    userClub.deposits = deposits;

    user.save();

    club.save();
    userClub.save();
  }
}

export function handleNewBurn(event: NewBurn): void {
  let user = User.load(event.params.user.toHex());
  if (!user) return;

  let context = dataSource.context();
  let clubAddress = context.getString("clubAddress");

  let club = Club.load(clubAddress);
  if (!club) return;

  let userClub = UserClub.load(user.id + "-" + club.id);
  if (!userClub) return;

  if (user != null) {
    userClub.totalDeposited = userClub.totalDeposited.plus(
      event.params.quantity.toBigDecimal()
    );
    userClub.totalMinted = userClub.totalMinted.plus(
      event.params.quantity.toBigDecimal()
    );
    userClub.save();
  }
}

export function handleNewMint(event: NewMint): void {
  let user = User.load(event.params.user.toHex());
  if (!user) return;

  let context = dataSource.context();
  let clubAddress = context.getString("clubAddress");

  let club = Club.load(clubAddress);
  if (!club) return;

  let userClub = UserClub.load(user.id + "-" + club.id);
  if (!userClub) return;

  if (user != null) {
    userClub.totalDeposited = userClub.totalDeposited.minus(
      event.params.quantity.toBigDecimal()
    );
    userClub.totalMinted = userClub.totalMinted.minus(
      event.params.quantity.toBigDecimal()
    );
    userClub.save();
  }
}
