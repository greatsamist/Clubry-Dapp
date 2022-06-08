// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;

interface IGnosisSafeProxyFactory {
    function createProxy(address masterCopy, bytes calldata data)
        external
        returns (address payable proxy);
}

interface IGnosisSafeSetup {
    function setup(
        address[] calldata _owners,
        uint256 _threshold,
        address to,
        bytes calldata data,
        address fallbackHandler,
        address paymentToken,
        uint256 payment,
        address payable paymentReceiver
    ) external;
}
