// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
	ethereum,
	JSONValue,
	TypedMap,
	Entity,
	Bytes,
	Address,
	BigInt
  } from "@graphprotocol/graph-ts";
  
  export class NewGroup extends ethereum.Event {
	get params(): NewGroup__Params {
	  return new NewGroup__Params(this);
	}
  }
  
  export class NewGroup__Params {
	_event: NewGroup;
  
	constructor(event: NewGroup) {
	  this._event = event;
	}
  
	get groupAddress(): Address {
	  return this._event.parameters[0].value.toAddress();
	}
  
	get owner(): Address {
	  return this._event.parameters[1].value.toAddress();
	}
  
	get groupName(): string {
	  return this._event.parameters[2].value.toString();
	}
  
	get groupSymbol(): string {
	  return this._event.parameters[3].value.toString();
	}
  
	get depositToken(): Address {
	  return this._event.parameters[4].value.toAddress();
	}
  
	get depositEndDate(): BigInt {
	  return this._event.parameters[5].value.toBigInt();
	}
  
	get depositLimit(): BigInt {
	  return this._event.parameters[6].value.toBigInt();
	}
  
	get maxMembers(): BigInt {
	  return this._event.parameters[7].value.toBigInt();
	}
  
	get treasureAddress(): Address {
	  return this._event.parameters[8].value.toAddress();
	}
  }
  
  export class Factory__createGroupResult {
	value0: Address;
	value1: Address;
  
	constructor(value0: Address, value1: Address) {
	  this.value0 = value0;
	  this.value1 = value1;
	}
  
	toMap(): TypedMap<string, ethereum.Value> {
	  let map = new TypedMap<string, ethereum.Value>();
	  map.set("value0", ethereum.Value.fromAddress(this.value0));
	  map.set("value1", ethereum.Value.fromAddress(this.value1));
	  return map;
	}
  }
  
  export class Factory extends ethereum.SmartContract {
	static bind(address: Address): Factory {
	  return new Factory("Factory", address);
	}
  
	createGroup(
	  _gnosisowners: Array<Address>,
	  _groupName: string,
	  _groupSymbol: string,
	  _depositToken: Address,
	  _depositEndDate: BigInt,
	  _depositLimit: BigInt,
	  _maxMembers: BigInt
	): Factory__createGroupResult {
	  let result = super.call(
		"createGroup",
		"createGroup(address[],string,string,address,uint256,uint256,uint256):(address,address)",
		[
		  ethereum.Value.fromAddressArray(_gnosisowners),
		  ethereum.Value.fromString(_groupName),
		  ethereum.Value.fromString(_groupSymbol),
		  ethereum.Value.fromAddress(_depositToken),
		  ethereum.Value.fromUnsignedBigInt(_depositEndDate),
		  ethereum.Value.fromUnsignedBigInt(_depositLimit),
		  ethereum.Value.fromUnsignedBigInt(_maxMembers)
		]
	  );
  
	  return new Factory__createGroupResult(
		result[0].toAddress(),
		result[1].toAddress()
	  );
	}
  
	try_createGroup(
	  _gnosisowners: Array<Address>,
	  _groupName: string,
	  _groupSymbol: string,
	  _depositToken: Address,
	  _depositEndDate: BigInt,
	  _depositLimit: BigInt,
	  _maxMembers: BigInt
	): ethereum.CallResult<Factory__createGroupResult> {
	  let result = super.tryCall(
		"createGroup",
		"createGroup(address[],string,string,address,uint256,uint256,uint256):(address,address)",
		[
		  ethereum.Value.fromAddressArray(_gnosisowners),
		  ethereum.Value.fromString(_groupName),
		  ethereum.Value.fromString(_groupSymbol),
		  ethereum.Value.fromAddress(_depositToken),
		  ethereum.Value.fromUnsignedBigInt(_depositEndDate),
		  ethereum.Value.fromUnsignedBigInt(_depositLimit),
		  ethereum.Value.fromUnsignedBigInt(_maxMembers)
		]
	  );
	  if (result.reverted) {
		return new ethereum.CallResult();
	  }
	  let value = result.value;
	  return ethereum.CallResult.fromValue(
		new Factory__createGroupResult(value[0].toAddress(), value[1].toAddress())
	  );
	}
  }
  
  export class ConstructorCall extends ethereum.Call {
	get inputs(): ConstructorCall__Inputs {
	  return new ConstructorCall__Inputs(this);
	}
  
	get outputs(): ConstructorCall__Outputs {
	  return new ConstructorCall__Outputs(this);
	}
  }
  
  export class ConstructorCall__Inputs {
	_call: ConstructorCall;
  
	constructor(call: ConstructorCall) {
	  this._call = call;
	}
  
	get _PROXY_FACTORY(): Address {
	  return this._call.inputValues[0].value.toAddress();
	}
  
	get _MASTER_COPY(): Address {
	  return this._call.inputValues[1].value.toAddress();
	}
  }
  
  export class ConstructorCall__Outputs {
	_call: ConstructorCall;
  
	constructor(call: ConstructorCall) {
	  this._call = call;
	}
  }
  
  export class CreateGroupCall extends ethereum.Call {
	get inputs(): CreateGroupCall__Inputs {
	  return new CreateGroupCall__Inputs(this);
	}
  
	get outputs(): CreateGroupCall__Outputs {
	  return new CreateGroupCall__Outputs(this);
	}
  }
  
  export class CreateGroupCall__Inputs {
	_call: CreateGroupCall;
  
	constructor(call: CreateGroupCall) {
	  this._call = call;
	}
  
	get _gnosisowners(): Array<Address> {
	  return this._call.inputValues[0].value.toAddressArray();
	}
  
	get _groupName(): string {
	  return this._call.inputValues[1].value.toString();
	}
  
	get _groupSymbol(): string {
	  return this._call.inputValues[2].value.toString();
	}
  
	get _depositToken(): Address {
	  return this._call.inputValues[3].value.toAddress();
	}
  
	get _depositEndDate(): BigInt {
	  return this._call.inputValues[4].value.toBigInt();
	}
  
	get _depositLimit(): BigInt {
	  return this._call.inputValues[5].value.toBigInt();
	}
  
	get _maxMembers(): BigInt {
	  return this._call.inputValues[6].value.toBigInt();
	}
  }
  
  export class CreateGroupCall__Outputs {
	_call: CreateGroupCall;
  
	constructor(call: CreateGroupCall) {
	  this._call = call;
	}
  
	get groupAddress(): Address {
	  return this._call.outputValues[0].value.toAddress();
	}
  
	get safeAddress(): Address {
	  return this._call.outputValues[1].value.toAddress();
	}
  }