function maskWalletAddress(walletAddress: string) {
  if (!walletAddress) return '';
  if (walletAddress?.length < 16) {
    return walletAddress;
  }

  const first8 = walletAddress.slice(0, 8);
  const last8 = walletAddress.slice(-8);
  const middleDots = '.'.repeat(5); // Use exactly 5 dots for the middle characters

  const maskedAddress = first8 + middleDots + last8;
  return maskedAddress;
}

export { maskWalletAddress };

// Example usage:
