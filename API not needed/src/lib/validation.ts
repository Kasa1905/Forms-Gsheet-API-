export function validatePassword(password: string): string | undefined {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return undefined;
}