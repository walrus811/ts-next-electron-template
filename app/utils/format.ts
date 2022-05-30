export function getSpecialIpcName(
  ipcName: string,
  salt: string
): string
{
  return `${ipcName}-${salt}`;
}