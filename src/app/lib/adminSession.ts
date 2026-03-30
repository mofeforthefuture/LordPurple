const SESSION_KEY = 'lordpurple_admin_session';

export function getAdminPassword(): string {
  return import.meta.env.VITE_ADMIN_PASSWORD ?? 'lordpurple-admin-dev';
}

export function isAdminSession(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export function loginAdmin(password: string): boolean {
  if (password === getAdminPassword()) {
    sessionStorage.setItem(SESSION_KEY, '1');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
