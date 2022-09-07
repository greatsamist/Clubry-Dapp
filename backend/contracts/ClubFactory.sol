// //SPDX-License-Identifier: Unlicense
// pragma solidity ^0.8.8;

// import "./ClubManagement.sol";
// import "./interfaces/Ifactory.sol";
// import "./interfaces/Ignosis.sol";

// contract ClubFactory is IFactory {
//     // Mumbai 0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2
//     IGnosisSafeProxyFactory private PROXY_FACTORY;

//     // Mumbai 0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552
//     address private MASTER_COPY;

//     constructor(IGnosisSafeProxyFactory _PROXY_FACTORY, address _MASTER_COPY) {
//         PROXY_FACTORY = IGnosisSafeProxyFactory(_PROXY_FACTORY);
//         MASTER_COPY = _MASTER_COPY;
//     }

//     function createClub(
//         address[] memory _gnosisowners,
//         string memory _clubName,
//         string memory _clubSymbol,
//         address _depositToken,
//         uint256 _depositEndDate,
//         uint256 _depositLimit,
//         uint256 _maxMembers
//     ) external override returns (address clubAddress, address safeAddress) {
//         bytes memory proxyInitData = abi.encodeWithSelector(
//             IGnosisSafeSetup.setup.selector,
//             _gnosisowners,
//             2,
//             address(0x0),
//             new bytes(0),
//             address(0x0),
//             address(0x0),
//             0,
//             address(0x0)
//         );
//         address payable safe = PROXY_FACTORY.createProxy(
//             MASTER_COPY,
//             proxyInitData
//         );
//         require(safe != address(0x0), "Safe deployment failed");
//         safeAddress = address(safe);

//         ClubManagement club = new ClubManagement(
//             _clubName,
//             _clubSymbol,
//             _depositToken,
//             _depositEndDate,
//             _depositLimit,
//             _maxMembers,
//             safeAddress,
//             msg.sender
//         );
//         clubAddress = address(club);

//         emit NewClub(
//             clubAddress,
//             msg.sender,
//             _clubName,
//             _clubSymbol,
//             _depositToken,
//             _depositEndDate,
//             _depositLimit,
//             _maxMembers,
//             safeAddress
//         );
//     }
// }
