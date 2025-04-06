// SPDX-License-Identifier: BUSL-1.1

// ███╗   ███╗ █████╗ ██╗  ██╗ █████╗
// ████╗ ████║██╔══██╗██║  ██║██╔══██╗
// ██╔████╔██║███████║███████║███████║
// ██║╚██╔╝██║██╔══██║██╔══██║██╔══██║
// ██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██║
// ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝

// Website: https://maha.xyz
// Discord: https://discord.gg/mahadao
// Telegram: https://t.me/mahaxyz
// Twitter: https://twitter.com/mahaxyz

pragma solidity ^0.8.0;
pragma abicoder v2;

/// @title The interface for the CL Factory
/// @notice The CL Factory facilitates creation of CL pools and control over the protocol fees
interface IClPoolFactory {
  /// @notice Emitted when the owner of the factory is changed
  /// @param oldOwner The owner before the owner was changed
  /// @param newOwner The owner after the owner was changed
  event OwnerChanged(address indexed oldOwner, address indexed newOwner);

  /// @notice Emitted when a pool is created
  /// @param token0 The first token of the pool by address sort order
  /// @param token1 The second token of the pool by address sort order
  /// @param fee The fee collected upon every swap in the pool, denominated in hundredths of a bip
  /// @param tickSpacing The minimum number of ticks between initialized ticks
  /// @param pool The address of the created pool
  event PoolCreated(
    address indexed token0, address indexed token1, uint24 indexed fee, int24 tickSpacing, address pool
  );

  /// @notice Emitted when a new fee amount is enabled for pool creation via the factory
  /// @param fee The enabled fee, denominated in hundredths of a bip
  /// @param tickSpacing The minimum number of ticks between initialized ticks for pools created with the given fee
  event FeeAmountEnabled(uint24 indexed fee, int24 indexed tickSpacing);

  /// @notice Emitted when pairs implementation is changed
  /// @param oldImplementation The previous implementation
  /// @param newImplementation The new implementation
  event ImplementationChanged(address indexed oldImplementation, address indexed newImplementation);

  /// @notice Emitted when the fee collector is changed
  /// @param oldFeeCollector The previous implementation
  /// @param newFeeCollector The new implementation
  event FeeCollectorChanged(address indexed oldFeeCollector, address indexed newFeeCollector);

  /// @notice Emitted when the protocol fee is changed
  /// @param feeProtocol0Old The previous value of the token0 protocol fee
  /// @param feeProtocol1Old The previous value of the token1 protocol fee
  /// @param feeProtocol0New The updated value of the token0 protocol fee
  /// @param feeProtocol1New The updated value of the token1 protocol fee
  event SetFeeProtocol(uint8 feeProtocol0Old, uint8 feeProtocol1Old, uint8 feeProtocol0New, uint8 feeProtocol1New);

  /// @notice Emitted when the protocol fee is changed
  /// @param pool The pool address
  /// @param feeProtocol0Old The previous value of the token0 protocol fee
  /// @param feeProtocol1Old The previous value of the token1 protocol fee
  /// @param feeProtocol0New The updated value of the token0 protocol fee
  /// @param feeProtocol1New The updated value of the token1 protocol fee
  event SetPoolFeeProtocol(
    address pool, uint8 feeProtocol0Old, uint8 feeProtocol1Old, uint8 feeProtocol0New, uint8 feeProtocol1New
  );

  /// @notice Emitted when the feeSetter of the factory is changed
  /// @param oldSetter The feeSetter before the setter was changed
  /// @param newSetter The feeSetter after the setter was changed
  event FeeSetterChanged(address indexed oldSetter, address indexed newSetter);

  /// @notice Returns the current owner of the factory
  /// @dev Can be changed by the current owner via setOwner
  /// @return The address of the factory owner
  function owner() external view returns (address);

  /// @notice Returns the CL NFP Manager
  function nfpManager() external view returns (address);

  /// @notice Returns the votingEscrow address
  function votingEscrow() external view returns (address);

  /// @notice Returns Voter address
  function voter() external view returns (address);

  /// @notice Returns the tick spacing for a given fee amount, if enabled, or 0 if not enabled
  /// @dev A fee amount can never be removed, so this value should be hard coded or cached in the calling context
  /// @param fee The enabled fee, denominated in hundredths of a bip. Returns 0 in case of unenabled fee
  /// @return The tick spacing
  function feeAmountTickSpacing(uint24 fee) external view returns (int24);

  /// @notice Returns the pool address for a given pair of tokens and a fee, or address 0 if it does not exist
  /// @dev tokenA and tokenB may be passed in either token0/token1 or token1/token0 order
  /// @param tokenA The contract address of either token0 or token1
  /// @param tokenB The contract address of the other token
  /// @param fee The fee collected upon every swap in the pool, denominated in hundredths of a bip
  /// @return pool The pool address
  function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool);

  /// @notice Returns the address of the fee collector contract
  /// @dev Fee collector decides where the protocol fees go (fee distributor, treasury, etc.)
  function feeCollector() external view returns (address);

  /// @notice Creates a pool for the given two tokens and fee
  /// @param tokenA One of the two tokens in the desired pool
  /// @param tokenB The other of the two tokens in the desired pool
  /// @param fee The desired fee for the pool
  /// @param sqrtPriceX96 initial sqrtPriceX96 of the pool
  /// @dev tokenA and tokenB may be passed in either order: token0/token1 or token1/token0. tickSpacing is retrieved
  /// from the fee. The call will revert if the pool already exists, the fee is invalid, or the token arguments
  /// are invalid.
  /// @return pool The address of the newly created pool
  function createPool(address tokenA, address tokenB, uint24 fee, uint160 sqrtPriceX96) external returns (address pool);

  /// @notice Updates the owner of the factory
  /// @dev Must be called by the current owner
  /// @param _owner The new owner of the factory
  function setOwner(address _owner) external;

  /// @notice Enables a fee amount with the given tickSpacing
  /// @dev Fee amounts may never be removed once enabled
  /// @param fee The fee amount to enable, denominated in hundredths of a bip (i.e. 1e-6)
  /// @param tickSpacing The spacing between ticks to be enforced for all pools created with the given fee amount
  function enableFeeAmount(uint24 fee, int24 tickSpacing) external;

  /// @notice returns the default protocol fee.
  function feeProtocol() external view returns (uint8);

  /// @notice returns the protocol fee for both tokens of a pool.
  function poolFeeProtocol(address pool) external view returns (uint8);

  /// @notice Sets the default protocol's % share of the fees
  /// @param _feeProtocol new default protocol fee for token0 and token1
  function setFeeProtocol(uint8 _feeProtocol) external;

  /// @notice Sets the fee collector address
  /// @param _feeCollector the fee collector address
  function setFeeCollector(address _feeCollector) external;

  function setFeeSetter(address _newFeeSetter) external;

  function setFee(address _pool, uint24 _fee) external;

  /// @notice Sets the default protocol's % share of the fees
  /// @param pool the pool address
  /// @param feeProtocol new protocol fee for the pool for token0 and token1
  function setPoolFeeProtocol(address pool, uint8 feeProtocol) external;
}
