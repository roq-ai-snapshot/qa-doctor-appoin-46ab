const mapping: Record<string, string> = {
  appointments: 'appointment',
  'appointment-slots': 'appointment_slot',
  doctors: 'doctor',
  guests: 'guest',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
